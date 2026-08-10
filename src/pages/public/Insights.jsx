import React from 'react';
import { Link } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Newspaper, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

const Insights = () => {
  const { insights } = useSreeVriddhi();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Knowledge Hub</span>
        <h1 className="text-4xl font-extrabold font-serif-brand text-white">Sree Vriddhi Insights & Awareness</h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Educational articles, asset protection guidelines, and regulatory updates curated by our legal and valuation panel.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {insights.filter(i => i.published).map((article) => (
          <div key={article.id} className="glass-card overflow-hidden group hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div className="relative h-60 overflow-hidden bg-slate-950">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md shadow-md">
                {article.category}
              </span>
            </div>

            <div className="p-8 space-y-4">
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{article.date}</span>
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>{article.author}</span>
                </span>
              </div>

              <h2 className="text-xl font-bold text-white font-serif-brand group-hover:text-amber-300 transition-colors">
                {article.title}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-[11px] text-amber-200/80 font-semibold">{article.readTime}</span>
                <Link
                  to={`/insights/${article.slug}`}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Insights;
