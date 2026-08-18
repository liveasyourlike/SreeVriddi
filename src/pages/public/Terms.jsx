import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, ShieldCheck } from 'lucide-react'

const terms = [
  ['Website purpose', 'This website provides general information about Sree Vriddhi, its value-management approach, products, eligibility process and customer support channels.'],
  ['Eligibility is not approval', 'Submitting an enquiry or eligibility form does not create an offer, approval, contract or entitlement. Every proposal remains subject to verification, valuation, risk assessment, legal review and formal approval.'],
  ['Information accuracy', 'You are responsible for providing accurate and complete information and for supplying documents requested during verification.'],
  ['Returns and commercial terms', 'Any return, payout, tenure, fee, settlement or other commercial term is subject to the applicable product terms and the final legally binding agreement. Website examples are illustrative unless expressly stated otherwise.'],
  ['Asset verification', 'Any asset presented to Sree Vriddhi may be independently verified and valued. Sree Vriddhi may decline an asset or proposal that does not satisfy its eligibility, documentation, risk or legal requirements.'],
  ['AI assistant', 'The AI assistant provides general website guidance. It is not legal, financial, tax or investment advice and does not replace human review or formal documentation.'],
  ['Third-party services', 'Links, communication providers, payment providers, forms and other third-party services may have their own terms and privacy practices. Their availability is not guaranteed by this website.'],
  ['Changes', 'Sree Vriddhi may update website content, processes or these terms when required. The applicable formal agreement controls any contractual relationship.'],
]

export default function Terms() {
  return (
    <div className="legal-page">
      <div className="legal-card">
        <Link to="/" className="legal-back"><ArrowLeft size={15} /> Back to Sree Vriddhi</Link>
        <div className="legal-heading"><FileText /><div><span>DIRECT • CLEAR • PRACTICAL</span><h1>Terms &amp; Conditions</h1></div></div>
        <p className="legal-lead">These terms explain the basic rules for using the Sree Vriddhi website. They are concise website terms and do not replace a product agreement or other legally binding document.</p>
        <div className="legal-list">
          {terms.map(([title, text], index) => <section key={title}><div className="legal-number">{String(index + 1).padStart(2, '0')}</div><div><h2>{title}</h2><p>{text}</p></div></section>)}
        </div>
        <div className="legal-notice"><ShieldCheck size={17} /><span>For any commercial or contractual question, rely on the applicable formal documentation and contact Sree Vriddhi directly.</span></div>
      </div>
    </div>
  )
}
