import { useState } from 'react'
import { ChevronDown, ChevronUp, Maximize2, Minimize2, ExternalLink } from 'lucide-react'

const VIDEOS = [
  { id: 'B1BXOFxaowY', title: 'Sree Vriddhi — Video 1' },
  { id: 'QeLg3EPjDBk', title: 'Sree Vriddhi — Video 2' },
]

function VideoCard({ video }) {
  const [collapsed, setCollapsed] = useState(false)
  const [maximized, setMaximized] = useState(false)

  const embed = `https://www.youtube.com/embed/${video.id}?controls=1&playsinline=1&enablejsapi=1&fs=1&rel=0&cc_load_policy=0`
  const youtube = `https://www.youtube.com/watch?v=${video.id}`

  if (collapsed) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-3 py-2.5">
          <p className="truncate text-xs font-semibold text-slate-200">{video.title}</p>
          <div className="flex items-center gap-1 shrink-0">
            <a href={youtube} target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-amber-300" title="Open on YouTube"><ExternalLink size={14} /></a>
            <button type="button" onClick={() => setCollapsed(false)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-amber-300" title="Expand video"><ChevronDown size={16} /></button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={maximized ? 'fixed inset-3 sm:inset-6 z-[160] rounded-2xl border border-amber-400/30 bg-black shadow-2xl overflow-hidden' : 'rounded-xl border border-slate-800 bg-black overflow-hidden'}>
      <div className="flex items-center justify-between gap-3 bg-slate-950 px-3 py-2 border-b border-white/10">
        <p className="truncate text-xs font-bold text-white">{video.title}</p>
        <div className="flex items-center gap-1 shrink-0">
          <a href={youtube} target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-amber-300" title="Open on YouTube"><ExternalLink size={14} /></a>
          <button type="button" onClick={() => setMaximized((v) => !v)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-amber-300" title={maximized ? 'Restore video size' : 'Maximize video'}>{maximized ? <Minimize2 size={15} /> : <Maximize2 size={15} />}</button>
          <button type="button" onClick={() => setCollapsed(true)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-amber-300" title="Collapse video"><ChevronUp size={16} /></button>
        </div>
      </div>
      <div className={maximized ? 'h-[calc(100%-49px)]' : 'aspect-video w-full'}>
        <iframe title={video.title} src={embed} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
      </div>
    </div>
  )
}

export default function EligibilityYouTubeVideos() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {VIDEOS.map((video) => <VideoCard key={video.id} video={video} />)}
    </div>
  )
}
