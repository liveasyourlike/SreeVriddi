import React from 'react';
import { Lock, ShieldCheck, Scale, FileText, CheckCircle2 } from 'lucide-react';

const Protection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Risk Containment Framework</span>
        <h1 className="text-4xl font-extrabold font-serif-brand text-white">How We Protect Value</h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Our risk containment framework enforces strict separation of assets, certified physical vaulting, comprehensive insurance, and regulatory legal review.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 space-y-4 border-amber-500/30">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-serif-brand">Vault & Custody Security</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Physical gold and high-value physical assets are stored in high-security biometric vault facilities with comprehensive insurance coverage.</p>
        </div>

        <div className="glass-card p-8 space-y-4 border-amber-500/30">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-serif-brand">Bipartite Enforceability</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Every contract is drafted under standard Indian contract law, providing enforceable remedy and clarity for both customer and company.</p>
        </div>

        <div className="glass-card p-8 space-y-4 border-amber-500/30">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-serif-brand">Liquidity & Exposure Caps</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Our internal risk scoring engine prevents over-concentration in any single asset category or illiquid holding.</p>
        </div>
      </div>
    </div>
  );
};

export default Protection;
