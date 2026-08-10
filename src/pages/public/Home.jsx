import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import useTranslator from '../../hooks/useTranslator';
import LiveMarketTable from '../../components/LiveMarketTable';
import { ShieldCheck, ArrowRight, CheckCircle2, Coins, Banknote, Building2, FileSpreadsheet, Lock, Award, Scale, HelpCircle, MessageSquare, Phone } from 'lucide-react';

const Home = () => {
  const { brandSettings, products, assetCategories } = useSreeVriddhi();

  // Teaser Calculator state
  const [calcAssetType, setCalcAssetType] = useState('Gold');
  const [calcValue, setCalcValue] = useState(250000); // 2.5 Lakhs (default)
  const { translate } = useTranslator();
  const [tCheckEligibility, setTCheckEligibility] = useState('Check Eligibility');
  const [tTalk, setTTalk] = useState('Talk to Sree Vriddhi');
  const [tParticipants, setTParticipants] = useState(`We accept only ${brandSettings?.participantLimit ?? 10} participants / month`);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const a = await translate('Check Eligibility');
        const b = await translate('Talk to Sree Vriddhi');
        const c = await translate(`We accept only ${brandSettings?.participantLimit ?? 10} participants / month`);
        if (!mounted) return;
        setTCheckEligibility(a || 'Check Eligibility');
        setTTalk(b || 'Talk to Sree Vriddhi');
        setTParticipants(c || `We accept only ${brandSettings?.participantLimit ?? 10} participants / month`);
      } catch (e) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, [translate, brandSettings?.participantLimit]);

  const assetIcons = {
    'Banknote': Banknote,
    'Coins': Coins,
    'Building2': Building2,
    'FileSpreadsheet': FileSpreadsheet
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Decorative Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Compliance Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Structured Value-Management & Governance</span>
              </div>

              {/* Brand Title */}
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif-brand text-white leading-tight">
                SREE <span className="gold-gradient-text">VRIDDHI</span>
              </h1>

              {/* Main Philosophy Quote */}
              <p className="text-2xl sm:text-3xl font-serif italic text-amber-200/90 font-medium">
                "{brandSettings.philosophy}"
              </p>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                Structured value-management solutions designed around eligible assets, transparent processes and responsible growth. Preserve asset integrity while participating in structured periodic returns.
              </p>

              {/* Alternative Quotes Badges */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium">
                  "Where Value Finds Growth."
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium">
                  "Preserve Value. Create Growth."
                </span>
                <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-serif">
                  "విలువకు వృద్ధి — వృద్ధికి విశ్వాసం"
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/eligibility"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 hover:from-amber-300 hover:to-amber-600 text-slate-950 text-sm font-extrabold tracking-wider uppercase shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <span>{tCheckEligibility}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="hidden sm:inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                  {tParticipants}
                </div>

                <Link
                  to="/how-it-works"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-slate-800 text-sm font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                >
                  <span>How It Works</span>
                </Link>

                <a
                  href={brandSettings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{tTalk}</span>
                </a>
              </div>

              {/* Regulatory Notice */}
              <p className="text-[11px] text-slate-400 pt-2 italic">
                * Eligible assets are subject to legal verification, valuation, risk assessment and applicable legal requirements.
              </p>
            </div>

            {/* Right Hero Logo Mark Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 sm:w-80 h-72 sm:h-80 rounded-full glass-card-gold p-8 flex flex-col items-center justify-center animate-float gold-border-glow">
                <img src="/brand/hero-visual.svg" alt="Sree Vriddhi Brand Mark" className="w-48 h-48 object-cover rounded-full drop-shadow-[0_10px_25px_rgba(212,175,55,0.4)]" />
                <div className="absolute -bottom-4 bg-slate-950/90 border border-amber-500/40 px-4 py-2 rounded-full shadow-2xl text-center">
                  <span className="text-xs font-serif text-amber-300 font-bold block">SREE VRIDDHI</span>
                  <span className="text-[10px] text-slate-400 tracking-wider">RESPONSIBILITY & GROWTH</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE PHILOSOPHY & VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <LiveMarketTable />
        </div>
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-amber-400">Our Foundation</h2>
          <h3 className="text-3xl sm:text-4xl font-bold font-serif-brand text-white">Built on Trust, Protection & Integrity</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Sree Vriddhi was established to bridge the gap between asset ownership and structured contractual returns. We treat your asset value with paramount responsibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 space-y-4 hover:border-amber-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white font-serif-brand">1. Value Preservation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your underlying valuable assets undergo certified valuation and custody protocols ensuring zero unauthorized exposure or unbacked risk.
            </p>
          </div>

          <div className="glass-card p-8 space-y-4 hover:border-amber-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Scale className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white font-serif-brand">2. Legal Governance</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every customer relationship is anchored in robust legal contracts reviewed by legal experts under applicable legal and regulatory frameworks.
            </p>
          </div>

          <div className="glass-card p-8 space-y-4 hover:border-amber-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white font-serif-brand">3. Predictable Payouts</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clear contractual timelines and scheduled settlements designed to provide steady periodic economic productivity over agreed contract tenures.
            </p>
          </div>
        </div>
      </section>

      {/* 3. VISUAL 7-STEP WORKFLOW SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 space-y-10 border-amber-500/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800 pb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">Transparent Process</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-brand text-white">The Sree Vriddhi 7-Step Journey</h3>
            </div>
            <Link to="/how-it-works" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
              <span>View Full Workflow Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {[
              { step: '01', name: 'Tell Us', desc: 'Enquiry & Value Details' },
              { step: '02', name: 'Verification', desc: 'Ownership & Identity' },
              { step: '03', name: 'KYC & Check', desc: 'Eligibility Matching' },
              { step: '04', name: 'Valuation', desc: 'Certified Inspection' },
              { step: '05', name: 'Risk Assessment', desc: 'Product Structuring' },
              { step: '06', name: 'Agreement', desc: 'Legal Contract Execution' },
              { step: '07', name: 'Settlements', desc: 'Periodic Returns & Exit' }
            ].map((s, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-2 hover:border-amber-500/40 transition-all">
                <span className="text-xs font-extrabold text-amber-400 tracking-widest">{s.step}</span>
                <h4 className="text-sm font-bold text-white leading-tight">{s.name}</h4>
                <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ELIGIBLE ASSET CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">Value Evaluation</span>
            <h3 className="text-3xl font-bold font-serif-brand text-white">Value Comes in Many Forms</h3>
            <p className="text-xs text-slate-400 mt-1">Eligible assets are evaluated individually under applicable legal eligibility standards.</p>
          </div>
          <Link to="/assets" className="px-5 py-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all">
            Explore All Asset Categories
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {assetCategories.map((cat) => {
            const Icon = assetIcons[cat.icon] || Coins;
            return (
              <div key={cat.id} className="glass-card p-6 space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                      cat.status === 'Approved' ? 'badge-approved' :
                      cat.status === 'Conditional' ? 'badge-review' : 'badge-suspended'
                    }`}>
                      {cat.status}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white font-serif-brand">{cat.type}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{cat.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  <span className="text-[11px] text-amber-300/90 font-semibold block">Key Documentation:</span>
                  <ul className="space-y-1">
                    {cat.documentation.slice(0, 2).map((doc, idx) => (
                      <li key={idx} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. DYNAMIC PRODUCTS CATALOGUE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">Dynamic Structuring</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-brand text-white">Sree Vriddhi Product Frameworks</h3>
            </div>
            <Link to="/products" className="text-xs font-bold text-amber-400 hover:underline">
              View All Products & Terms →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div key={prod.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full badge-active">
                    {prod.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{prod.tenure}</span>
                </div>

                <h4 className="text-lg font-bold text-white font-serif-brand">{prod.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{prod.description}</p>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/10 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Indicative Commercial Assumption:</span>
                  <p className="text-sm font-bold text-amber-300">
                    {prod.proposedMonthlyReturn}% Monthly / {prod.proposedFortnightlyReturn}% Fortnightly
                  </p>
                  <span className="text-[9px] text-slate-400 block">Notice Period: {prod.noticePeriodDays} Days</span>
                </div>

                <p className="text-[10px] text-slate-400 italic leading-snug">
                  * Illustrative parameters subject to valuation and legal agreement.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE ELIGIBILITY CHECKER TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card-gold p-8 sm:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Instant Assessment</span>
            <h3 className="text-3xl font-bold font-serif-brand text-white">Check Your Asset Eligibility Today</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Complete our 10-question evaluation wizard to receive a preliminary eligibility assessment (Green / Yellow / Red) and connect directly with our valuation officers.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/eligibility"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
              >
                Launch Eligibility Checker
              </Link>
              <a
                href={brandSettings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600/90 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-500 transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Assessor</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950/90 border border-amber-500/30 p-6 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-amber-300 font-serif-brand">Quick Indicative Assessment</h4>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Asset Category</label>
                <select 
                  value={calcAssetType}
                  onChange={(e) => setCalcAssetType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200"
                >
                  <option value="Gold">Physical Gold / Jewellery</option>
                  <option value="Capital">Capital / Money Deposit</option>
                  <option value="Land">Commercial Real Estate / Land</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Approximate Asset Value: <span className="text-amber-400 font-bold">₹{(calcValue / 100000).toFixed(1)} Lakhs</span>
                </label>
                <input 
                  type="range" 
                  min="25000" 
                  max="5000000" 
                  step="1000"
                  value={calcValue}
                  onChange={(e) => setCalcValue(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
                <span className="font-bold block">Preliminary Potential Match:</span>
                Potentially Eligible for Sree Vriddhi Value Framework. Final valuation and legal search required.
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
