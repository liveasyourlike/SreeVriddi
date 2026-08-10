import React from 'react';
import { Link } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { FileSpreadsheet, Plus, Clock, CheckCircle2, Shield } from 'lucide-react';

const MyApplications = () => {
  const { applications } = useSreeVriddhi();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif-brand text-white">My Submitted Applications</h1>
          <p className="text-xs text-slate-400 mt-1">Track the 10-stage evaluation process for your submitted asset applications.</p>
        </div>
        <Link
          to="/portal/applications/new"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </Link>
      </div>

      <div className="glass-card p-6 border-amber-500/20">
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <span className="font-mono text-xs font-bold text-amber-400">{app.id}</span>
                  <h3 className="text-base font-bold text-white mt-0.5">{app.assetDescription}</h3>
                </div>
                <span className="badge-approved px-3 py-1 rounded-full text-xs font-bold uppercase">{app.status}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div>
                  <span>Category:</span>
                  <strong className="block text-slate-200">{app.assetType}</strong>
                </div>
                <div>
                  <span>Estimated Value:</span>
                  <strong className="block text-amber-300">₹{app.estimatedValue?.toLocaleString()}</strong>
                </div>
                <div>
                  <span>Preferred Tenure:</span>
                  <strong className="block text-slate-200">{app.tenure}</strong>
                </div>
                <div>
                  <span>Submitted On:</span>
                  <strong className="block text-slate-200">{new Date(app.submittedAt).toLocaleDateString()}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
