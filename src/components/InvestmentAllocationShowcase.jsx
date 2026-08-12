import React, { useEffect, useState } from 'react';
import {
  Banknote,
  Coins,
  Landmark,
  Building2,
  CarFront,
  Fuel,
  Store,
  Utensils,
  Shirt,
  Apple,
  ShoppingBasket,
  Wrench,
  Users,
  LineChart,
  ArrowRight,
  CircleCheck,
} from 'lucide-react';

const allocations = [
  { no: '01', title: 'Daily Finance', te: 'రోజువారీ ఫైనాన్స్', icon: Banknote, status: 'Allocation Sector', statusTe: 'పెట్టుబడి కేటాయింపు రంగం', note: 'Short-cycle finance activity' },
  { no: '02', title: 'Physical Gold', te: 'భౌతిక బంగారం', icon: Coins, status: 'Allocation Sector', statusTe: 'పెట్టుబడి కేటాయింపు రంగం', note: 'Physical precious-metal activity' },
  { no: '03', title: 'Fixed Deposits', te: 'ఫిక్స్‌డ్ డిపాజిట్లు', icon: Landmark, status: 'Allocation Sector', statusTe: 'పెట్టుబడి కేటాయింపు రంగం', note: 'Deposit-based allocation' },
  { no: '04', title: 'Housing Rentals', te: 'హౌసింగ్ అద్దెలు', icon: Building2, status: 'Allocation Sector', statusTe: 'పెట్టుబడి కేటాయింపు రంగం', note: 'Residential rental activity' },
  { no: '05', title: 'Vehicle Rentals', te: 'వాహన అద్దెలు', icon: CarFront, status: 'Allocation Sector', statusTe: 'పెట్టుబడి కేటాయింపు రంగం', note: 'Vehicle rental activity' },
  { no: '06', title: 'Oil & Gas Purchase', te: 'ఆయిల్ & గ్యాస్ కొనుగోలు', icon: Fuel, status: 'Allocation Sector', statusTe: 'పెట్టుబడి కేటాయింపు రంగం', note: 'Oil and gas-related allocation' },
  { no: '07A', title: 'Street Foods', te: 'స్ట్రీట్ ఫుడ్స్', icon: Utensils, status: 'Retail Business', statusTe: 'రిటైల్ వ్యాపారం', note: 'Food retail activity' },
  { no: '07B', title: 'Saree Stalls', te: 'చీరల స్టాల్స్', icon: Shirt, status: 'Retail Business', statusTe: 'రిటైల్ వ్యాపారం', note: 'Apparel retail activity' },
  { no: '07C', title: 'Fruits & Juice Centers', te: 'పండ్లు & జ్యూస్ సెంటర్లు', icon: Apple, status: 'Retail Business', statusTe: 'రిటైల్ వ్యాపారం', note: 'Fresh-food retail activity' },
  { no: '07D', title: 'Kirana Stores', te: 'కిరాణా దుకాణాలు', icon: ShoppingBasket, status: 'Retail Business', statusTe: 'రిటైల్ వ్యాపారం', note: 'Everyday retail activity' },
  { no: '08', title: 'EV & Automobile Workshops', te: 'EV & ఆటోమొబైల్ వర్క్‌షాప్స్', icon: Wrench, status: 'Allocation Sector', statusTe: 'పెట్టుబడి కేటాయింపు రంగం', note: 'Automobile service activity' },
  { no: '09', title: 'Staff Recruitment Agency', te: 'స్టాఫ్ రిక్రూట్‌మెంట్ ఏజెన్సీ', icon: Users, status: 'Service Sector', statusTe: 'సేవా రంగం', note: 'Recruitment service activity' },
  { no: '10', title: 'Virtual Stocks', te: 'వర్చువల్ స్టాక్స్', icon: LineChart, status: 'Allocation Sector', statusTe: 'పెట్టుబడి కేటాయింపు రంగం', note: 'Virtual market-linked concept' },
];

