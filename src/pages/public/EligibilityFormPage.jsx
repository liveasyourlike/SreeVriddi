import { useState } from 'react'
import { ArrowRight, Check, Coins, Landmark, MapPinned, ShieldCheck, Sparkles, WalletCards } from 'lucide-react'

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdyVSKymLVij2aCDVk1ewr29_mF0Zij6hX0e6yjS3smJro_xw/viewform'

const options = [
  { id: 'gold', title: 'Physical Gold', subtitle: 'Gold / Jewellery', icon: Coins, visual: '◈', description: 'Eligible physical gold or jewellery holdings.' },
  { id: 'capital', title: 'Capital / Money', subtitle: 'Capital-based option', icon: WalletCards, visual: '₹', description: 'Capital-based business interest option.' },
  { id: 'land', title: 'Land & Property', subtitle: 'Land / commercial property', icon: MapPinned, visual: '⌂', description: 'Eligible land or property-related value.' },
  { id: 'financial', title: 'Financial Assets', subtitle: 'Other financial assets', icon: Landmark, visual: '◇', description: 'Other eligible financial assets.' }
]

export default function EligibilityFormPage() {
  const [selected, setSelected] = useState('gold')
  const [loaded, setLoaded] = useState(false)
  const active = options.find((item) => item.id === selected) || options[0]
  const ActiveIcon = active.icon

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.2em] text-amber-300">Preliminary Evaluation</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-brand text-white">Choose your evaluation category</h1>
        <p className="text-sm sm:text-base leading-6 text-slate-300">Select the category that best matches your requirement. The evaluation form below is the primary application flow.</p>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-slate-950/90 p-5 sm:p-8 shadow-2xl">
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-cyan-400/5 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex justify-center">
            <div className="relative h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] [perspective:1200px]">
              <div className="absolute inset-[9%] rounded-full border border-amber-400/20 [transform:rotateX(62deg)_rotateZ(18deg)] shadow-[0_0_80px_rgba(245,158,11,.12)]" />
              <div className="absolute inset-[18%] rounded-full border border-amber-300/25 [transform:rotateX(62deg)_rotateZ(-24deg)]" />
              <div className="absolute inset-[28%] rounded-full border border-slate-700 [transform:rotateX(62deg)]" />
              <div className="absolute inset-[24%] animate-pulse rounded-full bg-amber-400/10 blur-2xl" />
              <div className="absolute inset-[28%] flex flex-col items-center justify-center rounded-full border border-amber-300/50 bg-slate-950 shadow-[0_0_70px_rgba(245,158,11,.18)] [transform:rotateX(8deg)]">
                <ActiveIcon className="h-10 w-10 text-amber-300" />
                <span className="mt-3 text-xl font-extrabold text-white">{active.visual} {active.title}</span>
                <span className="mt-1 text-[10px] uppercase tracking-widest text-amber-200">Selected category</span>
                <Sparkles className="mt-4 h-4 w-4 text-amber-300" />
              </div>
              {options.map((item, index) => {
                const Icon = item.icon
                const angle = index * 90 - 45
                return <button key={item.id} type="button" onClick={() => { setSelected(item.id); setLoaded(false) }} className={`absolute left-1/2 top-1/2 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${selected === item.id ? 'border-amber-300 bg-amber-400/20 text-amber-200 scale-110 shadow-lg shadow-amber-500/20' : 'border-slate-700 bg-slate-900/95 text-slate-400 hover:border-amber-400/40 hover:text-amber-200'}`} style={{ transform: `rotate(${angle}deg) translateY(-138px) rotate(${-angle}deg) translate(-50%, -50%)` }} aria-label={`Choose ${item.title}`}><Icon className="h-5 w-5" /></button>
              })}
            </div>
          </div>

          <div>
            <div className="mb-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-amber-400">Step 1 · Category</p>
              <h2 className="mt-2 text-2xl font-extrabold text-white">What are you interested in evaluating?</h2>
              <p className="mt-2 text-xs leading-5 text-slate-400">This 3D selection is a visual guide. Please select the matching category again inside the Google Form where requested.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {options.map((item) => {
                const Icon = item.icon
                const isActive = selected === item.id
                return <button key={item.id} type="button" onClick={() => { setSelected(item.id); setLoaded(false) }} className={`text-left rounded-2xl border p-4 transition-all ${isActive ? 'border-amber-400/60 bg-amber-400/10 shadow-lg shadow-amber-500/10' : 'border-slate-800 bg-slate-900/70 hover:border-slate-600'}`}><div className="flex items-start gap-3"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${isActive ? 'border-amber-400/40 bg-amber-400/10 text-amber-300' : 'border-slate-700 bg-slate-950 text-slate-400'}`}><Icon className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="text-sm font-extrabold text-white">{item.title}</span>{isActive && <Check className="h-4 w-4 text-amber-300" />}</div><p className="mt-1 text-[10px] font-semibold text-amber-200">{item.subtitle}</p><p className="mt-2 text-[11px] leading-5 text-slate-400">{item.description}</p></div></div></button>
              })}
            </div>
            <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /><div><p className="text-xs font-bold text-emerald-200">Selected: {active.title}</p><p className="mt-1 text-[11px] leading-5 text-slate-400">Continue below to provide the complete information requested in the Sree Vriddhi preliminary evaluation form.</p></div></div></div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-white overflow-hidden shadow-2xl">
        <div className="flex flex-col gap-2 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-amber-700">Step 2 · Application Form</p><h2 className="mt-1 text-lg font-extrabold text-slate-900">Sree Vriddhi Preliminary Evaluation & Business Interest Form</h2></div>
          <a href={FORM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-amber-500 hover:text-amber-700">Form not loading? Open separately <ArrowRight className="h-3.5 w-3.5" /></a>
        </div>
        <div className="relative min-h-[900px] bg-white">
          {!loaded && <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/95 text-center px-6"><div><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-amber-500" /><p className="mt-3 text-xs font-semibold text-slate-500">Loading the secure Google Form…</p></div></div>}
          <iframe title="Sree Vriddhi Preliminary Evaluation & Business Interest Form" src={`${FORM_URL}?embedded=true`} onLoad={() => setLoaded(true)} className="block h-[900px] w-full border-0" loading="eager" />
        </div>
      </section>
    </div>
  )
}
