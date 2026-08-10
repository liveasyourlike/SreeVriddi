import React from 'react';
import { Link } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Users, Coins, FileCheck2, ShieldAlert, Banknote, ArrowUpRight, History, PackageCheck } from 'lucide-react';

const AdminDashboard = () => {
  const { leads, customers, contracts, products, auditLogs } = useSreeVriddhi();

  const totalPipelineValue = leads.reduce((acc, l) => acc + (l.approxValue || 0), 0);
  const totalActiveValue = contracts.reduce((acc, c) => acc + (c.contractValue || 0), 0);

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-amber-500/20 p-6 rounded-2xl">
        <div>
          <span className="text-xs text-emerald-400 font-bold tracking-widest uppercase">Executive Control Center</span>
          <h1 className="text-2xl font-bold font-serif-brand text-white">Sree Vriddhi Admin Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time pipeline monitoring, risk score matrix, and contract governance.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/leads" className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
            Manage Leads
          </Link>
          <Link to="/admin/products" className="px-4 py-2 rounded-xl bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            Configure Rates
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 space-y-2 border-amber-500/30">
          <span className="text-xs font-semibold text-slate-400 block">Total Pipeline Value (Leads)</span>
          <p className="text-2xl font-bold font-serif-brand text-amber-300">₹{(totalPipelineValue / 100000).toFixed(1)} Lakhs</p>
          <span className="text-[10px] text-slate-500 block">{leads.length} Active Leads in Pipeline</span>
        </div>

        <div className="glass-card p-6 space-y-2 border-amber-500/30">
          <span className="text-xs font-semibold text-slate-400 block">Active Value Under Contract</span>
          <p className="text-2xl font-bold font-serif-brand text-emerald-400">₹{(totalActiveValue / 100000).toFixed(1)} Lakhs</p>
          <span className="text-[10px] text-slate-500 block">{contracts.length} Activated Contracts</span>
        </div>

        <div className="glass-card p-6 space-y-2 border-amber-500/30">
          <span className="text-xs font-semibold text-slate-400 block">Total Customers 360</span>
          <p className="text-2xl font-bold font-serif-brand text-white">{customers.length} Accounts</p>
          <span className="text-[10px] text-emerald-400 block font-semibold">100% KYC Verified</span>
        </div>

        <div className="glass-card p-6 space-y-2 border-amber-500/30">
          <span className="text-xs font-semibold text-slate-400 block">Active Product Structures</span>
          <p className="text-2xl font-bold font-serif-brand text-amber-400">{products.length} Products</p>
          <span className="text-[10px] text-slate-400 block">Default Assumption: 5% Monthly</span>
        </div>
      </div>

      {/* Lead Pipeline & Recent Audit Log Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Leads Teaser */}
        <div className="glass-card p-6 space-y-4 border-amber-500/20">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white font-serif-brand">Recent Leads & Enquiries</h3>
            <Link to="/admin/leads" className="text-xs text-amber-400 hover:underline">Open Kanban Board →</Link>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 3).map(l => (
              <div key={l.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-amber-400 font-bold">{l.id}</span>
                    <h4 className="text-white font-bold">{l.name} ({l.location})</h4>
                  </div>
                  <span className="badge-review px-2.5 py-0.5 rounded-full uppercase text-[10px]">{l.stage}</span>
                </div>
                <div className="flex justify-between text-slate-400 pt-1">
                  <span>Asset: <strong className="text-slate-200">{l.assetType}</strong></span>
                  <span>Approx Value: <strong className="text-amber-300">₹{(l.approxValue / 100000).toFixed(1)}L</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Teaser */}
        <div className="glass-card p-6 space-y-4 border-amber-500/20">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white font-serif-brand">System Audit Log</h3>
            <Link to="/admin/audit" className="text-xs text-amber-400 hover:underline">Full Log →</Link>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 4).map(log => (
              <div key={log.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between text-slate-400 text-[10px]">
                  <span className="font-mono text-amber-300 font-bold">{log.action}</span>
                  <span>{log.timestamp}</span>
                </div>
                <p className="text-slate-300">{log.details}</p>
                <span className="text-[10px] text-slate-500 block">User: {log.user}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
