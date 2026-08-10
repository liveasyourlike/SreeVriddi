import React from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { FileText, CheckCircle2, Shield } from 'lucide-react';

const ContractManager = () => {
  const { contracts } = useSreeVriddhi();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Contract Management Engine</h1>
        <p className="text-xs text-slate-400 mt-1">Generate legal agreements (SV-CON-2026-XXXXXX), set status, and manage signoffs.</p>
      </div>

      <div className="glass-card p-6 border-amber-500/20 space-y-4">
        {contracts.map(c => (
          <div key={c.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400">{c.id}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{c.customerName} ({c.assetType})</h3>
              </div>
              <span className="badge-active px-3 py-1 rounded-full text-xs font-bold uppercase">{c.status}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div><span>Contract Value:</span> <strong className="block text-amber-300">₹{(c.contractValue / 100000).toFixed(1)} Lakhs</strong></div>
              <div><span>Monthly Payout:</span> <strong className="block text-emerald-400">₹{c.agreedMonthlyPayout?.toLocaleString()}</strong></div>
              <div><span>Start Date:</span> <strong className="block text-slate-200">{c.startDate}</strong></div>
              <div><span>Maturity Date:</span> <strong className="block text-slate-200">{c.maturityDate}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractManager;
