import React from 'react';
import { ArrowRight, Bot, CheckCircle2, Clock3, LockKeyhole, MessageCircle, ShieldCheck, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const releases = [
  { id: 'A', title: 'Compact Experience', status: 'Active', text: 'Shorter journeys, clearer navigation, mobile-first actions and a focused homepage.', icon: Smartphone },
  { id: 'B', title: 'Lead Engine', status: 'Preview', text: '10-point evaluation → lead capture → email/WhatsApp notification workflow. WhatsApp activation waits for Meta Business approval.', icon: CheckCircle2 },
  { id: 'C', title: 'Intelligent Assistant', status: 'Preview', text: 'Chat, voice input, guided actions and human handoff using the existing AI safety layer.', icon: Bot },
  { id: 'D', title: 'Trust & Scale', status: 'Preview', text: 'Privacy, accessibility, performance, structured content and verified market-data readiness.', icon: ShieldCheck },
];

export default function UXBusinessJourney20() {
  return (
    <section className="ux2-journey-shell" aria-labelledby="ux2-title">
      <div className="ux2-journey-inner">
        <div className="ux2-journey-heading">
          <div>
            <span className="ux2-eyebrow">Sree Vriddhi UX &amp; Business Journey 2.0</span>
            <h2 id="ux2-title">One clear journey from discovery to human review.</h2>
            <p>Four focused releases are presented here as one compact experience. Existing features remain in place; provider-dependent actions stay clearly marked until configuration is complete.</p>
          </div>
          <Link className="ux2-primary" to="/eligibility">Start evaluation <ArrowRight size={15} /></Link>
        </div>

        <div className="ux2-release-grid">
          {releases.map(({ id, title, status, text, icon: Icon }) => (
            <article className="ux2-release-card" key={id}>
              <div className="ux2-release-top">
                <span className="ux2-release-id">{id}</span>
                <span className={status === 'Active' ? 'ux2-status ux2-status-active' : 'ux2-status'}>{status}</span>
              </div>
              <Icon size={20} className="ux2-release-icon" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="ux2-trust-strip">
          <div><LockKeyhole size={16} /><span>Public information only</span></div>
          <div><Clock3 size={16} /><span>Human review for sensitive requests</span></div>
          <div><MessageCircle size={16} /><span>WhatsApp handoff available</span></div>
        </div>
      </div>
    </section>
  );
}
