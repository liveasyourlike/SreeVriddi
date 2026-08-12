import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LockKeyhole, ShieldCheck } from 'lucide-react';

const items = [
  ['What we collect', 'Information you choose to submit through enquiries, the preliminary evaluation form and support interactions.'],
  ['Why we collect it', 'To respond to enquiries, perform preliminary evaluation, support human follow-up and improve the website experience.'],
  ['AI boundaries', 'The website assistant is for published information and guidance. Sensitive or consequential requests may require human review.'],
  ['Notification controls', 'Email and WhatsApp lead notifications are provider-dependent and remain disabled until the required business accounts and approvals are configured.'],
  ['Your choices', 'You can contact Sree Vriddhi to ask questions about information submitted through the website or request appropriate assistance.'],
];

export default function Privacy() {
  return (
    <div className="ux2-page-shell">
      <div className="ux2-page-card">
        <Link to="/" className="ux2-back"><ArrowLeft size={15} /> Back to Sree Vriddhi</Link>
        <div className="ux2-page-heading"><ShieldCheck /><div><span>Trust &amp; Scale</span><h1>Privacy &amp; Information Handling</h1></div></div>
        <p className="ux2-page-lead">A simple explanation of how information submitted through this public website is intended to be handled. This page is informational and does not replace formal legal terms or applicable privacy notices.</p>
        <div className="ux2-privacy-grid">
          {items.map(([title, text]) => <section key={title}><div className="ux2-privacy-icon"><LockKeyhole size={15} /></div><h2>{title}</h2><p>{text}</p></section>)}
        </div>
        <div className="ux2-disclosure">For privacy questions, contact <a href="mailto:sreevriddhiforwealth@gmail.com">sreevriddhiforwealth@gmail.com</a>.</div>
      </div>
    </div>
  );
}
