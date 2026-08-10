import React, { useState } from 'react';
import { Calculator, ShieldCheck, AlertTriangle, Scale, Lock } from 'lucide-react';

const ValuationEngine = () => {
  const [assetType, setAssetType] = useState('Physical Gold');
  const [marketRef, setMarketRef] = useState(7200); // e.g. Gold per gram in INR
  const [qty, setQty] = useState(300); // 300g
  const [encumbrance, setEncumbrance] = useState('Clear Title (0% Haircut)');
  const [overrideNote, setOverrideNote] = useState('');

  const grossValue = marketRef * qty;
  const riskDiscount = encumbrance === 'Clear Title (0% Haircut)' ? 0 : 0.20;
  const eligibleValue = grossValue * (1 - riskDiscount);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Certified Valuation & Risk Engine</h1>
        <p className="text-xs text-slate-400 mt-1">Multi-factor valuation calculator, risk hair-cut adjustments, and override logging.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calculator Form */}
        <div className="lg:col-span-7 glass-card p-8 space-y-4 border-amber-500/30 text-xs">
          <h3 className="text-sm font-bold text-amber-300 font-serif-brand border-b border-slate-800 pb-3">Valuation Parameters</h3>
          
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Asset Category</label>
            <select value={assetType} onChange={e => setAssetType(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100">
              <option value="Physical Gold">Physical Gold (24K Assay)</option>
              <option value="Land & Property">Commercial Real Estate</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Benchmark Market Price (₹ per unit)</label>
            <input type="number" value={marketRef} onChange={e => setMarketRef(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-amber-300 font-mono font-bold" />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Quantity / Area Units (e.g. Grams or Sq Yds)</label>
            <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 font-mono" />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Encumbrance / Risk Adjustment Haircut</label>
            <select value={encumbrance} onChange={e => setEncumbrance(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100">
              <option value="Clear Title (0% Haircut)">Clear Title (0% Haircut)</option>
              <option value="Joint Owner Consent (20% Haircut)">Joint Owner Consent (20% Haircut)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Senior Officer Override Justification Note</label>
            <input type="text" value={overrideNote} onChange={e => setOverrideNote(e.target.value)} placeholder="Required if overriding baseline valuation" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100" />
          </div>
        </div>

        {/* Valuation Result */}
        <div className="lg:col-span-5 glass-card p-8 space-y-6 border-amber-500/30 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-amber-300 font-serif-brand border-b border-slate-800 pb-3">Valuation Output & Exposure Cap</h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Gross Estimated Value:</span>
                <span className="font-bold text-white font-mono">₹{grossValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Risk Haircut Discount:</span>
                <span className="font-bold text-rose-400">{(riskDiscount * 100)}%</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm">
                <span className="text-amber-300 font-bold">Eligible Exposure Cap:</span>
                <span className="font-bold text-emerald-400 font-mono">₹{eligibleValue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg">
            Approve & Lock Valuation Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValuationEngine;
