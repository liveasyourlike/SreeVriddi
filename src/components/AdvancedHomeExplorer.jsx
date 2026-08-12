import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Building2, CarFront, CheckCircle2, Coins, Droplets, Factory, FileCheck2, Landmark, ShieldCheck, Sparkles, Store, UsersRound, X, Zap } from 'lucide-react';

const allocationTopics = [
  { title: 'Daily Finance', icon: Coins },
  { title: 'Physical Gold', icon: Coins },
  { title: 'Fixed Deposits', icon: Landmark },
  { title: 'Housing Rentals', icon: Building2 },
  { title: 'Vehicle Rentals', icon: CarFront },
  { title: 'Oil & Gas Purchase', icon: Droplets },
  { title: 'Retail Businesses', icon: Store },
  { title: 'EV and automobiles workshops', icon: Zap },
  { title: 'Staff Recruitment Agency', icon: UsersRound },
  { title: 'Virtual Stocks', icon: BarChart3 },
];

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

function PriorityInvestmentAllocation() {
  const [active, setActive] = useState(0);
  const selected = allocationTopics[active];
  const SelectedIcon = selected.icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10" aria-labelledby="priority-allocation-title">
      <div className="relative overflow-hidden rounded-[2rem] border border-amber-500/25 bg-slate-950 p-5 sm:p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(245,158,11,0.13),transparent_34%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/10 animate-[spin_24s_linear_infinite]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/5 animate-[spin_36s_linear_infinite_reverse]" />

        <div className="relative z-10 mb-7 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-amber-300">
            Priority 01
          </span>
          <h2 id="priority-allocation-title" className="mt-3 text-2xl sm:text-4xl font-bold font-serif-brand text-white">Investment Allocation</h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-400">
            Explore the real sectors listed in the Sree Vriddhi allocation framework. Select any node to bring it into focus.
          </p>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-5xl items-center justify-center">
          <div className="absolute h-56 w-56 sm:h-72 sm:w-72 rounded-full border border-amber-400/20 animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute h-40 w-40 sm:h-52 sm:w-52 rounded-full border border-amber-400/15" />

          <div className="relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full border border-amber-400/50 bg-slate-900/95 shadow-[0_0_70px_rgba(245,158,11,0.18)] transition-transform duration-700">
            <div className="absolute inset-2 rounded-full border border-dashed border-amber-300/25 animate-[spin_18s_linear_infinite]" />
            <div className="relative text-center">
              <SelectedIcon className="mx-auto h-8 w-8 text-amber-300 transition-all duration-500" />
              <div className="mt-2 max-w-[105px] text-[11px] font-extrabold leading-tight text-white">{selected.title}</div>
              <div className="mt-1 text-[9px] uppercase tracking-widest text-amber-400">Selected</div>
            </div>
          </div>

          {allocationTopics.map((item, index) => {
            const Icon = item.icon;
            const angle = (index / allocationTopics.length) * Math.PI * 2 - Math.PI / 2;
            const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 145 : 205;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = active === index;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Select ${item.title}`}
                className={`absolute left-1/2 top-1/2 flex h-16 w-16 sm:h-[76px] sm:w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border transition-all duration-500 ease-out ${isActive ? 'z-20 scale-110 border-amber-300 bg-amber-500/20 shadow-[0_0_28px_rgba(245,158,11,0.28)]' : 'border-slate-700 bg-slate-900/90 hover:scale-110 hover:border-amber-500/50'}`}
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              >
                <span className="flex flex-col items-center gap-1.5">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-amber-300' : 'text-slate-300'}`} />
                  <span className="max-w-[62px] text-[8px] font-bold leading-tight text-center text-slate-300">{item.title}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-amber-500/15 bg-slate-900/80 p-4 text-center backdrop-blur-sm">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-amber-400">Selected allocation sector</div>
          <div className="mt-1 text-sm font-bold text-white">{selected.title}</div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {allocationTopics.map((item, index) => (
              <button key={item.title} type="button" onClick={() => setActive(index)} className={`rounded-full px-2.5 py-1 text-[9px] transition-all ${active === index ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AdvancedHomeExplorer() {
  const [active, setActive] = useState(null);

  return (
    <>
      <PriorityInvestmentAllocation />
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
    </>
  );
}
