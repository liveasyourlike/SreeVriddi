const cors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.AI_ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
};

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Preview-safe customer profile endpoint.
  // Persistent CRM/database integration is intentionally isolated for the next phase.
  const { fullName, email, asset, amount, callDate, callTime } = req.body || {};
  if (!fullName || !email) return res.status(400).json({ error: 'Full name and email are required.' });

  return res.status(200).json({
    found: false,
    action: 'create',
    customer: {
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      asset: asset || '',
      amount: amount || '',
      callDate: callDate || '',
      callTime: callTime || ''
    },
    message: `Welcome to Sree Vriddhi, ${String(fullName).trim()}! Your preview profile is ready.`
  });
}
