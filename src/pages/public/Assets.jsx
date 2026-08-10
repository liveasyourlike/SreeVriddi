import React from 'react';
import { Link } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Coins, Banknote, Building2, FileSpreadsheet, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

const Assets = () => {
  const { assetCategories } = useSreeVriddhi();

  const assetIcons = {
    'Banknote': Banknote,
    'Coins': Coins,
    'Building2': Building2,
    'FileSpreadsheet': FileSpreadsheet
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Value Evaluation</span>
        <h1 className="text-4xl font-extrabold font-serif-brand text-white">Value Comes in Many Forms</h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Not every submitted asset is automatically accepted. Sree Vriddhi enforces strict legal title searches, independent valuations, and compliance eligibility matching.
        </p>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {assetCategories.map((cat) => {
          const Icon = assetIcons[cat.icon] || Coins;
          return (
            <div key={cat.id} className="glass-card p-8 space-y-6 flex flex-col justify-between border-amber-500/30 hover:border-amber-500/50 transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full ${
                    cat.status === 'Approved' ? 'badge-approved' :
                    cat.status === 'Conditional' ? 'badge-review' : 'badge-suspended'
                  }`}>
                    Status: {cat.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white font-serif-brand">{cat.type}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{cat.description}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-300 block uppercase tracking-wider">Required Documentation:</span>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {cat.documentation.map((doc, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Verification Req:</span>
                    <span className="text-slate-200 font-medium">{cat.verificationReq}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Valuation Standard:</span>
                    <span className="text-slate-200 font-medium">{cat.valuationReq}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/assets/${cat.slug}`}
                  className="w-full py-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center justify-center gap-1"
                >
                  <span>View Category Guidelines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compliance Warning Box */}
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs text-amber-200">
        <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>IMPORTANT ELIGIBILITY NOTICE</span>
        </div>
        <p className="leading-relaxed">
          Eligible assets are subject to legal verification, valuation, risk assessment, and applicable legal requirements. Sree Vriddhi does not accept encumbered properties, unverified gold, or third-party capital transfers.
        </p>
      </div>

    </div>
  );
};

export default Assets;
