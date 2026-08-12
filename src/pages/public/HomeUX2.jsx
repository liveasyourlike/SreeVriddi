import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { ArrowRight, ChevronDown, Coins, Building2, Car, Fuel, Store, Users, Zap, ShieldCheck, MessageSquare, ClipboardCheck } from 'lucide-react';

const sectors = [
  ['Daily Finance', Coins, 'Structured short-cycle finance opportunities.'],
  ['Physical Gold', Coins, 'Physical-asset focused allocation.'],
  ['Fixed Deposits', ShieldCheck, 'Fixed-income oriented opportunities.'],
  ['Housing Rentals', Building2, 'Rental-property oriented opportunities.'],
  ['Vehicle Rentals', Car, 'Vehicle rental and utilization opportunities.'],
  ['Oil & Gas Purchase', Fuel, 'Energy-sector purchase opportunities.'],
  ['Retail Businesses', Store, 'Street food, saree, fruits/juice and kirana businesses.'],
  ['EV & Auto Workshops', Zap, 'EV and automobile service businesses.'],
  ['Staff Recruitment', Users, 'Recruitment and staffing businesses.'],
  ['Virtual Stocks', Coins, 'Shown as a planned category; live market functionality remains Coming Soon.']
];

const journey = [
  ['01', 'Explore', 'Understand opportunities and the business model.'],
  ['02', 'Evaluate', 'Complete the preliminary evaluation.'],
  ['03', 'Review', 'Information is reviewed for the next discussion.'],
  ['04', 'Discuss', 'Connect with a Sree Vriddhi representative.'],
  ['05', 'Proceed', 'Continue only after applicable checks and agreements.']
];

const faqs = [
  ['What is Sree Vriddhi?', 'Sree Vriddhi presents selected real-world opportunity categories and a structured preliminary evaluation journey.'],
  ['How do I start?', 'Explore the opportunities or use the 10-point Preliminary Evaluation Form.'],
  ['Is live market data available?', 'The live market section is temporarily marked Coming Soon until verified data sources are ready.'],
  ['Can I speak to a person?', 'Yes. Use the contact or WhatsApp option to request human assistance.']
];

