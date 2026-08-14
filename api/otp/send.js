const getMobile = (value) => {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  return digits;
};

const parseCookies = (header = '') => Object.fromEntries(
  header.split(';').map((part) => part.trim()).filter(Boolean).map((part) => {
    const index = part.indexOf('=');
    return index === -1 ? [part, ''] : [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
  })
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });

  const mobile = getMobile(req.body?.mobile);
  if (!/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ ok: false, message: 'Enter a valid 10-digit Indian mobile number.' });
  }

  const apiKey = process.env.FAST2SMS_API_KEY;
  const otpId = process.env.FAST2SMS_OTP_ID;
  if (!apiKey || !otpId) {
    return res.status(503).json({ ok: false, message: 'OTP service is not configured yet.' });
  }

  const cookies = parseCookies(req.headers.cookie || '');
  const lastSentAt = Number(cookies.sv_otp_sent_at || 0);
  const elapsed = Date.now() - lastSentAt;
  if (lastSentAt && elapsed < 55_000) {
    return res.status(429).json({
      ok: false,
      retryAfter: Math.ceil((55_000 - elapsed) / 1000),
      message: `Please wait ${Math.ceil((55_000 - elapsed) / 1000)} seconds before requesting another OTP.`,
    });
  }

  try {
    const response = await fetch('https://www.fast2sms.com/dev/otp/send', {
      method: 'POST',
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile,
        otp_id: otpId,
        otp_length: 6,
        otp_expiry: 5,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.return === false) {
      return res.status(response.status >= 400 ? response.status : 502).json({
        ok: false,
        message: data.message || 'Unable to send OTP. Please try again.',
      });
    }

    res.setHeader('Set-Cookie', `sv_otp_sent_at=${Date.now()}; HttpOnly; Secure; SameSite=Lax; Path=/api/otp; Max-Age=3600`);
    return res.status(200).json({ ok: true, mobile: `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`, retryAfter: 55 });
  } catch (error) {
    console.error('OTP send error:', error);
    return res.status(502).json({ ok: false, message: 'OTP service could not be reached. Please try again.' });
  }
}
