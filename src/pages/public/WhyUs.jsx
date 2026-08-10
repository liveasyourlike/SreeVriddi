import React from 'react';
import { ShieldCheck, Award, Lock, Scale, CheckCircle2 } from 'lucide-react';

const WhyUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Institutional Governance</span>
        <h1 className="text-4xl font-extrabold font-serif-brand text-white">Why Sree Vriddhi?</h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          We combine physical asset valuation rigor with transparent legal frameworks to provide unmatched value protection and predictable economic productivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 space-y-4 border-amber-500/30">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">1</div>
          <h3 className="text-xl font-bold text-white font-serif-brand">No Market Volatility Risk</h3>
          <p className="text-xs text-slate-300 leading-relaxed">Unlike speculative trading or stock markets, Sree Vriddhi contractual payouts are fixed by bipartite agreement, protecting your baseline value.</p>
        </div>

        <div className="glass-card p-8 space-y-4 border-amber-500/30">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">2</div>
          <h3 className="text-xl font-bold text-white font-serif-brand">30-Year Title Search & Assay Rigor</h3>
          <p className="text-xs text-slate-300 leading-relaxed">Every property title undergoes a thorough legal clearance search, while physical gold undergoes non-destructive biometric XRF assaying.</p>
        </div>

        <div className="glass-card p-8 space-y-4 border-amber-500/30">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">3</div>
          <h3 className="text-xl font-bold text-white font-serif-brand">Compliant Payout Schedules</h3>
          <p className="text-xs text-slate-300 leading-relaxed">Monthly or fortnightly payouts are scheduled directly via verified bank transfers (NEFT/RTGS) with full accounting receipts.</p>
        </div>

        <div className="glass-card p-8 space-y-4 border-amber-500/30">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">4</div>
          <h3 className="text-xl font-bold text-white font-serif-brand">Transparent Contract Exit</h3>
          <p className="text-xs text-slate-300 leading-relaxed">Defined 60-day notice period structures ensure smooth contract maturity, renewal, or principal asset return.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
