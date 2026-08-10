const TROY_OUNCE_GRAMS = 31.1034768;

async function fetchJson(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'SreeVriddhi-Market/1.0' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const [fxResult, goldResult] = await Promise.allSettled([
      fetchJson('https://api.exchangerate.host/latest?base=USD&symbols=INR'),
      fetchJson('https://data-asg.goldprice.org/dbXRates/USD')
    ]);

    const usdInr = fxResult.status === 'fulfilled' ? Number(fxResult.value?.rates?.INR) : null;
    const xauUsd = goldResult.status === 'fulfilled'
      ? Number(goldResult.value?.items?.[0]?.xauPrice)
      : null;

    if (!Number.isFinite(usdInr) || !Number.isFinite(xauUsd)) {
      throw new Error('Live market provider did not return usable USD/INR and XAU/USD values');
    }

    const goldPer10gInr = (xauUsd / TROY_OUNCE_GRAMS) * 10 * usdInr;
    const fetchedAt = new Date().toISOString();

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    return res.status(200).json({
      ok: true,
      source: 'GoldPrice.org XAU/USD + ExchangeRate.host USD/INR',
      priceType: 'International spot benchmark',
      usdInr: Number(usdInr.toFixed(4)),
      goldSpotUsdPerOz: Number(xauUsd.toFixed(2)),
      goldSpotInrPer10g: Number(goldPer10gInr.toFixed(0)),
      unit: 'INR per 10 grams equivalent',
      fetchedAt
    });
  } catch (error) {
    console.error('market/live error', error);
    return res.status(502).json({
      ok: false,
      error: 'Live market providers are temporarily unavailable.'
    });
  }
}
