import React from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Coins, CheckCircle2, ShieldCheck, FileSpreadsheet } from 'lucide-react';

const MyAssets = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">My Submitted & Verified Assets</h1>
        <p className="text-xs text-slate-400 mt-1">Certified valuation records and vault custody statuses.</p>
      </div>

      <div className="glass-card p-6 border-amber-500/20 space-y-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400">SV-AST-2026-0041</span>
              <h3 className="text-lg font-bold text-white font-serif-brand mt-0.5">300 Grams 24K Certified Physical Gold</h3>
            </div>
            <span className="badge-approved px-3 py-1 rounded-full text-xs font-bold uppercase">Custody Verified</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div>
              <span>Verified Market Value:</span>
              <strong className="block text-amber-300">₹15,00,000</strong>
            </div>
            <div>
              <span>Purity Assaying:</span>
              <strong className="block text-emerald-400">999.9 Hallmarked</strong>
            </div>
            <div>
              <span>Vault Location:</span>
              <strong className="block text-slate-200">High-Security Vault A2</strong>
            </div>
            <div>
              <span>Encumbrance Check:</span>
              <strong className="block text-emerald-400">100% Clear Title</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAssets;
