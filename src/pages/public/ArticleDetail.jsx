import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';

const ArticleDetail = () => {
  const { slug } = useParams();
  const { insights } = useSreeVriddhi();

  const article = insights.find(i => i.slug === slug) || insights[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <Link to="/insights" className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Insights</span>
      </Link>

      <article className="glass-card p-8 sm:p-12 space-y-6 border-amber-500/40">
        <div className="space-y-3 border-b border-slate-800 pb-6">
          <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {article.category}
          </span>
          <h1 className="text-3xl font-bold font-serif-brand text-white">{article.title}</h1>
          
          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{article.date}</span>
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>{article.author}</span>
            </span>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden h-64 bg-slate-950">
          <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover" />
        </div>

        <div className="text-sm text-slate-200 leading-relaxed space-y-4 font-sans whitespace-pre-line">
          {article.content}
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
