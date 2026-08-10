require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '512kb' }));

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP = process.env.TWILIO_WHATSAPP_NUMBER; // e.g. whatsapp:+1415...
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP_NUMBER; // where to forward msgs
const TEST_MODE = process.env.TEST_MODE === 'true' || process.env.TEST_MODE === '1';

// Simple in-memory OTP store for demo. For production use persistent store with TTL.
const otpStore = new Map();

const fs = require('fs');
const path = require('path');
const TRANSLATIONS_FILE = path.join(__dirname, 'translations.json');
// Ensure translations file exists
if (!fs.existsSync(TRANSLATIONS_FILE)) {
  fs.writeFileSync(TRANSLATIONS_FILE, JSON.stringify({ en: {} }, null, 2));
}

// Helper to read translations
function readTranslations() {
  try {
    return JSON.parse(fs.readFileSync(TRANSLATIONS_FILE, 'utf8'));
  } catch (e) {
    return { en: {} };
  }
}

// Helper to write translations (blocked in TEST_MODE)
function writeTranslations(obj) {
  if (TEST_MODE) throw new Error('Test mode - write disabled');
  fs.writeFileSync(TRANSLATIONS_FILE, JSON.stringify(obj, null, 2));
}

app.post('/api/translate', async (req, res) => {
  const { text, targetLang } = req.body || {};
  if (!text || !targetLang) return res.status(400).json({ error: 'Missing text or targetLang' });
  if (TEST_MODE) {
    // In test mode, return a harmless echo prefixed to indicate translation
    return res.json({ translated: `[${targetLang.toUpperCase()} TEST] ${text}` });
  }

  if (!OPENAI_KEY) return res.status(500).json({ error: 'OpenAI key not configured' });

  try {
    const prompt = `Translate the following text to ${targetLang} preserving HTML and variable placeholders. Respond only with the translated text:\n\n${text}`;
    const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful translator for website content.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 1200
      })
    });
    const j = await openAiRes.json();
    const translated = j?.choices?.[0]?.message?.content || '';
    return res.json({ translated });
  } catch (e) {
    console.error('translate error', e);
    return res.status(500).json({ error: 'Translation failed' });
  }
});

// Translations CRUD (read-only in TEST_MODE)
app.get('/api/translations', (req, res) => {
  try {
    const t = readTranslations();
    return res.json({ ok: true, translations: t });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to read translations' });
  }
});

app.post('/api/translations', (req, res) => {
  if (TEST_MODE) return res.status(403).json({ error: 'Test mode - cannot modify translations' });
  const { translations } = req.body || {};
  if (!translations) return res.status(400).json({ error: 'Missing translations payload' });
  try {
    writeTranslations(translations);
    return res.json({ ok: true });
  } catch (e) {
    console.error('save translations err', e);
    return res.status(500).json({ error: 'Failed to save translations' });
  }
});

// Live market data endpoint using free public sources (with TEST_MODE mocks)
app.get('/api/market/live', async (req, res) => {
  if (TEST_MODE) {
    return res.json({
      ok: true,
      source: 'TEST_MOCK',
      usdInr: 83.45,
      goldPer10gInr_hyderabad: 58300,
      goldPer10gInr_telangana_avg: 58020,
      fetchedAt: new Date().toISOString()
    });
  }

  try {
    // Fetch USD->INR from exchangerate.host
    const fxRes = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=INR');
    const fxJson = await fxRes.json();
    const usdInr = fxJson?.rates?.INR || null;

    // Fetch gold price per ounce in USD from goldprice.org endpoint
    const goldRes = await fetch('https://data-asg.goldprice.org/dbXRates/USD');
    const goldJson = await goldRes.json();
    // goldJson.items[0].xauPrice is per ounce
    const xauPriceUsd = (goldJson && goldJson.items && goldJson.items[0] && goldJson.items[0].xauPrice) ? Number(goldJson.items[0].xauPrice) : null;

    // Convert to per 10g in INR
    let goldPer10gInr_hyderabad = null;
    let goldPer10gInr_telangana_avg = null;
    if (xauPriceUsd && usdInr) {
      const perGramUsd = xauPriceUsd / 31.1034768; // troy ounce to gram
      const per10gUsd = perGramUsd * 10;
      const per10gInr = per10gUsd * usdInr;
      goldPer10gInr_hyderabad = Math.round(per10gInr);
      goldPer10gInr_telangana_avg = Math.round(per10gInr * 0.995); // small regional avg diff
    }

    return res.json({ ok: true, source: 'exchangerate.host + goldprice.org', usdInr, goldPer10gInr_hyderabad, goldPer10gInr_telangana_avg, fetchedAt: new Date().toISOString() });
  } catch (e) {
    console.error('market fetch err', e);
    return res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

app.post('/api/otp/send', async (req, res) => {
  const { phone } = req.body || {};
  if (!phone) return res.status(400).json({ error: 'Missing phone' });
  const code = ('' + Math.floor(100000 + Math.random() * 900000));
  otpStore.set(phone, { code, ts: Date.now() });
  if (TEST_MODE) {
    console.log(`[TEST_MODE] Generated OTP for ${phone}: ${code}`);
    return res.json({ ok: true, testCode: code });
  }

  if (!TWILIO_SID || !TWILIO_TOKEN) return res.status(500).json({ error: 'Twilio not configured' });
  try {
    const client = twilio(TWILIO_SID, TWILIO_TOKEN);
    await client.messages.create({ body: `Your verification code: ${code}`, to: phone, from: process.env.TWILIO_SMS_NUMBER });
    return res.json({ ok: true });
  } catch (e) {
    console.error('otp send err', e);
    return res.status(500).json({ error: 'Failed to send OTP' });
  }
});

app.post('/api/otp/verify', (req, res) => {
  const { phone, code } = req.body || {};
  const rec = otpStore.get(phone);
  if (!rec) return res.status(400).json({ verified: false, reason: 'No code found' });
  if (rec.code === code && (Date.now() - rec.ts) < 1000 * 60 * 10) {
    otpStore.delete(phone);
    return res.json({ verified: true });
  }
  return res.status(400).json({ verified: false, reason: 'Invalid or expired' });
});

app.post('/api/chat/send', async (req, res) => {
  const { message, customerNumber } = req.body || {};
  if (!message || !customerNumber) return res.status(400).json({ error: 'Missing fields' });
  if (TEST_MODE) {
    console.log(`[TEST_MODE] Forward message from ${customerNumber}: ${message}`);
    return res.json({ ok: true });
  }

  if (!TWILIO_SID || !TWILIO_TOKEN || !TWILIO_WHATSAPP || !ADMIN_WHATSAPP) return res.status(500).json({ error: 'Twilio or admin number not configured' });
  try {
    const client = twilio(TWILIO_SID, TWILIO_TOKEN);
    // Forward customer's message to admin WhatsApp channel
    await client.messages.create({ body: `From ${customerNumber}: ${message}`, from: TWILIO_WHATSAPP, to: ADMIN_WHATSAPP });
    return res.json({ ok: true });
  } catch (e) {
    console.error('chat send err', e);
    return res.status(500).json({ error: 'Failed to send' });
  }
});

app.post('/api/twilio/webhook', (req, res) => {
  // Twilio will POST incoming WhatsApp messages here; you can process and forward them
  console.log('twilio webhook', req.body);
  res.set('Content-Type', 'text/xml');
  res.send('<Response></Response>');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`SV server listening on ${PORT}`));
