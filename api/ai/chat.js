import { knowledgeText } from './knowledge.js';
import { classifyMessage } from './classify.js';

const SUPPORT_EMAIL = 'sreevriddhiforwealth@gmail.com';
const SUPPORT_PHONE = '+91 9640352929';
const WHATSAPP_URL = 'https://wa.me/919640352929';
const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}`;
const SUPPORT_TEL = `tel:+919640352929`;

const cors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.AI_ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
};

const source = (label, url) => ({ label, url });
const contactSources = [
  source('Email Sree Vriddhi', SUPPORT_MAILTO),
  source('Call Sree Vriddhi', SUPPORT_TEL),
  source('Open WhatsApp', WHATSAPP_URL),
];

const safetyPrefix = `You are the Sree Vriddhi AI Assistant. Answer like a helpful, capable general-purpose assistant while staying within the supplied Sree Vriddhi knowledge for business questions. For general knowledge, answer from your model knowledge and clearly avoid pretending a current fact is live unless it is supplied. Be concise, professional and easy to understand. Never invent customer records, approvals, returns, valuations or availability. Never provide personalized investment, legal or tax advice. Never guarantee profit, return, approval or capital protection. Any published commercial figures are indicative/proposed and subject to applicable legal, regulatory and contractual terms. For private customer records, disputes, grievances, urgent matters, legal/tax questions, or personalized financial/return questions, clearly state that human review is required. If a Sree Vriddhi business answer is not in the supplied knowledge, say you do not have that information and offer human follow-up. When a useful action link is available, return it as a plain URL so the website can render it as a clickable link.`;

function localDateTime() {
  const now = new Date();
  return {
    date: new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full' }).format(now),
    time: new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', timeStyle: 'long' }).format(now),
  };
}

function deterministicAnswer(message) {
  const normalized = message.toLowerCase().replace(/\s+/g, ' ').trim();

  if (/(what is|tell me|give me|show me|how can i).*(contact|phone|mobile|email|whatsapp)|\b(contact details|contact number|phone number|mobile number|whatsapp number|email address)\b/i.test(normalized)) {
    return { answer: `You can contact Sree Vriddhi directly:\n\nEmail: ${SUPPORT_EMAIL}\nPhone: ${SUPPORT_PHONE}\nWhatsApp: ${WHATSAPP_URL}`, intent: 'CONTACT', risk: 'LOW', confidence: 1, requiresHuman: false, sources: contactSources };
  }

  if (/(what('?s| is) )?(today'?s date|date today|current date|today)/i.test(normalized)) {
    const current = localDateTime();
    return { answer: `Today is ${current.date}.`, intent: 'GENERAL_DATE', risk: 'LOW', confidence: 1, requiresHuman: false, sources: [] };
  }

  if (/(what('?s| is) )?(the )?(time now|current time|time right now|current time in india|time in india)/i.test(normalized)) {
    const current = localDateTime();
    return { answer: `The current time is ${current.time} (IST).`, intent: 'GENERAL_TIME', risk: 'LOW', confidence: 1, requiresHuman: false, sources: [] };
  }

  if (/\b(biggest|largest|highest) prime number\b/i.test(normalized)) {
    return { answer: 'There is no biggest prime number. Prime numbers are infinite: for any finite list of primes, a larger prime can be found.', intent: 'GENERAL_MATH', risk: 'LOW', confidence: 1, requiresHuman: false, sources: [] };
  }

  if (/\b(array|arrays)\b.*\b(meaning|mean|what is|definition)\b|\bwhat is an array\b/i.test(normalized)) {
    return { answer: 'In programming, an array is a collection of values stored under one variable name and accessed by position (index). For example, [10, 20, 30] is an array with three values.', intent: 'GENERAL_PROGRAMMING', risk: 'LOW', confidence: 1, requiresHuman: false, sources: [] };
  }

  if (/\bcapital of india\b/i.test(normalized)) {
    return { answer: 'The capital of India is New Delhi.', intent: 'GENERAL_GEOGRAPHY', risk: 'LOW', confidence: 1, requiresHuman: false, sources: [] };
  }

  if (/\bwhat is (artificial intelligence|ai)\b|\bdefine artificial intelligence\b/i.test(normalized)) {
    return { answer: 'Artificial intelligence (AI) is technology that enables computers to perform tasks that normally require human-like abilities, such as understanding language, recognizing patterns, reasoning and generating content.', intent: 'GENERAL_AI', risk: 'LOW', confidence: 1, requiresHuman: false, sources: [] };
  }

  if (/\bwhat is python\b|\bpython meaning\b/i.test(normalized)) {
    return { answer: 'Python is a high-level programming language known for readable syntax. It is widely used for web development, automation, data analysis, AI and machine learning.', intent: 'GENERAL_PROGRAMMING', risk: 'LOW', confidence: 1, requiresHuman: false, sources: [] };
  }

  if (/(interest rate|rate of interest|monthly interest|how much interest|return rate|5\s*%|five percent)/i.test(normalized)) {
    return { answer: `The Sree Vriddhi information currently provided to this assistant describes a proposed/published rate of 5% per month for the relevant offering. This should not be treated as a guaranteed return or personalized financial advice; customers should review the applicable written terms, eligibility, verification and legal/regulatory requirements before making any decision. For confirmation of the current applicable terms, please contact Sree Vriddhi directly.`, intent: 'COMMERCIAL_TERMS', risk: 'HIGH', confidence: 0.99, requiresHuman: true, sources: [source('Email Sree Vriddhi', SUPPORT_MAILTO), source('Call support', SUPPORT_TEL), source('Open WhatsApp', WHATSAPP_URL)] };
  }

  return null;
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { message, history = [], channel = 'website', profile = null } = req.body || {};
    if (!message || typeof message !== 'string' || message.length > 4000) return res.status(400).json({ error: 'A message up to 4000 characters is required.' });

    const fixed = deterministicAnswer(message);
    if (fixed) return res.status(200).json(fixed);

    const classification = await classifyMessage(message);
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return res.status(200).json({
        answer: `I can handle common questions, but my advanced AI service is not configured right now. For Sree Vriddhi support, please contact ${SUPPORT_PHONE} or ${SUPPORT_EMAIL}.`,
        intent: classification.intent || 'UNKNOWN', risk: classification.risk || 'LOW', confidence: Number(classification.confidence) || null,
        requiresHuman: true, sources: contactSources,
      });
    }

    const current = localDateTime();
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.2,
        messages: [
          { role: 'system', content: `${safetyPrefix}\nChannel: ${channel}\nCurrent India date: ${current.date}\nCurrent India time: ${current.time}\nCustomer profile (use only for conversational context; do not expose private fields unless necessary): ${JSON.stringify(profile || {})}\nClassification: ${JSON.stringify(classification)}\nKnowledge: ${knowledgeText()}` },
          ...history.slice(-10).filter(m => m && (m.role === 'user' || m.role === 'assistant')).map(m => ({ role: m.role, content: String(m.content).slice(0, 4000) })),
          { role: 'user', content: message },
        ],
      }),
    });

    if (!response.ok) throw new Error(`AI response failed: ${response.status}`);
    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content?.trim();
    if (!answer) throw new Error('AI returned an empty response');

    return res.status(200).json({ answer, intent: classification.intent || 'UNKNOWN', risk: classification.risk || 'LOW', confidence: Number(classification.confidence) || null, requiresHuman: ['HIGH', 'CRITICAL'].includes(classification.risk), sources: [] });
  } catch (error) {
    console.error('Sree Vriddhi AI error', error);
    return res.status(200).json({
      answer: `I’m unable to complete that advanced AI request right now. You can continue with a general question or contact Sree Vriddhi support at ${SUPPORT_PHONE} or ${SUPPORT_EMAIL}.`,
      intent: 'FALLBACK', risk: 'LOW', confidence: null, requiresHuman: true, sources: contactSources,
    });
  }
}
