const TROY_OUNCE_GRAMS = 31.1034768;

async function fetchJson(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'SreeVriddhi-Market/3.0', Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally { clearTimeout(timer); }
}

async function fetchText(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'Mozilla/5.0 SreeVriddhi Market/3.0', Accept: 'text/html' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } finally { clearTimeout(timer); }
}

const valid = v => Number.isFinite(Number(v)) && Number(v) > 0;
const extractRupee = html => {
  const matches = [...html.matchAll(/₹\s*([0-9,]+(?:\.\d{1,2})?)/g)].map(m => Number(m[1].replace(/,/g, ''))).filter(valid);
  return matches[0] ?? null;
};

async function fetchNifty() {
  const json = await fetchJson('https://query1.finance.yahoo.com/v8/finance/chart/%5ENSEI?range=1d&interval=1m');
  const meta = json?.chart?.result?.[0]?.meta;
  const value = Number(meta?.regularMarketPrice ?? meta?.previousClose);
  const previousClose = Number(meta?.previousClose ?? meta?.chartPreviousClose);
  return { value, previousClose, change: valid(value) && valid(previousClose) ? value - previousClose : null, changePct: valid(value) && valid(previousClose) ? ((value - previousClose) / previousClose) * 100 : null };
}

async function fetchFuel(city) {
  const [petrolHtml, dieselHtml] = await Promise.all([
    fetchText(`https://www.hindustantimes.com/fuel-prices/petrol-city-${city}`),
    fetchText(`https://www.hindustantimes.com/fuel-prices/diesel-city-${city}`)
  ]);
  return { petrol: extractRupee(petrolHtml), diesel: extractRupee(dieselHtml) };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const [goldResult, fxResult, niftyResult, fuelResult] = await Promise.allSettled([
    fetchJson('https://api.gold-api.com/price/XAU'),
    fetchJson('https://api.frankfurter.dev/v2/rate/USD/INR'),
    fetchNifty(),
    fetchFuel('hyderabad')
  ]);
  const xauUsd = goldResult.status === 'fulfilled' ? Number(goldResult.value?.price) : null;
  const usdInr = fxResult.status === 'fulfilled' ? Number(fxResult.value?.rate) : null;
  const nifty50 = niftyResult.status === 'fulfilled' ? niftyResult.value : null;
  const fuel = fuelResult.status === 'fulfilled' ? fuelResult.value : null;
  if (!valid(xauUsd) || !valid(usdInr)) return res.status(502).json({ ok: false, error: 'Critical market providers are temporarily unavailable.' });
  const gold24kPer10g = (xauUsd / TROY_OUNCE_GRAMS) * 10 * usdInr * 0.999;
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
  return res.status(200).json({
    ok: true,
    source: 'Gold API + Frankfurter + Yahoo Finance + Hindustan Times fuel reference',
    location: 'Hyderabad, Telangana',
    usdInr: Number(usdInr.toFixed(4)),
    gold24k999InrPer10g: Math.round(gold24kPer10g),
    nifty50,
    fuel: fuel ? { petrolInrPerLitre: fuel.petrol, dieselInrPerLitre: fuel.diesel } : null,
    investments: {
      ppf: { rate: 7.10, unit: '% p.a.', period: 'Jul-Sep 2026' },
      nsc: { rate: 7.70, unit: '% p.a.', period: 'Jul-Sep 2026' },
      scss: { rate: 8.20, unit: '% p.a.', period: 'Jul-Sep 2026' },
      epf: { rate: 8.25, unit: '% p.a.', period: 'FY 2025-26' }
    },
    investmentNote: 'Government-announced reference rates; not market returns or guarantees.',
    fetchedAt: new Date().toISOString(),
    fxDate: fxResult.status === 'fulfilled' ? fxResult.value?.date ?? null : null,
    providerStatus: { gold: goldResult.status, fx: fxResult.status, nifty: niftyResult.status, fuel: fuelResult.status }
  });
}
