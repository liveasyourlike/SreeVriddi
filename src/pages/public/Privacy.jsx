import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, LockKeyhole, ShieldCheck } from 'lucide-react'

const items = [
  ['Information we collect', 'Information you submit through enquiries, the eligibility form, customer support and related website interactions.'],
  ['How we use it', 'To respond to you, assess preliminary eligibility, coordinate verification and human follow-up, provide support and improve the website.'],
  ['Information sharing', 'Information may be shared with service providers or professional advisers only when required to operate the service, complete verification, communicate with you or meet legal requirements.'],
  ['AI assistant', 'The AI assistant is designed to answer website and business-information questions. Do not submit passwords, payment credentials or other unnecessary sensitive information to the assistant.'],
  ['Forms and third parties', 'Google Forms, WhatsApp, email, hosting and other third-party services process information under their own systems and policies.'],
  ['Your choices', 'You may contact Sree Vriddhi about information submitted through this website, ask questions about its handling or request appropriate assistance.'],
  ['Security and retention', 'Reasonable technical and organisational measures are used for website information. Retention depends on the purpose, operational need and applicable legal requirements.'],
]

export default function Privacy() {
  return (
    <div className="legal-page">
      <div className="legal-card">
        <Link to="/" className="legal-back"><ArrowLeft size={15} /> Back to Sree Vriddhi</Link>
        <div className="legal-heading"><ShieldCheck /><div><span>DIRECT • CLEAR • PRACTICAL</span><h1>Privacy Policy</h1></div></div>
        <p className="legal-lead">This notice explains, in plain language, what information the Sree Vriddhi website may receive and why it may be used.</p>
        <div className="legal-list">
          {items.map(([title, text], index) => <section key={title}><div className="legal-number">{String(index + 1).padStart(2, '0')}</div><div><h2>{title}</h2><p>{text}</p></div></section>)}
        </div>
        <div className="legal-notice"><LockKeyhole size={17} /><span>Privacy questions: <a href="mailto:sreevriddhiforwealth@gmail.com" className="underline font-semibold">sreevriddhiforwealth@gmail.com</a></span></div>
      </div>
    </div>
  )
}
