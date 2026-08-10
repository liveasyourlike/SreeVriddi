import React from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Banknote, CheckCircle2, Clock } from 'lucide-react';

const SettlementEngine = () => {
  const { settlements } = useSreeVriddhi();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Settlement & Payout Engine</h1>
        <p className="text-xs text-slate-400 mt-1">Schedule contractual monthly payouts, process bank transfers, and log references.</p>
      </div>

      <div className="glass-card p-6 border-amber-500/20 space-y-4">
        {settlements.map(s => (
          <div key={s.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400">{s.id}</span>
                <h3 className="text-base font-bold text-white mt-0.5">Recipient: {s.customerName} ({s.contractId})</h3>
              </div>
              <span className="badge-review px-3 py-1 rounded-full text-xs font-bold uppercase">{s.status}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div><span>Payout Amount:</span> <strong className="block text-emerald-400 text-sm">₹{s.amount?.toLocaleString()}</strong></div>
              <div><span>Due Date:</span> <strong className="block text-amber-300">{s.dueDate}</strong></div>
              <div><span>Disbursement Method:</span> <strong className="block text-slate-200">{s.method}</strong></div>
              <div><span>Payment Reference:</span> <strong className="block font-mono text-slate-200">{s.paymentRef}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettlementEngine;
