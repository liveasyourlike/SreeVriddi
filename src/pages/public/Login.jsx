import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Sparkles } from 'lucide-react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';

const Login = () => {
  const { brandSettings } = useSreeVriddhi();
  const navigate = useNavigate();

  const handleCustomerLogin = (e) => {
    e.preventDefault();
    navigate('/portal');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-card p-8 sm:p-10 space-y-6 border-amber-500/40 text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="mb-2">
            <img src={brandSettings.primaryLogo} alt="Sree Vriddhi" className="w-40 object-contain mx-auto" />
          </div>
          <h1 className="text-2xl font-bold font-serif-brand text-white">SREE VRIDDHI</h1>
          <p className="text-xs text-amber-300 font-semibold tracking-wider uppercase">Customer Portal Access</p>
        </div>

        <form onSubmit={handleCustomerLogin} className="space-y-4 text-left text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Registered Phone / Email</label>
            <input
              type="text"
              required
              autoComplete="username"
              placeholder="Enter your registered phone or email"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
          >
            <span>Enter Customer Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 text-left">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            Admin & CRM — Coming Soon
          </div>
          <p className="mt-2 text-[11px] leading-5 text-slate-400">
            The Admin and CRM login is temporarily hidden while the secure CRM release is being prepared. The existing CRM implementation is preserved and will be re-enabled in a future release.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
          <Lock className="w-3 h-3" /> Secure portal access
        </div>
      </div>
    </div>
  );
};

export default Login;
