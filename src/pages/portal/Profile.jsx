import React from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { User, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const { customers } = useSreeVriddhi();
  const c = customers[0] || {};

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Customer Profile</h1>
        <p className="text-xs text-slate-400 mt-1">Verified identity and registered banking information.</p>
      </div>

      <div className="glass-card p-8 border-amber-500/30 space-y-4 text-xs">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg">
            RV
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-serif-brand">{c.name}</h2>
            <span className="text-emerald-400 font-semibold text-[11px]">Verified Customer ID: {c.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-slate-300">
          <div><span className="text-slate-400 block">Phone:</span> <strong>{c.phone}</strong></div>
          <div><span className="text-slate-400 block">Email:</span> <strong>{c.email}</strong></div>
          <div><span className="text-slate-400 block">PAN Number:</span> <strong className="font-mono">{c.panNumber}</strong></div>
          <div><span className="text-slate-400 block">Aadhaar (Last 4):</span> <strong className="font-mono">XXXX-XXXX-{c.aadhaarLast4}</strong></div>
          <div><span className="text-slate-400 block">Registered Bank:</span> <strong>{c.bankName}</strong></div>
          <div><span className="text-slate-400 block">Account Number:</span> <strong className="font-mono">{c.accountNumber}</strong></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
