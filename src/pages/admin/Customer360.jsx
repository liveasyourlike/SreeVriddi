import React from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { UserCheck, ShieldCheck, History, FileText } from 'lucide-react';

const Customer360 = () => {
  const { customers } = useSreeVriddhi();
  const c = customers[0] || {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Customer 360° Profile Manager</h1>
        <p className="text-xs text-slate-400 mt-1">Full customer lifecycle view, KYC audit trails, and risk ratings.</p>
      </div>

      <div className="glass-card p-8 border-amber-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="font-mono text-xs text-amber-400 font-bold">{c.id}</span>
            <h2 className="text-xl font-bold text-white font-serif-brand">{c.name}</h2>
            <p className="text-xs text-slate-400">{c.location} | {c.phone} | {c.email}</p>
          </div>
          <span className="badge-approved px-3 py-1 rounded-full text-xs font-bold uppercase">KYC Verified (LOW RISK)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div><span>PAN Number:</span> <strong className="block font-mono text-white">{c.panNumber}</strong></div>
          <div><span>Aadhaar Last 4:</span> <strong className="block font-mono text-white">{c.aadhaarLast4}</strong></div>
          <div><span>Bank Name:</span> <strong className="block text-white">{c.bankName}</strong></div>
          <div><span>Active Contracts:</span> <strong className="block text-emerald-400">{c.activeContractsCount}</strong></div>
        </div>

        {/* 360 Customer Event Timeline */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-amber-300 font-serif-brand flex items-center gap-1.5">
            <History className="w-4 h-4" />
            <span>Customer Timeline Audit History</span>
          </h3>
          <div className="space-y-2 pl-4 border-l-2 border-amber-500/30">
            {c.timeline?.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white">{t.event}</span>
                  <span className="block text-[10px] text-slate-500">By: {t.user}</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400">{t.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer360;
