import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams();
  const { products, brandSettings } = useSreeVriddhi();

  const prod = products.find(p => p.slug === slug) || products[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <Link to="/products" className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Product Catalogue</span>
      </Link>

      <div className="glass-card p-8 sm:p-12 space-y-8 border-amber-500/40">
        <div className="flex justify-between items-start border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">Product ID: {prod.id}</span>
            <h1 className="text-3xl font-bold font-serif-brand text-white mt-1">{prod.name}</h1>
          </div>
          <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full badge-approved">
            {prod.status}
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">{prod.description}</p>

        <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-slate-400 font-medium block">Indicative Monthly Return Assumption:</span>
            <span className="text-xl font-bold text-amber-300">{prod.proposedMonthlyReturn}%</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Indicative Fortnightly Return Assumption:</span>
            <span className="text-xl font-bold text-amber-300">{prod.proposedFortnightlyReturn}%</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Contract Tenure:</span>
            <span className="text-sm font-bold text-white">{prod.tenure}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Notice Period:</span>
            <span className="text-sm font-bold text-white">{prod.noticePeriodDays} Days</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">Eligible Asset Categories</h3>
          <div className="flex flex-wrap gap-2">
            {prod.eligibleAssets.map((asset, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200">
                {asset}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed space-y-1">
          <strong className="block text-amber-300">LEGAL & RISK DISCLOSURE:</strong>
          <p>{prod.riskDisclaimer}</p>
          <p className="pt-1 text-[11px] text-slate-400">{brandSettings.commercialDisclaimer}</p>
        </div>

        <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
          <p className="text-xs text-slate-400">Ready to initiate formal evaluation?</p>
          <Link to="/eligibility" className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider">
            Check Asset Eligibility
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
