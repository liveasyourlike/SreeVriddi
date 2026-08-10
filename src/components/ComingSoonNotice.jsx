import React from 'react';
import { ArrowLeft, Clock3, Home, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ComingSoonNotice({ title = 'Feature coming soon', message = 'This section is being enhanced. We are completing the final integrations and will make it available shortly.', compact = false }) {
  const navigate = useNavigate();
  return (
    <div className={`rounded-2xl border border-amber-500/25 bg-slate-950/70 text-center shadow-xl ${compact ? 'p-5' : 'mx-auto max-w-2xl p-8 sm:p-10'}`} role="status">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
        <Clock3 className="h-5 w-5 text-amber-300" />
      </div>
      <div className="mb-2 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300">
        <Sparkles className="h-3.5 w-3.5" /> Coming Soon
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">{message}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <button type="button" onClick={() => navigate(-1)} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-amber-400/50 hover:text-amber-200">
          <ArrowLeft className="h-3.5 w-3.5" /> Go Back
        </button>
        <Link to="/" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400">
          <Home className="h-3.5 w-3.5" /> Home
        </Link>
      </div>
    </div>
  );
}
