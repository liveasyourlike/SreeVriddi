const TROY_OUNCE_GRAMS = 31.1034768;

async function fetchJson(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'SreeVriddhi-Market/2.0', Accept: 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function validPositive(value) {
  return Number.isFinite(Number(value)) && Number(value) > 0;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const [goldResult, fxResult] = await Promise.allSettled([
      fetchJson('https://api.gold-api.com/price/XAU'),
      fetchJson('https://api.frankfurter.dev/v2/rate/USD/INR')
    ]);

    const xauUsd = goldResult.status === 'fulfilled' ? Number(goldResult.value?.price) : null;
    const usdInr = fxResult.status === 'fulfilled' ? Number(fxResult.value?.rate) : null;

    if (!validPositive(xauUsd) || !validPositive(usdInr)) {
      throw new Error(`Market providers failed: gold=${goldResult.status}, fx=${fxResult.status}`);
    }

    const gold24k999Per10g = (xauUsd / TROY_OUNCE_GRAMS) * 10 * usdInr * 0.999;
    const gold22k916Per10g = (xauUsd / TROY_OUNCE_GRAMS) * 10 * usdInr * (22 / 24);
    const gold18k750Per10g = (xauUsd / TROY_OUNCE_GRAMS) * 10 * usdInr * 0.75;
    const fetchedAt = new Date().toISOString();

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    return res.status(200).json({
      ok: true,
      source: 'Gold API XAU/USD + Frankfurter USD/INR',
      priceType: 'International spot-equivalent benchmark',
      usdInr: Number(usdInr.toFixed(4)),
      gold24k999InrPer10g: Math.round(gold24k999Per10g),
      gold22k916InrPer10g: Math.round(gold22k916Per10g),
      gold18k750InrPer10g: Math.round(gold18k750Per10g),
      gold24k999InrPer1g: Math.round(gold24k999Per10g / 10),
      unit: 'INR',
      fetchedAt,
      fxDate: fxResult.status === 'fulfilled' ? fxResult.value?.date ?? null : null
    });
  } catch (error) {
    console.error('market/live error', error);
    return res.status(502).json({
      ok: false,
      error: 'Live market providers are temporarily unavailable.'
    });
  }
}
