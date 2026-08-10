import React from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';

const Notifications = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">System Notifications</h1>
        <p className="text-xs text-slate-400 mt-1">Contractual alerts, settlement schedules, and document approvals.</p>
      </div>

      <div className="glass-card p-6 border-amber-500/20 space-y-3">
        {[
          { title: 'Legal Agreement Executed', desc: 'Contract SV-CON-2026-001 activated for 300g Physical Gold.', time: '2026-08-05' },
          { title: 'Gold Valuation Completed', desc: 'Assay report verified 999.9 purity. Market value fixed at ₹15,00,000.', time: '2026-08-04' },
          { title: 'KYC Verification Approved', desc: 'PAN & Aadhaar identity documents successfully verified.', time: '2026-08-03' }
        ].map((n, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <span>{n.title}</span>
              </h3>
              <span className="text-[10px] text-slate-500">{n.time}</span>
            </div>
            <p className="text-slate-400 pl-6">{n.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
