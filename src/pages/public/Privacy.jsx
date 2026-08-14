import { ArrowLeft, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const items = [
  ['Information you provide', 'We may receive information you choose to submit through the website, enquiries, the preliminary evaluation form, support interactions and related customer communications. This may include your name, mobile number, email address, identification details, address, business interests and payment-related information you voluntarily provide.'],
  ['Google Form submissions', 'The current preliminary evaluation form is hosted and processed through Google Forms. Information submitted there is handled through the Google Forms service and the configuration associated with the form. Please review Google’s applicable privacy information as well as this website notice before submitting sensitive information.'],
  ['Why information is used', 'Information may be used to respond to enquiries, process preliminary evaluation requests, coordinate human follow-up, maintain enquiry records, support customer service and improve the website experience. CRM and email verification workflows are intentionally deferred to a later phase.'],
  ['Documents and sensitive information', 'Only provide documents and personal information requested by the applicable form or support process. Do not submit passwords, OTPs, PINs, CVVs or other confidential banking credentials through the website or chat.'],
  ['AI assistant', 'The AI assistant is intended for general website information and guidance. It should not be treated as a substitute for legal, tax, accounting or financial advice. Sensitive, private or consequential requests may require human review.'],
  ['Cookies and browser storage', 'Some website features may use browser storage for preferences, temporary chat state or interface behaviour. These values are not a substitute for a secure customer database or CRM.'],
  ['Sharing and service providers', 'Information may be handled by services used to operate the website or forms. Any future CRM, email, WhatsApp or other provider integrations will be introduced only when the required configuration and approvals are in place.'],
  ['Your choices', 'You may contact Sree Vriddhi with questions about information you submitted through the website or to request appropriate assistance. We will handle requests subject to applicable legal, operational and verification requirements.'],
  ['Security awareness', 'Please verify that you are using the intended Sree Vriddhi website before submitting information. Sree Vriddhi will not ask you to disclose OTPs, PINs, CVVs or passwords.'],
]

export default function Privacy() {
  return (
    <div className="ux2-page-shell">
      <div className="ux2-page-card">
        <Link to="/" className="ux2-back"><ArrowLeft size={15} /> Back to Sree Vriddhi</Link>
        <div className="ux2-page-heading"><ShieldCheck /><div><span>Trust &amp; Information</span><h1>Privacy &amp; Information Handling</h1></div></div>
        <p className="ux2-page-lead">This page explains, in straightforward language, how information submitted through the public Sree Vriddhi website and current evaluation journey is intended to be handled. It should be read together with the applicable service terms and any notices shown in the relevant form.</p>
        <div className="ux2-privacy-grid">
          {items.map(([title, text]) => <section key={title}><div className="ux2-privacy-icon"><LockKeyhole size={15} /></div><h2>{title}</h2><p>{text}</p></section>)}
        </div>
        <div className="ux2-disclosure">Privacy questions: <a href="mailto:sreevriddhiforwealth@gmail.com">sreevriddhiforwealth@gmail.com</a> · <a href="tel:+919640352929">+91 9640352929</a>.</div>
        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-[10px] leading-relaxed text-slate-500">This website notice is an information-handling summary and is not a substitute for a formal privacy notice, data-processing agreement or legal review where one is required.</div>
      </div>
    </div>
  )
}
