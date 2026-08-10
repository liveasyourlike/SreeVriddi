import React from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { CreditCard, CheckCircle2, Clock } from 'lucide-react';

const MySettlements = () => {
  const { settlements } = useSreeVriddhi();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Settlement & Payout History</h1>
        <p className="text-xs text-slate-400 mt-1">Track scheduled and completed monthly contractual payouts.</p>
      </div>

      <div className="glass-card p-6 border-amber-500/20">
        <div className="space-y-3">
          {settlements.map(s => (
            <div key={s.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
              <div>
                <span className="font-mono text-amber-400 font-bold">{s.id}</span>
                <h4 className="text-white font-bold">Contract Payout: {s.contractId}</h4>
                <p className="text-slate-400 text-[11px]">Method: {s.method}</p>
              </div>

              <div className="text-right">
                <span className="text-lg font-bold text-emerald-400 block font-serif-brand">₹{s.amount?.toLocaleString()}</span>
                <span className="badge-review px-2.5 py-0.5 rounded-full uppercase text-[10px] inline-block mt-1">{s.status} (Due {s.dueDate})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySettlements;
