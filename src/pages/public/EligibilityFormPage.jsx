import { useState } from 'react'
import { UserRound, Phone, MapPinned, Coins, Landmark, WalletCards, FileCheck2, ShieldCheck, ArrowRight, Check, ExternalLink, CircleDollarSign, Play, Video } from 'lucide-react'

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdyVSKymLVij2aCDVk1ewr29_mF0Zij6hX0e6yjS3smJro_xw/viewform'
const VIDEO_URL = '/media/eligibility-overview.mp4'

const formJourney = [
  { id: 'profile', step: '01', title: 'Applicant details', detail: 'Basic applicant identity and contact information', icon: UserRound },
  { id: 'contact', step: '02', title: 'Contact & location', detail: 'Phone, location and preferred contact context', icon: Phone },
  { id: 'category', step: '03', title: 'Evaluation category', detail: 'Physical Gold, Capital / Money, Land & Property or Financial Assets', icon: Coins },
  { id: 'asset', step: '04', title: 'Asset information', detail: 'Details needed to understand the asset or value being presented', icon: Landmark },
  { id: 'value', step: '05', title: 'Value & requirement', detail: 'Indicative value and the requirement you want evaluated', icon: CircleDollarSign },
  { id: 'review', step: '06', title: 'Declaration & submission', detail: 'Review the information and submit through the official Google Form', icon: FileCheck2 }
]

const options = [
  { id: 'gold', title: 'Physical Gold', subtitle: 'Gold / Jewellery', icon: Coins, visual: 'Gold', description: 'Eligible physical gold or jewellery holdings.' },
  { id: 'capital', title: 'Capital / Money', subtitle: 'Capital-based option', icon: WalletCards, visual: 'Capital', description: 'Capital-based business interest option.' },
  { id: 'land', title: 'Land & Property', subtitle: 'Land / commercial property', icon: MapPinned, visual: 'Property', description: 'Eligible land or property-related value.' },
  { id: 'financial', title: 'Financial Assets', subtitle: 'Other financial assets', icon: Landmark, visual: 'Financial', description: 'Other eligible financial assets.' }
]

export default function EligibilityFormPage() {
  const [selected, setSelected] = useState('gold')
  const [videoReady, setVideoReady] = useState(false)
  const active = options.find((item) => item.id === selected) || options[0]
  const openForm = () => window.location.assign(FORM_URL)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <section className="text-center max-w-4xl mx-auto space-y-4 future-reveal">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.2em] text-amber-300"><ShieldCheck className="h-3.5 w-3.5" /> Preliminary Evaluation</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-brand text-white">Start your Sree Vriddhi evaluation</h1>
        <p className="text-sm sm:text-base leading-7 text-slate-300">Understand the information journey before you open the official evaluation form. The video below can explain the actual Sree Vriddhi evaluation experience, while the Google Form remains the authoritative source for the live questions and submission.</p>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-slate-950/90 p-4 sm:p-7 shadow-2xl" data-future-tilt>
        <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 -bottom-28 h-72 w-72 rounded-full bg-cyan-400/5 blur-3xl" />
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,.55)]">
          {videoReady ? (
            <video className="aspect-video w-full object-cover" controls playsInline preload="metadata" onError={() => setVideoReady(false)}>
              <source src={VIDEO_URL} type="video/mp4" />
            </video>
          ) : (
            <div className="flex aspect-video min-h-[300px] items-center justify-center bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,.16),transparent_38%),linear-gradient(135deg,#030712,#07101f)] p-6 sm:p-10 text-center">
              <div className="max-w-xl">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.75rem] border border-amber-300/30 bg-amber-300/10 text-amber-300 shadow-[0_0_70px_rgba(245,158,11,.14)] [transform:perspective(700px)_rotateX(8deg)_rotateY(-8deg)]"><Video size={32} /></div>
                <p className="mt-6 text-[10px] font-black uppercase tracking-[.24em] text-amber-300">Eligibility experience video</p>
                <h2 className="mt-2 text-2xl font-extrabold text-white">Your Sree Vriddhi video will appear here</h2>
                <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-slate-400">Upload your MP4 later as <span className="font-bold text-slate-200">public/media/eligibility-overview.mp4</span>. No code change is required; this stage will automatically switch from the placeholder to the video when the file is available.</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] text-slate-500"><Play size={12} className="text-amber-300" /> Video replaces the previous 3D form object</div>
              </div>
            </div>
          )}
          {!videoReady && <video className="hidden" preload="metadata" onCanPlay={() => setVideoReady(true)} onError={() => setVideoReady(false)}><source src={VIDEO_URL} type="video/mp4" /></video>}
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-400/20 bg-slate-950/90 p-5 sm:p-8 shadow-2xl" data-future-tilt>
        <div className="mb-6"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-amber-400">Step 1 · Category</p><h2 className="mt-2 text-2xl font-extrabold text-white">Select the category that best matches your requirement</h2><p className="mt-2 text-xs leading-5 text-slate-400">This selection helps you understand the relevant evaluation path. Select the matching option again inside the official Google Form where requested.</p></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{options.map((item) => { const Icon = item.icon; const isActive = selected === item.id; return <button key={item.id} type="button" onClick={() => setSelected(item.id)} className={`text-left rounded-2xl border p-4 transition-all hover:-translate-y-1 ${isActive ? 'border-amber-400/60 bg-amber-400/10 shadow-lg shadow-amber-500/10' : 'border-slate-800 bg-slate-900/70 hover:border-slate-600'}`}><div className="flex items-start gap-3"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${isActive ? 'border-amber-400/40 bg-amber-400/10 text-amber-300' : 'border-slate-700 bg-slate-950 text-slate-400'}`}><Icon className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="text-sm font-extrabold text-white">{item.title}</span>{isActive && <Check className="h-4 w-4 text-amber-300" />}</div><p className="mt-1 text-[10px] font-semibold text-amber-200">{item.subtitle}</p><p className="mt-2 text-[11px] leading-5 text-slate-400">{item.description}</p></div></div></button> })}</div>
      </section>

      <section className="rounded-[2rem] border border-amber-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden shadow-2xl" data-future-tilt>
        <div className="border-b border-slate-800 px-5 py-5 sm:px-8"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-amber-400">Step 2 · Official Application Form</p><h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Continue to the Sree Vriddhi Evaluation Form</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">The official form is hosted by Google. We keep it as the source of truth for the live questions, validation and submission.</p></div>
        <div className="px-5 py-10 sm:px-8 sm:py-14"><div className="mx-auto max-w-3xl rounded-[1.75rem] border border-amber-400/20 bg-slate-950/80 p-6 sm:p-10 text-center shadow-[0_0_70px_rgba(245,158,11,.08)]"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-amber-300/30 bg-amber-400/10 shadow-lg shadow-amber-500/10"><FileCheck2 className="h-9 w-9 text-amber-300" /></div><h3 className="mt-6 text-xl sm:text-2xl font-extrabold text-white">Ready to submit your preliminary details?</h3><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">You selected <span className="font-bold text-amber-300">{active.title}</span>. Continue to the official Google Form and complete every requested field.</p><button type="button" onClick={openForm} className="mt-7 inline-flex min-w-[240px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-4 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:scale-[1.02] hover:shadow-amber-500/30">Open Evaluation Form <ArrowRight className="h-4 w-4" /></button><p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500"><ExternalLink className="h-3.5 w-3.5" /> Secure Google-hosted form · Opens in this tab</p></div></div>
      </section>
    </div>
  )
}
