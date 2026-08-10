import React from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { History, ShieldCheck, Search } from 'lucide-react';

const AuditLog = () => {
  const { auditLogs } = useSreeVriddhi();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif-brand text-white">System Audit & Governance Log</h1>
          <p className="text-xs text-slate-400 mt-1">Review all admin, compliance, contract, and product configuration events.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-amber-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Immutable Governance Trail</span>
        </div>
      </div>

      <div className="glass-card p-6 border-amber-500/20">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-bold text-white">Recent Activity</span>
        </div>
        <div className="space-y-3">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-mono text-amber-400 font-bold">{log.action}</span>
                <span className="text-slate-500">{log.timestamp}</span>
              </div>
              <p className="text-slate-300">{log.details}</p>
              <span className="text-[11px] text-slate-500 block">Performed by: {log.user}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuditLog;
