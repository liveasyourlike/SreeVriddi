import { useEffect, useRef, useState } from 'react'
import { UserRound, Phone, MapPinned, Coins, Landmark, WalletCards, FileCheck2, ShieldCheck, ArrowRight, Check, ExternalLink, CircleDollarSign, Play, Volume2, VolumeX, Maximize2, Minimize2, ChevronDown, ChevronUp } from 'lucide-react'

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdyVSKymLVij2aCDVk1ewr29_mF0Zij6hX0e6yjS3smJro_xw/viewform'
const videos = [
  { id: 'B1BXOFxaowY', title: 'Sree Vriddhi — Business Overview', detail: 'Understand the business context before starting your evaluation.' },
  { id: 'QeLg3EPjDBk', title: 'Sree Vriddhi — Evaluation Guide', detail: 'See the evaluation journey and what to prepare before submitting.' }
]

const formJourney = [
  { id: 'profile', step: '01', title: 'Applicant details', detail: 'Basic applicant identity and contact information', icon: UserRound },
  { id: 'contact', step: '02', title: 'Contact & location', detail: 'Phone, location and preferred contact context', icon: Phone },
  { id: 'category', step: '03', title: 'Evaluation category', detail: 'Physical Gold, Capital / Money, Land & Property or Financial Assets', icon: Coins },
  { id: 'asset', step: '04', title: 'Asset information', detail: 'Details needed to understand the asset or value being presented', icon: Landmark },
  { id: 'value', step: '05', title: 'Value & requirement', detail: 'Indicative value and the requirement you want evaluated', icon: CircleDollarSign },
  { id: 'review', step: '06', title: 'Declaration & submission', detail: 'Review the information and submit through the official Google Form', icon: FileCheck2 }
]

const options = [
  { id: 'gold', title: 'Physical Gold', subtitle: 'Gold / Jewellery', icon: Coins, description: 'Eligible physical gold or jewellery holdings.' },
  { id: 'capital', title: 'Capital / Money', subtitle: 'Capital-based option', icon: WalletCards, description: 'Capital-based business interest option.' },
  { id: 'land', title: 'Land & Property', subtitle: 'Land / commercial property', icon: MapPinned, description: 'Eligible land or property-related value.' },
  { id: 'financial', title: 'Financial Assets', subtitle: 'Other financial assets', icon: Landmark, description: 'Other eligible financial assets.' }
]

function YouTubePlayer({ video, index }) {
  const frameRef = useRef(null)
  const [collapsed, setCollapsed] = useState(false)
  const [compact, setCompact] = useState(false)
  const [muted, setMuted] = useState(false)

  const send = (func, args = []) => frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*')
  const toggleMute = () => {
    send(muted ? 'unMute' : 'mute')
    setMuted((value) => !value)
  }

  useEffect(() => {
    const onMessage = (event) => {
      if (event.source !== frameRef.current?.contentWindow) return
      try {
        const data = JSON.parse(event.data)
        if (data.event === 'onReady' && muted) send('mute')
      } catch { /* YouTube also posts non-JSON messages. */ }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [muted])

  return (
    <article className={`overflow-hidden rounded-3xl border border-amber-400/20 bg-[var(--bg-card-solid)] shadow-2xl transition-all duration-300 ${compact ? 'lg:col-span-1' : ''}`}>
      <div className="flex items-center justify-between gap-3 border-b border-[var(--surface-border)] px-4 py-3">
        <div className="min-w-0"><p className="truncate text-[10px] font-black uppercase tracking-[.18em] text-amber-600 dark:text-amber-300">Video {String(index + 1).padStart(2, '0')}</p><h3 className="truncate text-sm font-extrabold text-[var(--text-primary)]">{video.title}</h3></div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={toggleMute} aria-label={muted ? 'Unmute video' : 'Mute video'} className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--surface-border)] bg-[var(--bg-card-soft)] text-[var(--text-secondary)] hover:text-amber-500">{muted ? <VolumeX size={14} /> : <Volume2 size={14} />}</button>
          <button type="button" onClick={() => setCompact((value) => !value)} aria-label={compact ? 'Expand video' : 'Minimize video'} className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--surface-border)] bg-[var(--bg-card-soft)] text-[var(--text-secondary)] hover:text-amber-500">{compact ? <Maximize2 size={14} /> : <Minimize2 size={14} />}</button>
          <button type="button" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? 'Expand video' : 'Collapse video'} className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--surface-border)] bg-[var(--bg-card-soft)] text-[var(--text-secondary)] hover:text-amber-500">{collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}</button>
        </div>
      </div>
      {!collapsed && <div className="relative bg-black"><iframe ref={frameRef} className={`block w-full border-0 transition-all ${compact ? 'aspect-[16/7]' : 'aspect-video'}`} src={`https://www.youtube-nocookie.com/embed/${video.id}?enablejsapi=1&controls=1&fs=1&rel=0&modestbranding=1&cc_load_policy=1&playsinline=1`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>}
      <div className="px-4 py-3"><p className="text-xs leading-5 text-[var(--text-secondary)]">{video.detail}</p><p className="mt-1 text-[10px] text-[var(--text-muted)]">YouTube controls provide play, seek, captions/subtitles, volume, settings and fullscreen.</p></div>
    </article>
  )
}

