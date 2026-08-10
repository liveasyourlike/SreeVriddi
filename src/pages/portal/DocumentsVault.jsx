import React from 'react';
import { FolderArchive, Upload, CheckCircle2, Clock, FileText } from 'lucide-react';

const DocumentsVault = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-serif-brand text-white">Documents Vault</h1>
          <p className="text-xs text-slate-400 mt-1">Secure repository for identity KYC, title deeds, and legal contracts.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: 'PAN Card KYC', status: 'Verified', date: '2026-08-02' },
          { title: 'Aadhaar Card KYC', status: 'Verified', date: '2026-08-02' },
          { title: 'Gold Assay & Purity Cert', status: 'Verified', date: '2026-08-04' },
          { title: 'Legal Agreement SV-CON-001', status: 'Verified', date: '2026-08-05' },
          { title: 'Bank Account Passbook / Mandate', status: 'Verified', date: '2026-08-02' }
        ].map((doc, idx) => (
          <div key={idx} className="glass-card p-5 space-y-3 border-amber-500/20 text-xs">
            <div className="flex justify-between items-start">
              <FileText className="w-6 h-6 text-amber-400" />
              <span className="badge-approved px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold">{doc.status}</span>
            </div>
            <h3 className="font-bold text-white text-sm">{doc.title}</h3>
            <span className="text-[11px] text-slate-400 block">Uploaded: {doc.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsVault;
