import { ExternalLink, FileText, ShieldCheck } from 'lucide-react'
import EligibilityChoice3D from '../../components/EligibilityChoice3D'
import '../../styles/eligibility-choice-3d.css'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdyVSKymLVij2aCDVk1ewr29_mF0Zij6hX0e6yjS3smJro_xw/viewform'

export default function GoogleEvaluationForm() {
  const [selected, setSelected] = React.useState('gold')
  const openForm = () => {
    const formWindow = window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer')
    if (!formWindow) window.location.href = GOOGLE_FORM_URL
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="rounded-2xl border border-amber-500/25 bg-slate-950/80 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-3 min-w-0">
            <div className="mt-0.5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-2 text-amber-300 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-300">10-Point Preliminary Evaluation</span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold font-serif-brand text-white">Complete your evaluation form</h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">Your Sree Vriddhi website will remain open. Choose the closest evaluation category below, then open the official Google Evaluation Form in a separate browser tab.</p>
            </div>
          </div>
          <button type="button" onClick={openForm} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-500">Open Evaluation Form <ExternalLink className="w-4 h-4" /></button>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
          <div className="mb-4 flex items-start justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-amber-300">Step 1 · Choose a category</p><h2 className="mt-1 text-lg sm:text-xl font-extrabold text-white">What best matches your requirement?</h2><p className="mt-1 text-[11px] leading-5 text-slate-400">This is an on-site visual selection only. Your final answers are collected in the official Google Form.</p></div><span className="hidden sm:inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[9px] font-bold text-emerald-300">Interactive preview</span></div>
          <EligibilityChoice3D value={selected} onChange={setSelected} />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-3 text-[11px] leading-relaxed text-slate-300"><ShieldCheck className="mt-0.5 w-4 h-4 shrink-0 text-emerald-300" /><span><strong className="text-white">Website stays open:</strong> the form opens in a new tab, so customers can return to Sree Vriddhi without losing this page.</span></div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3 text-[11px] leading-relaxed text-slate-400"><strong className="text-slate-200">Google-hosted form:</strong> the evaluation form is hosted and submitted through Google Forms. CRM and email verification workflows remain deferred to the next phase.</div>
        </div>

        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-center text-[10px] leading-relaxed text-slate-500">The button opens the official responder URL in a new tab. The <code className="text-slate-400">formResponse</code> URL is a submission endpoint and is not used as the customer-facing form URL.</div>
      </div>
    </section>
  )
}
