import React from 'react';
import { Scale, ShieldCheck, FileText } from 'lucide-react';

const ComplianceManager = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Compliance & Regulatory Governance</h1>
        <p className="text-xs text-slate-400 mt-1">Manage product approval statuses, legal search requirements, and regulatory disclosures.</p>
      </div>

      <div className="glass-card p-6 border-amber-500/20 space-y-4">
        <h2 className="text-base font-bold text-white font-serif-brand border-b border-slate-800 pb-3">Regulatory Status Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400">Legal Product Approval:</span>
            <span className="badge-approved px-2.5 py-0.5 rounded-full uppercase text-[10px] block w-fit">Compliance Verified</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400">Asset Title Verification:</span>
            <span className="badge-active px-2.5 py-0.5 rounded-full uppercase text-[10px] block w-fit">Mandatory 30-Yr Search</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400">Grievance Mechanism:</span>
            <span className="badge-approved px-2.5 py-0.5 rounded-full uppercase text-[10px] block w-fit font-bold">Active Public Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceManager;
