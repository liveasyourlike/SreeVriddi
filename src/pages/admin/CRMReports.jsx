import React from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { BarChart3, TrendingUp, Users, Coins } from 'lucide-react';

const CRMReports = () => {
  const { leads, contracts } = useSreeVriddhi();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Analytics & CRM Reports</h1>
        <p className="text-xs text-slate-400 mt-1">Lead conversion rates, asset category distributions, and pipeline forecasts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-amber-500/20 space-y-2">
          <span className="text-xs font-semibold text-slate-400 block">Lead Conversion Efficiency</span>
          <p className="text-3xl font-bold font-serif-brand text-emerald-400">68%</p>
          <span className="text-[10px] text-slate-500 block">Website Lead to Qualification Ratio</span>
        </div>

        <div className="glass-card p-6 border-amber-500/20 space-y-2">
          <span className="text-xs font-semibold text-slate-400 block">Average Asset Contract Tenure</span>
          <p className="text-3xl font-bold font-serif-brand text-amber-300">12 Months</p>
          <span className="text-[10px] text-slate-500 block">Standard Lock-in with 60-day notice</span>
        </div>

        <div className="glass-card p-6 border-amber-500/20 space-y-2">
          <span className="text-xs font-semibold text-slate-400 block">Asset Concentration Cap</span>
          <p className="text-3xl font-bold font-serif-brand text-white">Gold 60% / Realty 40%</p>
          <span className="text-[10px] text-emerald-400 block">Within Risk Thresholds</span>
        </div>
      </div>
    </div>
  );
};

export default CRMReports;
