import { ExternalLink, FileText, ShieldCheck } from 'lucide-react'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdyVSKymLVij2aCDVk1ewr29_mF0Zij6hX0e6yjS3smJro_xw/viewform'
const GOOGLE_FORM_EMBED_URL = `${GOOGLE_FORM_URL}?embedded=true`

export default function GoogleEvaluationForm() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-5 rounded-2xl border border-amber-500/25 bg-slate-950/80 p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-2 text-amber-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-300">10-Point Preliminary Evaluation</span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold font-serif-brand text-white">Complete your evaluation form</h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">Please complete the official Sree Vriddhi evaluation form. Review the applicable risks, terms and policy acknowledgement before submitting.</p>
            </div>
          </div>
          <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-500">
            Open Form <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5 text-[11px] leading-relaxed text-slate-300">
          <ShieldCheck className="mt-0.5 w-4 h-4 shrink-0 text-emerald-300" />
          <span>Your information is submitted directly through the configured Google Form. CRM and email verification workflows are intentionally deferred to the next phase.</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-white shadow-2xl">
        <iframe
          src={GOOGLE_FORM_EMBED_URL}
          title="Sree Vriddhi Preliminary Evaluation Form"
          className="block h-[78vh] min-h-[720px] w-full border-0 bg-white"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-center text-[10px] leading-relaxed text-slate-500">
        <span>If the embedded form is blocked by the browser or Google account settings, use </span>
        <a className="font-bold text-amber-300 hover:text-amber-200" href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">Open Form in a new tab</a>
        <span>. The new-tab link is the official responder link; the </span>
        <code className="text-slate-400">formResponse</code>
        <span> URL is only a submission endpoint and should not be used as the customer-facing form URL.</span>
      </div>
    </section>
  )
}
