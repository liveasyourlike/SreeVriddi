import React from 'react';
import { Bot, ClipboardCheck, Home, Menu, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MobileJourneyBar() {
  return (
    <nav className="ux2-mobile-bar" aria-label="Primary mobile actions">
      <Link to="/" aria-label="Home"><Home size={17} /><span>Home</span></Link>
      <Link to="/assets" aria-label="Explore opportunities"><Menu size={17} /><span>Explore</span></Link>
      <Link to="/eligibility" className="ux2-mobile-primary" aria-label="Start preliminary evaluation"><ClipboardCheck size={18} /><span>Evaluate</span></Link>
      <a href="https://wa.me/919640352929" target="_blank" rel="noreferrer" aria-label="WhatsApp support"><MessageCircle size={17} /><span>Human</span></a>
      <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('sreevriddhi:open-ai'))} aria-label="Open AI assistant"><Bot size={17} /><span>AI</span></button>
    </nav>
  );
}
