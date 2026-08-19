import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Building2, CheckCircle2, FileCheck2, Landmark, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';

const CURATED_GALLERY = [
  {
    id: 'business-gold-review',
    category: 'Asset Verification',
    eyebrow: '01 / GOLD',
    title: 'Gold Asset Review',
    caption: 'A professional review journey for physical gold: documentation, purity verification, valuation and custody readiness.',
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1400&q=85',
    action: 'Explore verification',
    icon: ShieldCheck,
    sourceLabel: 'Visual reference: Unsplash',
  },
  {
    id: 'business-advisory',
    category: 'Customer Advisory',
    eyebrow: '02 / ADVISORY',
    title: 'Structured Value Consultation',
    caption: 'The conversation before commitment: understand the arrangement, review documentation and make an informed decision.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85',
    action: 'See the journey',
    icon: Landmark,
    sourceLabel: 'Visual reference: Unsplash',
  },
  {
    id: 'business-property',
    category: 'Land & Property',
    eyebrow: '03 / PROPERTY',
    title: 'Property Due-Diligence View',
    caption: 'A visual representation of title review, field verification, valuation and document readiness for eligible property.',
    imageUrl: 'https://www.thelandbankers.com/assets/images/tlb-blog-challenges.png',
    action: 'Review requirements',
    icon: Building2,
    sourceLabel: 'Visual reference: The Land Bankers',
  },
  {
    id: 'business-financial-review',
    category: 'Capital & Finance',
    eyebrow: '04 / CAPITAL',
    title: 'Financial Decision Room',
    caption: 'Structured discussions bring together value, liquidity, documentation, risk and contractual expectations.',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=85',
    action: 'Understand the structure',
    icon: FileCheck2,
    sourceLabel: 'Visual reference: Unsplash',
  },
  {
    id: 'business-vault',
    category: 'Security & Custody',
    eyebrow: '05 / SECURITY',
    title: 'Secure Custody Architecture',
    caption: 'Security is represented as layers: controlled access, verification, custody procedures and accountable operations.',
    imageUrl: 'https://cdn.hackernoon.com/images/M7TpoUNBllN5t7b1qlqVLtM4bo52-kc022by.jpeg',
    action: 'Explore safeguards',
    icon: ShieldCheck,
    sourceLabel: 'Visual reference: Hackernoon',
  },
  {
    id: 'business-education',
    category: 'Customer Education',
    eyebrow: '06 / EDUCATION',
    title: 'Know Before You Proceed',
    caption: 'Clear explanations of eligibility, risk, documentation, agreements and customer responsibilities—before submission.',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85',
    action: 'Learn first',
    icon: CheckCircle2,
    sourceLabel: 'Visual reference: Unsplash',
  },
];

const Gallery = () => {
  const { galleryItems } = useSreeVriddhi();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeItem, setActiveItem] = useState(null);

  const categories = ['All', ...CURATED_GALLERY.map(item => item.category)];

  const items = useMemo(() => {
    const curated = selectedCategory === 'All'
      ? CURATED_GALLERY
      : CURATED_GALLERY.filter(item => item.category === selectedCategory);

    const adminItems = (galleryItems || [])
      .filter(item => item.published)
      .map(item => ({
        ...item,
        eyebrow: 'SREE VRIDDHI / MEDIA',
        action: 'Open media',
        icon: Sparkles,
        sourceLabel: 'Sree Vriddhi media archive',
      }))
      .filter(item => selectedCategory === 'All' || item.category === selectedCategory);

    return [...curated, ...adminItems];
  }, [galleryItems, selectedCategory]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-slate-950/80 p-7 md:p-12 shadow-2xl">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
            <Sparkles className="h-3.5 w-3.5" /> Sree Vriddhi / Business Visual Library
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-serif-brand font-semibold leading-[0.98] text-white">
            Evidence behind the <span className="text-amber-300">value journey.</span>
          </h1>
          <p className="mt-5 max-w-3xl text-sm md:text-base leading-7 text-slate-300">
            This is not a decorative gallery. Explore the operating ideas behind Sree Vriddhi—asset verification, customer understanding, due diligence, secure custody, structured decisions and responsible participation.
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
            {[
              ['01', 'Verify'],
              ['02', 'Understand'],
              ['03', 'Structure'],
              ['04', 'Proceed'],
            ].map(([number, label]) => (
              <div key={number} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-md">
                <div className="text-[10px] font-bold tracking-[0.18em] text-amber-300">{number}</div>
                <div className="mt-2 text-sm font-semibold text-white">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">Explore by business objective</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-serif-brand font-semibold text-white">Choose what you want to understand.</h2>
        </div>
        <div className="flex flex-wrap gap-2 md:max-w-2xl md:justify-end">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
                selectedCategory === category
                  ? 'border-amber-300/50 bg-amber-300/15 text-amber-200 shadow-[0_0_25px_rgba(251,191,36,0.10)]'
                  : 'border-white/10 bg-white/[0.025] text-slate-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, index) => {
          const Icon = item.icon || Sparkles;
          return (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950/70 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-amber-300/30 hover:shadow-amber-950/30"
            >
              <button onClick={() => setActiveItem(item)} className="block w-full text-left" aria-label={`Open ${item.title}`}>
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(event) => {
                      event.currentTarget.style.opacity = '0.15';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/65 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-amber-200 backdrop-blur-md">
                    {item.category}
                  </div>
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-slate-950/60 text-amber-300 backdrop-blur-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-300/90">{item.eyebrow}</div>
                    <h3 className="mt-1 text-xl font-serif-brand font-semibold text-white">{item.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs leading-6 text-slate-400">{item.caption}</p>
                  <div className="mt-5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-amber-300">{item.action}</span>
                    <ArrowUpRight className="h-4 w-4 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-300" />
                  </div>
                </div>
              </button>
            </article>
          );
        })}
      </section>

      <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">Media governance</div>
            <h2 className="mt-2 text-xl font-serif-brand font-semibold text-white">Official Sree Vriddhi media can be added without changing this experience.</h2>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-400">Admin-published photographs, videos and event records can continue to flow into the gallery. Curated visual references remain separate from official company media.</p>
          </div>
          <div className="shrink-0 rounded-2xl border border-amber-400/20 bg-amber-400/5 px-5 py-4 text-center">
            <div className="text-2xl font-semibold text-amber-300">Live</div>
            <div className="text-[9px] uppercase tracking-wider text-slate-500">Gallery framework</div>
          </div>
        </div>
      </section>

      {activeItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-xl" onClick={() => setActiveItem(null)}>
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-amber-300/20 bg-slate-950 shadow-2xl" onClick={event => event.stopPropagation()}>
            <button onClick={() => setActiveItem(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/75 text-white backdrop-blur-md hover:text-amber-300" aria-label="Close gallery preview">
              <X className="h-5 w-5" />
            </button>
            <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
              <div className="min-h-[320px] bg-slate-900">
                <img src={activeItem.imageUrl} alt={activeItem.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="p-7 md:p-9">
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-300">{activeItem.category}</div>
                <h2 className="mt-3 text-2xl md:text-3xl font-serif-brand font-semibold text-white">{activeItem.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">{activeItem.caption}</p>
                <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Visual source</div>
                  <div className="mt-1 text-xs text-slate-300">{activeItem.sourceLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
