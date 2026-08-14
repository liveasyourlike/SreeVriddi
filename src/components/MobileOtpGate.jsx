import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock3, LockKeyhole, Smartphone } from 'lucide-react';

const normalizeMobile = (value) => String(value || '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');

export default function MobileOtpGate() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (seconds <= 0) return undefined;
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [seconds]);

  const sendOtp = async () => {
    const normalized = normalizeMobile(mobile);
    if (!/^\d{10}$/.test(normalized)) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    setBusy(true); setError(''); setMessage('');
    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: normalized }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.message || 'Unable to send OTP.');
      setSent(true); setSeconds(55); setOtp(''); setMessage(`OTP sent to ${data.mobile}.`);
    } catch (err) {
      setError(err.message || 'Unable to send OTP.');
      if (err?.message?.match(/wait (\d+) seconds/i)) setSeconds(Number(err.message.match(/wait (\d+) seconds/i)[1]));
    } finally { setBusy(false); }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    const normalized = normalizeMobile(mobile);
    if (!/^\d{4,10}$/.test(otp)) { setError('Enter the OTP received on your mobile.'); return; }
    setBusy(true); setError(''); setMessage('');
    try {
      const response = await fetch('/api/otp/verify', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: normalized, otp }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.verified) throw new Error(data.message || 'OTP verification failed.');
      sessionStorage.setItem('sreeVriddhiEvaluationMobile', normalized);
      setMessage('Mobile number verified successfully. Opening the evaluation form…');
      window.setTimeout(() => navigate('/eligibility/evaluation', { replace: true }), 250);
    } catch (err) {
      setError(err.message || 'OTP verification failed.');
    } finally { setBusy(false); }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="glass-card border border-amber-500/30 p-7 sm:p-9 space-y-7">
        <div className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
            <LockKeyhole className="w-7 h-7 text-amber-300" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Mobile verification required</span>
          <h1 className="text-3xl font-bold font-serif-brand text-white">Start Your Preliminary Evaluation</h1>
          <p className="text-sm text-slate-300 leading-relaxed">Verify your mobile number first. After successful OTP verification, you will be automatically taken to the <strong className="text-white">10-Point Preliminary Evaluation Form</strong>.</p>
        </div>

        <form onSubmit={verifyOtp} className="space-y-5">
          <div>
            <label className="text-xs font-semibold text-slate-200 block mb-2">Mobile Number</label>
            <div className="flex gap-2">
              <div className="px-3 rounded-xl border border-slate-700 bg-slate-950 flex items-center text-sm text-slate-300">+91</div>
              <input value={mobile.replace(/^\+?91\s*/, '')} onChange={(event) => setMobile(event.target.value)} inputMode="numeric" maxLength={10} placeholder="10-digit mobile number" className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400" />
              <button type="button" onClick={sendOtp} disabled={busy || seconds > 0} className="px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed">{seconds > 0 ? `${seconds}s` : sent ? 'Resend OTP' : 'Send OTP'}</button>
            </div>
            {seconds > 0 && <p className="mt-2 text-xs text-slate-400 flex items-center gap-1"><Clock3 className="w-3.5 h-3.5" /> New OTP available in {seconds} seconds.</p>}
          </div>

          {sent && <div>
            <label className="text-xs font-semibold text-slate-200 block mb-2">Enter OTP</label>
            <input value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 10))} inputMode="numeric" autoComplete="one-time-code" maxLength={10} placeholder="Enter OTP" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 tracking-[0.35em] text-center outline-none focus:border-amber-400" />
          </div>}

          {error && <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-200 px-4 py-3 text-xs">{error}</div>}
          {message && <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-200 px-4 py-3 text-xs flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 shrink-0" />{message}</div>}

          {sent && <button type="submit" disabled={busy} className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-extrabold text-sm uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-2"><Smartphone className="w-4 h-4" />{busy ? 'Verifying…' : 'Verify Mobile & Continue'}<ArrowRight className="w-4 h-4" /></button>}
        </form>

        <p className="text-[11px] text-center text-slate-500">OTP resend is limited by a 55-second countdown. Your mobile number is used only for this verification step.</p>
      </div>
    </div>
  );
}