export default function EligibilityFormPage() {
  const [selected, setSelected] = useState('gold')
  const active = options.find((item) => item.id === selected) || options[0]
  const openForm = () => window.location.assign(FORM_URL)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-7">
      <section className="text-center max-w-4xl mx-auto space-y-3 future-reveal">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.2em] text-amber-300"><ShieldCheck className="h-3.5 w-3.5" /> Preliminary Evaluation</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-brand text-[var(--text-primary)]">Start your Sree Vriddhi evaluation</h1>
        <p className="text-sm sm:text-base leading-7 text-[var(--text-secondary)]">Understand the information journey before you open the official evaluation form. Watch the Sree Vriddhi videos below, then continue to the official Google Form for the live questions and submission.</p>
      </section>

      <section className="grid gap-5 lg:grid-cols-2" aria-label="Sree Vriddhi eligibility videos">
        {videos.map((video, index) => <YouTubePlayer key={video.id} video={video} index={index} />)}
      </section>

      <section className="rounded-[2rem] border border-amber-400/20 bg-[var(--bg-card-solid)] p-5 sm:p-7 shadow-2xl" data-future-tilt>
        <div className="mb-5"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-amber-600 dark:text-amber-300">Step 1 · Category</p><h2 className="mt-2 text-2xl font-extrabold text-[var(--text-primary)]">Select the category that best matches your requirement</h2><p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">This selection helps you understand the relevant evaluation path. Select the matching option again inside the official Google Form where requested.</p></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{options.map((item) => { const Icon = item.icon; const isActive = selected === item.id; return <button key={item.id} type="button" onClick={() => setSelected(item.id)} className={`text-left rounded-2xl border p-4 transition-all hover:-translate-y-1 ${isActive ? 'border-amber-400/60 bg-amber-400/10 shadow-lg shadow-amber-500/10' : 'border-[var(--surface-border)] bg-[var(--bg-card-soft)] hover:border-amber-400/30'}`}><div className="flex items-start gap-3"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${isActive ? 'border-amber-400/40 bg-amber-400/10 text-amber-500' : 'border-[var(--surface-border)] bg-[var(--bg-card-solid)] text-[var(--text-secondary)]'}`}><Icon className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="text-sm font-extrabold text-[var(--text-primary)]">{item.title}</span>{isActive && <Check className="h-4 w-4 text-amber-500" />}</div><p className="mt-1 text-[10px] font-semibold text-amber-600 dark:text-amber-300">{item.subtitle}</p><p className="mt-2 text-[11px] leading-5 text-[var(--text-secondary)]">{item.description}</p></div></div></button> })}</div>
      </section>

      <section className="rounded-[2rem] border border-amber-400/20 bg-[var(--bg-card-solid)] overflow-hidden shadow-2xl" data-future-tilt>
        <div className="border-b border-[var(--surface-border)] px-5 py-5 sm:px-7"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-amber-600 dark:text-amber-300">Step 2 · Official Application Form</p><h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">Continue to the Sree Vriddhi Evaluation Form</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">The official form is hosted by Google. We keep it as the source of truth for the live questions, validation and submission.</p></div>
        <div className="px-5 py-7 sm:px-7"><div className="mx-auto max-w-3xl rounded-[1.75rem] border border-amber-400/20 bg-[var(--bg-card-soft)] p-6 sm:p-8 text-center shadow-[0_0_70px_rgba(245,158,11,.08)]"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-amber-300/30 bg-amber-400/10 shadow-lg shadow-amber-500/10"><FileCheck2 className="h-8 w-8 text-amber-500" /></div><h3 className="mt-5 text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">Ready to submit your preliminary details?</h3><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">You selected <span className="font-bold text-amber-600 dark:text-amber-300">{active.title}</span>. Continue to the official Google Form and complete every requested field.</p><button type="button" onClick={openForm} className="mt-6 inline-flex min-w-[240px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-4 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:scale-[1.02] hover:shadow-amber-500/30">Open Evaluation Form <ArrowRight className="h-4 w-4" /></button><p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[var(--text-muted)]"><ExternalLink className="h-3.5 w-3.5 text-amber-500" /> Secure Google-hosted form · Opens in this tab</p></div></div>
      </section>
    </div>
  )
}