export default function HomeUX2() {
  const { brandSettings, assetCategories = [], products = [] } = useSreeVriddhi();
  const [activeSector, setActiveSector] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="pb-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-[11px] font-bold text-amber-300">
              <ShieldCheck className="w-4 h-4" /> REAL-WORLD OPPORTUNITIES · STRUCTURED JOURNEY
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold font-serif-brand text-white leading-tight">
              Explore value. <span className="gold-gradient-text">Understand first.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
              {brandSettings?.philosophy || 'Where Value Finds Growth.'} Sree Vriddhi brings selected real-world sectors into one clear journey—explore, evaluate, review and discuss.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/eligibility" className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-amber-400 transition">
                <ClipboardCheck className="w-4 h-4" /> Check Eligibility <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={brandSettings?.whatsappUrl || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-bold text-emerald-300 hover:bg-emerald-500/20 transition">
                <MessageSquare className="w-4 h-4" /> Talk to Sree Vriddhi
              </a>
            </div>
          </div>
          <div className="glass-card-gold rounded-3xl p-5">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">Your journey</div>
            <div className="mt-4 grid grid-cols-5 gap-2 text-center">
              {journey.map(([n, title]) => <a key={n} href={title === 'Evaluate' ? '/eligibility' : '#journey'} className="rounded-xl bg-slate-950/60 border border-slate-800 p-2 hover:border-amber-500/40 transition"><span className="text-[10px] text-amber-400 font-bold">{n}</span><span className="block mt-1 text-[10px] sm:text-xs text-white font-bold">{title}</span></a>)}
            </div>
          </div>
        </div>
      </section>

      <section id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-24">
        <div className="flex items-end justify-between gap-4 mb-4"><div><span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">Explore</span><h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-brand">Real-world opportunity categories</h2></div><Link to="/assets" className="text-xs font-bold text-amber-300">All assets →</Link></div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {sectors.map(([name, Icon, desc]) => <button type="button" key={name} onClick={() => setActiveSector(activeSector === name ? null : name)} className={`text-left rounded-2xl border p-4 transition ${activeSector === name ? 'border-amber-400/60 bg-amber-500/10' : 'border-slate-800 bg-slate-900/50 hover:border-amber-500/30'}`}><Icon className="w-5 h-5 text-amber-400" /><span className="block mt-3 text-sm font-bold text-white">{name}</span><span className="block mt-1 text-[11px] text-slate-400">{activeSector === name ? desc : 'View details →'}</span></button>)}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-slate-400">{assetCategories.slice(0, 6).map(a => <Link key={a.id} to={`/assets/${a.type}`} className="rounded-full border border-slate-800 px-3 py-1.5 hover:border-amber-500/30">{a.type}</Link>)}</div>
      </section>

      <section id="journey" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-24">
        <div className="rounded-3xl border border-amber-500/20 bg-slate-950/40 p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4 mb-5"><div><span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">How it works</span><h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-brand">One clear journey</h2></div><Link to="/how-it-works" className="text-xs font-bold text-amber-300">Full details →</Link></div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">{journey.map(([n,title,desc]) => <div key={n} className="rounded-xl bg-slate-900/70 border border-slate-800 p-4"><span className="text-[10px] font-bold text-amber-400">{n}</span><h3 className="mt-1 text-sm font-bold text-white">{title}</h3><p className="mt-1 text-[11px] text-slate-400 leading-relaxed">{desc}</p></div>)}</div>
        </div>
      </section>

      <section id="why" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-24">
        <div className="grid md:grid-cols-3 gap-3">
          {[['Clarity','Information is organized around simple user journeys.'],['Human support','AI and self-service should hand off to a person when needed.'],['Responsible process','Eligibility, valuation, review and applicable agreements remain part of the journey.']].map(([t,d]) => <div key={t} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"><h3 className="text-base font-bold text-white">{t}</h3><p className="mt-2 text-xs text-slate-400 leading-relaxed">{d}</p></div>)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">Market insights</span><h2 className="text-xl sm:text-2xl font-bold text-white">Verified market data — Coming Soon</h2><p className="mt-1 text-xs text-slate-400">Live Gold, USD/INR, NIFTY 50, petrol and diesel values will appear here only after verified data integration.</p></div><span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold text-amber-300">COMING SOON</span></div>
        </div>
      </section>

      {products?.length > 0 && <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div className="flex items-end justify-between mb-4"><div><span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">Opportunities</span><h2 className="text-2xl font-bold text-white">Explore available categories</h2></div><Link to="/products" className="text-xs font-bold text-amber-300">View all →</Link></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">{products.slice(0,4).map(p => <Link key={p.id || p.slug} to={`/products/${p.slug || p.id}`} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 hover:border-amber-500/30"><h3 className="text-sm font-bold text-white">{p.name || p.title}</h3><p className="mt-1 text-[11px] text-slate-400 line-clamp-2">{p.description}</p></Link>)}</div></section>}

      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-24"><div className="text-center mb-5"><span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">Quick answers</span><h2 className="text-2xl font-bold text-white font-serif-brand">Frequently asked questions</h2></div><div className="space-y-2">{faqs.map(([q,a],i) => <div key={q} className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden"><button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-4 text-left text-sm font-bold text-white"><span>{q}</span><ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} /></button>{openFaq === i && <div className="px-4 pb-4 text-xs leading-relaxed text-slate-400">{a}</div>}</div>)}</div></section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"><div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border border-amber-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5"><div><h2 className="text-2xl font-bold text-white font-serif-brand">Ready to explore?</h2><p className="mt-1 text-xs text-slate-400">Start with the preliminary evaluation or speak with a person.</p></div><div className="flex flex-wrap justify-center gap-3"><Link to="/eligibility" className="rounded-xl bg-amber-500 px-5 py-3 text-xs font-extrabold text-slate-950">Check Eligibility</Link><Link to="/contact" className="rounded-xl border border-slate-700 px-5 py-3 text-xs font-bold text-white">Contact</Link></div></div></section>
    </div>
  );
}
