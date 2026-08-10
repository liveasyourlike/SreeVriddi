import React from 'react';
import { Link } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { PackageCheck, ShieldAlert, ArrowRight, CheckCircle2, Scale, Clock } from 'lucide-react';

const Products = () => {
  const { products, brandSettings } = useSreeVriddhi();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Dynamic Product Catalogue</span>
        <h1 className="text-4xl font-extrabold font-serif-brand text-white">Sree Vriddhi Product Frameworks</h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Each product structure is engineered around specific asset classes, legal tenures, and approved commercial assumptions.
        </p>
      </div>

      {/* Commercial Disclaimer Callout */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 text-center font-medium">
        {brandSettings.commercialDisclaimer}
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((prod) => (
          <div key={prod.id} className="glass-card p-8 space-y-6 flex flex-col justify-between border-amber-500/30 hover:border-amber-500/50 transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full ${
                  prod.status === 'Active' ? 'badge-active' :
                  prod.status === 'Compliance Approved' ? 'badge-approved' : 'badge-review'
                }`}>
                  {prod.status}
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{prod.tenure}</span>
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-serif-brand">{prod.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{prod.description}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Indicative Commercial Structure:</span>
                <p className="text-base font-bold text-amber-300">
                  {prod.proposedMonthlyReturn}% Monthly / {prod.proposedFortnightlyReturn}% Fortnightly
                </p>
                <span className="text-[10px] text-slate-400 block">Notice Period: {prod.noticePeriodDays} Days</span>
              </div>

              <div className="space-y-1 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Min Exposure Value:</span>
                  <span className="font-semibold text-white">₹{(prod.minAssetValue / 100000).toFixed(1)} Lakhs</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Legal Review Status:</span>
                  <span className="font-semibold text-emerald-400">{prod.legalStatus}</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                {prod.riskDisclaimer}
              </p>
            </div>

            <div className="pt-2">
              <Link
                to={`/products/${prod.slug}`}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center gap-1 shadow-md"
              >
                <span>View Full Product Terms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Products;
