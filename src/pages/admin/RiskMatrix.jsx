import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Shield } from 'lucide-react';

const RiskMatrix = () => {
  const riskCategories = [
    { name: 'Customer Risk', score: 20, level: 'LOW', details: 'Complete PAN & Aadhaar KYC verified' },
    { name: 'Asset Risk', score: 25, level: 'MEDIUM', details: 'Gold purity assay certified, 300g physical holding' },
    { name: 'Liquidity Risk', score: 15, level: 'LOW', details: 'Gold is liquid asset with active secondary market' },
    { name: 'Concentration Risk', score: 30, level: 'MEDIUM', details: 'Portfolio concentration within safe exposure threshold' },
    { name: 'Operational Risk', score: 10, level: 'LOW', details: 'Biometric vault custody & full insurance coverage' },
    { name: 'Fraud Risk', score: 5, level: 'LOW', details: 'Zero identity discrepancies' },
    { name: 'Legal Risk', score: 12, level: 'LOW', details: 'Clean title deed search report' },
    { name: 'Market Risk', score: 22, level: 'MEDIUM', details: 'Notice period lock-in buffer' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Enterprise Risk Score Matrix</h1>
        <p className="text-xs text-slate-400 mt-1">Multi-factor risk assessment across customer, asset, liquidity, and legal dimensions.</p>
      </div>

      <div className="glass-card p-6 border-amber-500/30 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white font-serif-brand">Overall Risk Rating: <span className="text-emerald-400">MEDIUM (Score: 139 / 800)</span></h2>
          <span className="badge-approved px-3 py-1 rounded-full text-xs font-bold uppercase">APPROVED FOR CONTRACT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {riskCategories.map((cat, idx) => (
            <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">{cat.name}</span>
                <span className="badge-review px-2 py-0.5 rounded text-[10px] uppercase font-bold">{cat.level}</span>
              </div>
              <p className="text-[11px] text-slate-400">{cat.details}</p>
              <div className="text-[10px] text-amber-300 font-mono font-bold">Score Weight: {cat.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskMatrix;
