import { ExternalLink, FileText } from 'lucide-react'
import EligibilityYouTubeVideos from '../../components/EligibilityYouTubeVideos'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdyVSKymLVij2aCDVk1ewr29_mF0Zij6hX0e6yjS3smJro_xw/viewform'

export default function GoogleEvaluationForm() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
      <div className="rounded-2xl border border-amber-500/25 bg-slate-950/85 p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300 shrink-0"><FileText className="w-5 h-5" /></div>
            <div className="min-w-0"><span className="text-[9px] font-extrabold uppercase tracking-[.18em] text-amber-300">10-Point Preliminary Evaluation</span><h1 className="mt-0.5 text-xl sm:text-2xl font-bold font-serif-brand text-white truncate">Complete your evaluation form</h1></div>
          </div>
          <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/15 hover:from-amber-300 hover:to-amber-500">Open Google Form <ExternalLink className="w-4 h-4" /></a>
        </div>

        <div className="mt-4">
          <EligibilityYouTubeVideos />
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2.5">
          <p className="text-[10px] leading-4 text-slate-400">The official evaluation questionnaire opens in a separate tab. Your Sree Vriddhi website tab remains open.</p>
          <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-amber-300 hover:text-amber-200 whitespace-nowrap">Open form ↗</a>
        </div>
      </div>
    </section>
  )
}
