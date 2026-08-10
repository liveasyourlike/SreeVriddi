import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Coins, Banknote, Building2, FileSpreadsheet, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

const AssetDetail = () => {
  const { type } = useParams();
  const { assetCategories } = useSreeVriddhi();

  const asset = assetCategories.find(a => a.slug === type) || assetCategories[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <Link to="/assets" className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Assets</span>
      </Link>

      <div className="glass-card p-8 sm:p-12 space-y-6 border-amber-500/40">
        <div className="flex justify-between items-start border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">Asset Category Overview</span>
            <h1 className="text-3xl font-bold font-serif-brand text-white mt-1">{asset.type}</h1>
          </div>
          <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full badge-approved">
            Status: {asset.status}
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">{asset.description}</p>

        <div className="space-y-3 pt-4">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">Mandatory Verification Guidelines</h3>
          <ul className="space-y-2">
            {asset.documentation.map((doc, idx) => (
              <li key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
          <p className="text-xs text-slate-400">Ready to evaluate your {asset.type} holding?</p>
          <Link to="/eligibility" className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider">
            Check Eligibility Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;
