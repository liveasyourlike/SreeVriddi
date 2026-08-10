import React from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Newspaper, Plus, Edit3, Trash2 } from 'lucide-react';

const InsightsCMS = () => {
  const { insights } = useSreeVriddhi();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-slate-900 border border-amber-500/20 p-6 rounded-2xl">
        <div>
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Content Management System</span>
          <h1 className="text-2xl font-bold font-serif-brand text-white">Insights & Blog CMS</h1>
          <p className="text-xs text-slate-400 mt-1">Publish asset awareness articles, financial guides, and regulatory updates.</p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map(art => (
          <div key={art.id} className="glass-card p-6 border-amber-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
            <div className="space-y-1">
              <span className="badge-approved px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold">{art.category}</span>
              <h3 className="text-base font-bold text-white font-serif-brand">{art.title}</h3>
              <p className="text-slate-400 max-w-xl">{art.excerpt}</p>
              <span className="text-[10px] text-slate-500 block">By: {art.author} | Published: {art.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsCMS;
