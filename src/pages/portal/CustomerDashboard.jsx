import React from 'react';
import { Link } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Coins, FileCheck, CreditCard, Clock, ArrowRight, ShieldCheck, FileSpreadsheet } from 'lucide-react';

const CustomerDashboard = () => {
  const { customers, contracts, settlements, applications } = useSreeVriddhi();

  const customer = customers[0] || { name: 'Ramesh Varma', totalActiveValue: 1500000 };
  const activeContract = contracts[0] || { id: 'SV-CON-2026-001', contractValue: 1500000, agreedMonthlyPayout: 75000 };
  const nextSettlement = settlements[0] || { amount: 75000, dueDate: '2026-09-05' };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-amber-500/20 p-6 rounded-2xl">
        <div>
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Customer Dashboard</span>
          <h1 className="text-2xl font-bold font-serif-brand text-white">Welcome back, {customer.name}</h1>
          <p className="text-xs text-slate-400 mt-1">KYC Status: <span className="text-emerald-400 font-semibold">VERIFIED</span> | Account ID: SV-CUST-2026-089</p>
        </div>
        
        <Link
          to="/portal/applications/new"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1.5 hover:scale-105 transition-all"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>New Asset Application</span>
        </Link>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 space-y-2 border-amber-500/30">
          <span className="text-xs font-semibold text-slate-400 block">Total Active Asset Value</span>
          <p className="text-2xl font-bold font-serif-brand text-amber-300">₹{(customer.totalActiveValue / 100000).toFixed(2)} Lakhs</p>
          <span className="text-[10px] text-slate-500 block">Physical Gold (300g assay certified)</span>
        </div>

        <div className="glass-card p-6 space-y-2 border-amber-500/30">
          <span className="text-xs font-semibold text-slate-400 block">Active Value Contracts</span>
          <p className="text-2xl font-bold font-serif-brand text-white">{contracts.length} Active</p>
          <span className="text-[10px] text-emerald-400 block font-mono">Contract ID: {activeContract.id}</span>
        </div>

        <div className="glass-card p-6 space-y-2 border-amber-500/30">
          <span className="text-xs font-semibold text-slate-400 block">Next Scheduled Settlement</span>
          <p className="text-2xl font-bold font-serif-brand text-emerald-400">₹{nextSettlement.amount?.toLocaleString()}</p>
          <span className="text-[10px] text-slate-400 block">Due Date: {nextSettlement.dueDate}</span>
        </div>

        <div className="glass-card p-6 space-y-2 border-amber-500/30">
          <span className="text-xs font-semibold text-slate-400 block">Notice Period Status</span>
          <p className="text-2xl font-bold font-serif-brand text-slate-300">60 Days</p>
          <span className="text-[10px] text-slate-500 block">Standard Contractual Lock-in</span>
        </div>
      </div>

      {/* Quick Action Tables & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Active Contracts Summary */}
        <div className="glass-card p-6 space-y-4 border-amber-500/20">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white font-serif-brand">Active Value Contracts</h3>
            <Link to="/portal/contracts" className="text-xs text-amber-400 hover:underline">View All →</Link>
          </div>

          <div className="space-y-3">
            {contracts.map(c => (
              <div key={c.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-amber-400 font-bold">{c.id}</span>
                    <h4 className="text-white font-bold">{c.assetType}</h4>
                  </div>
                  <span className="badge-active px-2.5 py-0.5 rounded-full uppercase text-[10px]">{c.status}</span>
                </div>
                <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>Contract Value: <strong className="text-slate-200">₹{(c.contractValue / 100000).toFixed(1)} Lakhs</strong></span>
                  <span>Monthly Payout: <strong className="text-emerald-400">₹{c.agreedMonthlyPayout?.toLocaleString()}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Tracker */}
        <div className="glass-card p-6 space-y-4 border-amber-500/20">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white font-serif-brand">Recent Applications</h3>
            <Link to="/portal/applications" className="text-xs text-amber-400 hover:underline">Track All →</Link>
          </div>

          <div className="space-y-3">
            {applications.map(app => (
              <div key={app.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-amber-400 font-bold">{app.id}</span>
                    <h4 className="text-white font-bold">{app.assetDescription}</h4>
                  </div>
                  <span className="badge-approved px-2.5 py-0.5 rounded-full uppercase text-[10px]">{app.status}</span>
                </div>
                <p className="text-slate-400 text-[11px]">Submitted: {new Date(app.submittedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;
