import React from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { FileCheck2, CheckCircle2, Clock } from 'lucide-react';

const ApplicationManager = () => {
  const { applications } = useSreeVriddhi();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Application Lifecycle Manager</h1>
        <p className="text-xs text-slate-400 mt-1">Process submitted 10-step customer asset applications and generate proposals.</p>
      </div>

      <div className="glass-card p-6 border-amber-500/20 space-y-4">
        {applications.map(app => (
          <div key={app.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400">{app.id}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{app.customerName} ({app.assetType})</h3>
              </div>
              <span className="badge-approved px-3 py-1 rounded-full text-xs font-bold uppercase">{app.status}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div><span>Mobile:</span> <strong className="block text-slate-200">{app.mobile}</strong></div>
              <div><span>Estimated Value:</span> <strong className="block text-amber-300">₹{app.estimatedValue?.toLocaleString()}</strong></div>
              <div><span>Nominee:</span> <strong className="block text-slate-200">{app.nomineeName}</strong></div>
              <div><span>Bank IFSC:</span> <strong className="block font-mono text-slate-200">{app.bankDetails?.ifsc}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationManager;
