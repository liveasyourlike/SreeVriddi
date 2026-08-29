import { useEffect, useState } from 'react'
import { ShieldCheck, X } from 'lucide-react'
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
    <div className="sv-policy-overlay" role="dialog" aria-modal="true" aria-labelledby="sv-policy-title">
      <div className="sv-policy-card">
        <button type="button" className="sv-policy-close" onClick={dismiss} aria-label="Close notice"><X size={18} /></button>
        <div className="sv-policy-icon"><ShieldCheck size={22} /></div>
        <p className="sv-policy-kicker">Before you continue</p>
        <h2 id="sv-policy-title">Please review the Sree Vriddhi terms</h2>
        <p>Our products and proposed returns depend on the selected structure, verification, valuation, legal review and final contract. Information on this website is for general guidance and does not by itself create an investment commitment or guarantee a return.</p>
        <div className="sv-policy-actions">
          <Link to="/terms" onClick={dismiss}>Read Terms &amp; Risk</Link>
          <Link to="/privacy" onClick={dismiss}>Privacy Policy</Link>
          <button type="button" onClick={dismiss}>Continue</button>
        </div>
      </div>
    </div>
  )
}
