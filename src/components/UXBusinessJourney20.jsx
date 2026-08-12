import React, { useState } from 'react';
import { ArrowRight, Bot, CheckCircle2, Clock3, LockKeyhole, MessageCircle, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const releases = [
  { id: 'A', title: 'Compact Experience', status: 'Active', text: 'Shorter journeys, clearer navigation, mobile-first actions and a focused homepage.', detail: 'Start with the goal that matters to you and move directly to the next step without unnecessary scrolling.', icon: Smartphone },
  { id: 'B', title: 'Lead Engine', status: 'Preview', text: '10-point evaluation → lead capture → email/WhatsApp notification workflow.', detail: 'The evaluation journey is prepared for structured follow-up. WhatsApp activation remains dependent on Meta Business configuration.', icon: CheckCircle2 },
  { id: 'C', title: 'Intelligent Assistant', status: 'Preview', text: 'Chat, voice input, guided actions and human handoff using the existing AI safety layer.', detail: 'Use guided prompts, type a question or use voice input. Sensitive requests can be handed to a human.', icon: Bot },
  { id: 'D', title: 'Trust & Scale', status: 'Preview', text: 'Privacy, accessibility, performance, structured content and verified market-data readiness.', detail: 'Trust information and accessibility are surfaced clearly while unverified market values remain unavailable.', icon: ShieldCheck },
];

export default function UXBusinessJourney20() {
  const [active, setActive] = useState('A');
  const selected = releases.find((item) => item.id === active) || releases[0];
  const SelectedIcon = selected.icon;

  return (
    <section className="ux2-journey-shell" aria-labelledby="ux2-title">
      <div className="ux2-journey-inner">
        <div className="ux2-journey-heading">
          <div>
            <span className="ux2-eyebrow"><Sparkles size={11} /> Sree Vriddhi UX &amp; Business Journey 2.0</span>
            <h2 id="ux2-title">A simpler path from discovery to human review.</h2>
            <p>Choose a step below to see what it means. Important information stays available without making every page feel lengthy.</p>
          </div>
          <Link className="ux2-primary" to="/eligibility">Start evaluation <ArrowRight size={15} /></Link>
        </div>

        <div className="ux2-journey-rail" role="tablist" aria-label="UX 2.0 journey steps">
          {releases.map(({ id, title, status }) => (
            <button key={id} type="button" role="tab" aria-selected={active === id} className={`ux2-step ${active === id ? 'is-active' : ''}`} onClick={() => setActive(id)}>
              <span className="ux2-step-node">{id}</span>
              <span className="ux2-step-copy"><strong>{title}</strong><small>{status}</small></span>
            </button>
          ))}
        </div>

        <div className="ux2-detail-panel" role="tabpanel">
          <div className="ux2-detail-icon"><SelectedIcon size={22} /></div>
          <div className="ux2-detail-copy">
            <div className="ux2-detail-label">Step {selected.id} · {selected.status}</div>
            <h3>{selected.title}</h3>
            <p>{selected.detail}</p>
          </div>
          <Link className="ux2-detail-link" to={selected.id === 'A' ? '/assets' : selected.id === 'B' ? '/eligibility' : selected.id === 'D' ? '/privacy' : '/'}>
            {selected.id === 'C' ? 'Open AI Assistant' : 'Continue'} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="ux2-trust-strip">
          <div><LockKeyhole size={16} /><span>Public information only</span></div>
          <div><Clock3 size={16} /><span>Human review for sensitive requests</span></div>
          <div><MessageCircle size={16} /><span>Human support available</span></div>
        </div>
      </div>
    </section>
  );
}
