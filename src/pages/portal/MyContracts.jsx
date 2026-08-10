import React, { useState } from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { FileCheck, Download, Printer, Shield, Eye, X } from 'lucide-react';

const MyContracts = () => {
  const { contracts, brandSettings } = useSreeVriddhi();
  const [activePdfContract, setActivePdfContract] = useState(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Executed Contracts</h1>
        <p className="text-xs text-slate-400 mt-1">Review legal agreement documents, settlement schedules, and contractual lock-in terms.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contracts.map(c => (
          <div key={c.id} className="glass-card p-6 space-y-4 border-amber-500/30 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs font-bold text-amber-400">{c.id}</span>
                  <h3 className="text-lg font-bold text-white font-serif-brand">{c.assetType}</h3>
                </div>
                <span className="badge-active px-3 py-1 rounded-full text-xs font-bold uppercase">{c.status}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Contract Value:</span>
                  <span className="font-bold text-white">₹{(c.contractValue / 100000).toFixed(1)} Lakhs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Agreed Monthly Return:</span>
                  <span className="font-bold text-emerald-400">₹{c.agreedMonthlyPayout?.toLocaleString()} / Mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tenure & Notice:</span>
                  <span className="text-slate-200">12 Months (60 Days Notice)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Start / Maturity:</span>
                  <span className="text-slate-300 font-mono">{c.startDate} to {c.maturityDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setActivePdfContract(c)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>View Legal Contract PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contract PDF Viewer Modal */}
      {activePdfContract && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 space-y-6 text-slate-200 relative">
            <button
              onClick={() => setActivePdfContract(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official PDF Document Template Header */}
            <div className="border-b-2 border-amber-500/40 pb-6 text-center space-y-2">
              <div className="flex justify-center mb-2">
                <img src={brandSettings.primaryLogo} alt="Brand Mark" className="w-28 object-contain" />
              </div>
              <h2 className="text-2xl font-bold font-serif-brand text-white tracking-widest">SREE VRIDDHI VALUE MANAGEMENT</h2>
              <p className="text-xs text-amber-300 font-serif uppercase tracking-widest">FORMAL BIPARTITE LEGAL AGREEMENT</p>
              <span className="inline-block font-mono text-xs text-amber-400 bg-slate-950 px-3 py-1 rounded-full border border-amber-500/30">
                Document Ref: {activePdfContract.id}
              </span>
            </div>

            {/* Document Body */}
            <div className="space-y-4 text-xs leading-relaxed text-slate-300 font-sans">
              <p>
                <strong>THIS VALUE MANAGEMENT AGREEMENT</strong> is executed on <span className="font-mono text-amber-300">{activePdfContract.startDate}</span> between <strong>SREE VRIDDHI VALUE MANAGEMENT PRIVATE LIMITED</strong> (hereinafter called the "Company") and <strong>{activePdfContract.customerName}</strong> (hereinafter called the "Asset Owner").
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 font-serif-brand">1. ASSET SPECIFICATION & VALUATION</h4>
                <p>Asset Description: {activePdfContract.assetType}</p>
                <p>Verified Contractual Asset Value: ₹{activePdfContract.contractValue?.toLocaleString()}</p>
                <p>Contract Start Date: {activePdfContract.startDate} | Contract Maturity Date: {activePdfContract.maturityDate}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 font-serif-brand">2. PERIODIC SETTLEMENT TERMS</h4>
                <p>Agreed Monthly Return Payout: ₹{activePdfContract.agreedMonthlyPayout?.toLocaleString()}</p>
                <p>Settlement Frequency: Monthly via direct NEFT / RTGS bank transfer.</p>
                <p>Notice Period Requirement: 60 Days prior written notice for contract maturity or renewal.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[11px] italic">
                <h4 className="font-bold text-amber-400 font-serif-brand not-italic">3. LEGAL COMPLIANCE DISCLAIMER</h4>
                <p>{brandSettings.commercialDisclaimer}</p>
              </div>
            </div>

            {/* Official Stamp & Signatures */}
            <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs">
              <div className="text-center">
                <div className="w-24 h-12 border border-dashed border-amber-500/30 rounded flex items-center justify-center text-[10px] text-amber-300/80 mb-1">
                  [DIGITALLY SIGNED]
                </div>
                <span className="text-slate-400 font-semibold">{activePdfContract.customerName}</span>
                <span className="block text-[10px] text-slate-500">Asset Owner</span>
              </div>

              <div className="text-center">
                <div className="w-24 h-12 border border-amber-500/50 rounded bg-amber-500/10 flex items-center justify-center text-[10px] text-amber-400 font-bold mb-1">
                  SEAL & STAMP
                </div>
                <span className="text-slate-400 font-semibold">Authorized Signatory</span>
                <span className="block text-[10px] text-slate-500">Sree Vriddhi Compliance</span>
              </div>
            </div>

            {/* Print Action */}
            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyContracts;
