import React from 'react'
import { Clock3, LockKeyhole, ShieldCheck } from 'lucide-react'

export default function ComingSoonFeature({ title, description, features = [], secure = false }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-amber-500/20 bg-slate-900/70 p-6 text-center shadow-xl sm:p-10">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
          {secure ? <LockKeyhole className="h-7 w-7 text-amber-400" /> : <Clock3 className="h-7 w-7 text-amber-400" />}
        </div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300"><Clock3 className="h-3.5 w-3.5" /> Coming Soon</div>
        <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
        {features.length > 0 && <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-2">{features.map(feature => <div key={feature} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4"><ShieldCheck className="h-4 w-4 shrink-0 text-amber-400" /><span className="text-sm text-slate-300">{feature}</span><span className="ml-auto shrink-0 text-[10px] font-semibold text-amber-300">Soon</span></div>)}</div>}
        <p className="mt-8 text-xs text-slate-500">This area is temporarily unavailable while we complete security, data and workflow validation. No account, CRM or financial values are displayed.</p>
      </div>
    </section>
  )
}