export default function InvestmentAllocationShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % allocations.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  const current = allocations[active];
  const Icon = current.icon;

  return (
    <section className="relative overflow-hidden py-20 sm:py-24" aria-labelledby="investment-allocation-title">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,.12),transparent_45%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-amber-400">Step 1 · Allocation Vision</span>
          <h2 id="investment-allocation-title" className="mt-3 text-3xl font-bold font-serif-brand text-white sm:text-5xl">
            Where Capital Is Intended to Be Allocated
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
            Sree Vriddhi presents the real sectors described in the business model. This section shows the allocation categories only — no investment amount, return, valuation or live market value is displayed.
          </p>
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-2 text-[11px] text-amber-200">
            <CircleCheck className="h-3.5 w-3.5" />
            <span>English + తెలుగు status shown together</span>
          </div>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[.8fr_1.4fr_.8fr]">
          <div className="hidden space-y-3 lg:block">
            {allocations.slice(Math.max(0, active - 2), Math.max(0, active - 2) + 4).map((item) => {
              const ItemIcon = item.icon;
              return (
                <button key={item.no} onClick={() => setActive(allocations.indexOf(item))} className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-left transition hover:-translate-x-1 hover:border-amber-500/40">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-300"><ItemIcon className="h-5 w-5" /></div>
                    <div className="min-w-0"><div className="truncate text-xs font-bold text-white">{item.title}</div><div className="truncate text-[10px] text-slate-500">{item.te}</div></div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mx-auto w-full max-w-md [perspective:1200px]">
            <div className="relative min-h-[390px] [transform-style:preserve-3d]">
              <div key={current.no} className="absolute inset-0 animate-[allocationCard_0.65s_ease-out]">
                <div className="glass-card-gold flex h-full flex-col justify-between overflow-hidden rounded-[2rem] p-7 sm:p-9 shadow-2xl [transform:rotateX(1deg)_rotateY(-3deg)]">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-extrabold tracking-widest text-amber-300">{current.no}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Sector {active + 1} / {allocations.length}</span>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto grid h-28 w-28 place-items-center rounded-[2rem] border border-amber-400/30 bg-amber-400/10 text-amber-300 shadow-[0_0_45px_rgba(212,175,55,.16)]">
                      <Icon className="h-14 w-14" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-7 text-2xl font-bold font-serif-brand text-white sm:text-3xl">{current.title}</h3>
                    <p className="mt-2 text-lg font-medium text-amber-200">{current.te}</p>
                    <div className="mx-auto mt-5 max-w-xs rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                      <div className="text-[10px] uppercase tracking-widest text-slate-500">Status · స్థితి</div>
                      <div className="mt-1 text-xs font-bold text-amber-300">{current.status} · {current.statusTe}</div>
                      <div className="mt-1 text-[10px] text-slate-500">{current.note}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-[10px] text-slate-500">
                    <span>No values displayed</span>
                    <span className="flex items-center gap-1 text-amber-300">Next sector <ArrowRight className="h-3 w-3" /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
            {allocations.map((item, index) => {
              const ItemIcon = item.icon;
              const selected = index === active;
              return (
                <button key={item.no} onClick={() => setActive(index)} className={`group rounded-2xl border p-3 text-left transition-all ${selected ? 'border-amber-400/60 bg-amber-500/10 shadow-lg shadow-amber-500/5' : 'border-slate-800 bg-slate-950/50 hover:border-amber-500/30'}`} aria-label={`Show ${item.title}`}>
                  <div className="flex items-center gap-2">
                    <ItemIcon className={`h-4 w-4 shrink-0 ${selected ? 'text-amber-300' : 'text-slate-500 group-hover:text-amber-300'}`} />
                    <span className="truncate text-[10px] font-semibold text-slate-300">{item.title}</span>
                  </div>
                  <div className="mt-1 truncate text-[9px] text-slate-600">{item.te}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center text-[11px] leading-5 text-slate-500">
          <strong className="text-slate-400">Planning status:</strong> these are allocation sectors described in the business model; actual deployment, availability and terms are subject to internal validation, documentation and applicable legal requirements.
        </div>
      </div>
      <style>{`@keyframes allocationCard{from{opacity:0;transform:rotateY(18deg) translateX(16px) scale(.98)}to{opacity:1;transform:rotateY(0) translateX(0) scale(1)}}`}</style>
    </section>
  );
}
