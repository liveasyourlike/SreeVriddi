const getMobile = (value) => {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  return digits;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });

  const mobile = getMobile(req.body?.mobile);
  const otp = String(req.body?.otp || '').replace(/\D/g, '');
  if (!/^\d{10}$/.test(mobile) || !/^\d{4,10}$/.test(otp)) {
    return res.status(400).json({ ok: false, message: 'Enter the OTP sent to your mobile number.' });
  }

  const apiKey = process.env.FAST2SMS_API_KEY;
  if (!apiKey) return res.status(503).json({ ok: false, message: 'OTP service is not configured yet.' });

  try {
    const response = await fetch('https://www.fast2sms.com/dev/otp/verify', {
      method: 'POST',
      headers: { Authorization: apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, otp }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.return === false) {
      return res.status(response.status >= 400 ? response.status : 400).json({
        ok: false,
        message: data.message || 'Invalid or expired OTP. Please try again.',
      });
    }

    res.setHeader('Set-Cookie', [
      'sv_otp_sent_at=; HttpOnly; Secure; SameSite=Lax; Path=/api/otp; Max-Age=0',
      `sv_mobile_verified=${encodeURIComponent(mobile)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=1800`,
    ]);
    return res.status(200).json({ ok: true, verified: true, mobile: `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}` });
  } catch (error) {
    console.error('OTP verify error:', error);
    return res.status(502).json({ ok: false, message: 'OTP service could not be reached. Please try again.' });
  }
}
