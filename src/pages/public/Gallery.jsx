import React, { useState } from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Sparkles } from 'lucide-react';
import galleryFacilities from '../../assets/gallery-facilities.svg';
import galleryEvents from '../../assets/gallery-events.svg';
import galleryEducation from '../../assets/gallery-education.svg';

const BUNDLED_GALLERY_ASSETS = {
  '/brand/gallery-facilities.svg': galleryFacilities,
  '/brand/gallery-events.svg': galleryEvents,
  '/brand/gallery-education.svg': galleryEducation,
};

const Gallery = () => {
  const { galleryItems } = useSreeVriddhi();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Facilities', 'Events', 'Customer Education', 'Certificates'];

  const publishedItems = galleryItems.filter(g => g.published);
  const filteredItems = selectedCategory === 'All'
    ? publishedItems
    : publishedItems.filter(g => g.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Media & Visual Showcase</span>
        <h1 className="text-4xl font-extrabold font-serif-brand text-white">Sree Vriddhi Corporate Gallery</h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Explore our administrative facilities, certified vaulting infrastructure, customer education workshops, and corporate events.
        </p>
      </div>

      <div className="glass-card-gold p-8 sm:p-10 text-center space-y-4 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Official Gallery Launching Soon</span>
        </div>
        <h2 className="text-2xl font-bold text-white font-serif-brand">Full High-Resolution Visual Experience Under Construction</h2>
        <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
          We are currently archiving official photographs, certified vault inspections, and customer symposium recordings. Authorized media will be published dynamically below by our admin team.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredItems.map((item) => {
          const bundledSource = BUNDLED_GALLERY_ASSETS[item.imageUrl];
          const imageSource = bundledSource || item.imageUrl;
          return (
            <div key={item.id} className="glass-card overflow-hidden group hover:border-amber-500/50 transition-all flex flex-col justify-between">
              <div className="relative h-56 overflow-hidden bg-slate-950">
                <img
                  src={imageSource}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(event) => {
                    if (event.currentTarget.dataset.fallbackApplied) return;
                    event.currentTarget.dataset.fallbackApplied = 'true';
                    if (bundledSource && event.currentTarget.src !== bundledSource) event.currentTarget.src = bundledSource;
                  }}
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase text-amber-300 border border-amber-500/30">
                  {item.category}
                </div>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-white font-serif-brand group-hover:text-amber-300 transition-colors">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.caption}</p>
                <span className="text-[10px] text-slate-500 block pt-2">Published: {item.createdAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
