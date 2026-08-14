import { useEffect, useState } from 'react'
import { AlertTriangle, ExternalLink, ShieldCheck, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const SESSION_KEY = 'sreeVriddhiPolicyNoticeSeen'

export default function PolicyLaunchNotice() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      if (!window.sessionStorage.getItem(SESSION_KEY)) setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  const dismiss = () => {
    try { window.sessionStorage.setItem(SESSION_KEY, '1') } catch {}
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="policy-launch-title">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-amber-400/30 bg-slate-950 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-2 text-amber-300"><ShieldCheck className="w-5 h-5" /></div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-300">Before you explore</span>
              <h2 id="policy-launch-title" className="text-lg font-bold text-white">A clear note about risks & terms</h2>
            </div>
          </div>
          <button type="button" onClick={dismiss} aria-label="Close policy notice" className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-4 px-5 py-5 text-sm leading-relaxed text-slate-300">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 w-4 h-4 shrink-0 text-amber-300" />
              <p><strong className="text-white">Please make informed decisions.</strong> Any return, interest, payout, settlement or other commercial outcome is subject to the applicable written terms and agreement. Financial participation can involve loss, liquidity, business, counterparty and other risks.</p>
            </div>
          </div>
          <p>You are never required to participate. Please review the applicable terms, understand the risks, ask questions and seek independent professional advice where appropriate before committing funds.</p>
          <p>Information submitted through this website may be used to respond to enquiries and process preliminary evaluation requests. CRM and email verification workflows are currently planned for a later phase.</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link to="/privacy" onClick={dismiss} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-200 hover:border-amber-400/40 hover:text-amber-300">Privacy Policy <ExternalLink className="w-3.5 h-3.5" /></Link>
            <Link to="/terms" onClick={dismiss} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-200 hover:border-amber-400/40 hover:text-amber-300">Terms & Conditions <ExternalLink className="w-3.5 h-3.5" /></Link>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-800 bg-slate-900/60 px-5 py-4">
          <p className="text-[10px] text-slate-500">This notice is informational and does not replace the applicable written agreement or legal notices.</p>
          <button type="button" onClick={dismiss} className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 hover:from-amber-300 hover:to-amber-500">Continue to website</button>
        </div>
      </div>
    </div>
  )
}
