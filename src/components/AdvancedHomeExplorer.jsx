import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, CheckCircle2, FileCheck2, Landmark, ShieldCheck, Sparkles, Coins, X } from 'lucide-react';

const topics = [
  { title: 'Instant Assessment', icon: CheckCircle2, to: '/eligibility', label: 'Open assessment' },
  { title: 'Sree Vriddhi Product Frameworks', icon: Landmark, to: '/products', label: 'Explore products' },
  { title: 'Value Comes in Many Forms', icon: Coins, to: '/assets', label: 'Explore value categories' },
  { title: 'Transparent Process', icon: FileCheck2, to: '/how-it-works', label: 'Explore the process' },
  { title: 'Our Foundation', icon: ShieldCheck, to: '/about', label: 'Explore our foundation' },
  { title: 'India Market Snapshot', icon: BarChart3, to: '/market-snapshot', label: 'View market snapshot' },
  { title: 'Structured Value-Management & Governance', icon: Sparkles, to: '/protection', label: 'Explore governance' },
  { title: 'How It Works', icon: ArrowRight, to: '/how-it-works', label: 'View full journey' },
];

export default function AdvancedHomeExplorer() {
  const [active, setActive] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10" aria-labelledby="advanced-explorer-title">
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-slate-950/70 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-amber-400">Advanced Exploration</span>
            <h2 id="advanced-explorer-title" className="mt-2 text-2xl sm:text-3xl font-bold font-serif-brand text-white">Explore every Sree Vriddhi topic</h2>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-400">The complete content remains available in its original section. Choose a topic below to open the relevant page directly instead of scrolling through the entire homepage.</p>
          </div>
          <span className="shrink-0 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1.5 text-[10px] font-semibold text-amber-300">8 topics • compact navigation</span>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            const isActive = active === index;
            return (
              <div key={topic.title} className="[perspective:1000px] min-h-[150px] sm:min-h-[165px]">
                <div className={`relative h-full min-h-[150px] sm:min-h-[165px] transition-transform duration-500 [transform-style:preserve-3d] ${isActive ? '[transform:rotateY(180deg)]' : ''}`} onClick={() => setActive(isActive ? null : index)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setActive(isActive ? null : index); } }} role="button" tabIndex={0} aria-pressed={isActive} aria-label={`${topic.title}. ${isActive ? 'Close details' : 'Flip to explore'}`}>
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl border border-slate-800 bg-slate-900/85 p-4 sm:p-5 transition-all hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5">
                    <div className="flex items-start justify-between gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/10 text-amber-300"><Icon className="h-4 w-4" /></div><span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{String(index + 1).padStart(2, '0')}</span></div>
                    <h3 className="mt-5 text-sm sm:text-base font-bold leading-snug text-white">{topic.title}</h3>
                    <p className="mt-2 text-[10px] text-amber-300/80">Tap / click to explore →</p>
                  </div>
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-amber-500/30 bg-slate-950 p-4 sm:p-5 shadow-xl shadow-black/20">
                    <div className="flex items-center justify-between"><span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-400">Explore</span><button type="button" className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white" onClick={(event) => { event.stopPropagation(); setActive(null); }} aria-label="Close topic"><X className="h-4 w-4" /></button></div>
                    <h3 className="mt-3 text-sm sm:text-base font-bold leading-snug text-white">{topic.title}</h3>
                    <p className="mt-2 text-[10px] leading-relaxed text-slate-400">Open the existing detailed content directly.</p>
                    <Link to={topic.to} onClick={(event) => event.stopPropagation()} className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-amber-300 hover:bg-amber-500/20">{topic.label}<ArrowRight className="h-3.5 w-3.5" /></Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
