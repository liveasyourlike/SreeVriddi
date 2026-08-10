import React from 'react';
import { FolderGit2, CheckCircle2, Clock } from 'lucide-react';

const DocumentManager = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Document Verification Vault</h1>
        <p className="text-xs text-slate-400 mt-1">Review customer KYC uploads, gold assay certificates, and property title deeds.</p>
      </div>

      <div className="glass-card p-6 border-amber-500/20 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {[
            { title: 'PAN Card (Ramesh Varma)', status: 'VERIFIED', date: '2026-08-02' },
            { title: 'Gold Assay Cert 300g', status: 'VERIFIED', date: '2026-08-04' },
            { title: 'Bank Account Statement', status: 'VERIFIED', date: '2026-08-02' }
          ].map((d, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="badge-approved px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold">{d.status}</span>
              <h3 className="font-bold text-white text-sm">{d.title}</h3>
              <span className="text-[10px] text-slate-500 block">Verified On: {d.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;
