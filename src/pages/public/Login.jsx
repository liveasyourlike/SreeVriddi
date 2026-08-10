import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Lock, UserCheck, Shield, ArrowRight } from 'lucide-react';

const Login = () => {
  const { brandSettings } = useSreeVriddhi();
  const navigate = useNavigate();
  const [role, setRole] = useState('customer'); // 'customer' | 'admin'

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/portal');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-card p-8 sm:p-10 space-y-6 border-amber-500/40 text-center">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center space-y-2">
          <div className="mb-2">
            <img src={brandSettings.primaryLogo} alt="Sree Vriddhi" className="w-40 object-contain mx-auto" />
          </div>
          <h1 className="text-2xl font-bold font-serif-brand text-white">SREE VRIDDHI</h1>
          <p className="text-xs text-amber-300 font-semibold tracking-wider uppercase">Portal Access Control</p>
        </div>

        {/* Role Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`py-2 rounded-lg transition-all ${role === 'customer' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Customer Portal
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`py-2 rounded-lg transition-all ${role === 'admin' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Admin & CRM
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Registered Phone / Email</label>
            <input
              type="text"
              required
              defaultValue={role === 'admin' ? 'admin@sreevriddhi.com' : 'ramesh.varma@example.com'}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400 font-mono"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Password</label>
            <input
              type="password"
              required
              defaultValue="••••••••••••"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
          >
            <span>Enter {role === 'admin' ? 'Admin CRM Dashboard' : 'Customer Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-slate-400 pt-2">
          Demo Environment: Click enter above to access the interactive portal view instantly.
        </p>

      </div>
    </div>
  );
};

export default Login;
