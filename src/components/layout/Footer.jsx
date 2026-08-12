import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Shield, Phone, Mail, MessageSquare, ArrowUpRight, Scale, Lock, ChevronUp, ChevronDown, X } from 'lucide-react';

const SUPPORT_EMAIL = 'sreevriddhiforwealth@gmail.com';
const POPUP_INTERVAL_MS = 5 * 60 * 1000;
const POPUP_VISIBLE_MS = 15000;

const Footer = () => {
  const { brandSettings } = useSreeVriddhi();
  const [expanded, setExpanded] = useState(false);
  const [autoOpened, setAutoOpened] = useState(false);

  useEffect(() => {
    const openPopup = () => {
      setExpanded(true);
      setAutoOpened(true);
      window.setTimeout(() => {
        setExpanded(false);
        setAutoOpened(false);
      }, POPUP_VISIBLE_MS);
    };

    const interval = window.setInterval(openPopup, POPUP_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, []);

  const collapse = () => {
    setExpanded(false);
    setAutoOpened(false);
  };

  return (
    <>
      {/* Compact footer keeps every page short; the full footer is an overlay instead of document-height content. */}
      <footer className="bg-slate-950 border-t border-amber-500/20 text-slate-400 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-14 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px]">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="font-serif-brand font-bold tracking-widest text-white whitespace-nowrap">SREE <span className="text-amber-400">VRIDDHI</span></Link>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="truncate">© {new Date().getFullYear()} Sree Vriddhi Value Management</span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-4">
            <a href={`tel:${brandSettings.phone}`} className="hidden md:inline hover:text-amber-400">{brandSettings.phone}</a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hidden lg:inline hover:text-amber-400">{SUPPORT_EMAIL}</a>
            <Link to="/faq" className="hidden sm:inline hover:text-amber-400">Terms & Privacy</Link>
            <button
              type="button"
              onClick={() => { setExpanded((value) => !value); setAutoOpened(false); }}
              aria-expanded={expanded}
              aria-controls="sree-vriddhi-footer-panel"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-slate-900 px-3 py-1.5 text-amber-200 hover:bg-slate-800 hover:text-amber-300 transition-colors font-semibold"
            >
              {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              More
            </button>
          </div>
        </div>
      </footer>

      {expanded && (
        <div id="sree-vriddhi-footer-panel" className="fixed inset-x-0 bottom-3 z-[80] px-3 sm:px-5 pointer-events-none" role="dialog" aria-label="Sree Vriddhi quick information">
          <div className="pointer-events-auto max-w-6xl mx-auto rounded-2xl border border-amber-500/20 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-white"><Shield className="w-4 h-4 text-amber-400" /> Sree Vriddhi Quick Access</div>
              <button type="button" onClick={collapse} aria-label="Collapse footer" className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="space-y-2">
                <Link to="/about" onClick={collapse} className="block hover:text-amber-400">About Sree Vriddhi</Link>
                <Link to="/how-it-works" onClick={collapse} className="block hover:text-amber-400">How It Works</Link>
                <Link to="/assets" onClick={collapse} className="block hover:text-amber-400">Eligible Asset Categories</Link>
                <Link to="/products" onClick={collapse} className="block hover:text-amber-400">Products</Link>
                <Link to="/eligibility" onClick={collapse} className="block hover:text-amber-400">10-Point Evaluation</Link>
              </div>

              <div className="space-y-2">
                <Link to="/why-us" onClick={collapse} className="block hover:text-amber-400">Why Choose Us</Link>
                <Link to="/protection" onClick={collapse} className="block hover:text-amber-400">How We Protect Value</Link>
                <Link to="/gallery" onClick={collapse} className="block hover:text-amber-400">Corporate Gallery</Link>
                <Link to="/insights" onClick={collapse} className="block hover:text-amber-400">Knowledge & Insights</Link>
                <Link to="/faq" onClick={collapse} className="block hover:text-amber-400">FAQs</Link>
              </div>

              <div className="space-y-2">
                <Link to="/grievances" onClick={collapse} className="block font-semibold text-amber-300 hover:text-amber-400">Customer Grievance Portal</Link>
                <Link to="/contact" onClick={collapse} className="block hover:text-amber-400">Contact Us</Link>
                <Link to="/portal" onClick={collapse} className="block p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40"><span className="font-semibold text-white flex items-center justify-between">Customer Portal <ArrowUpRight className="w-3 h-3" /></span><span className="text-[10px] text-slate-500">Track applications & settlements</span></Link>
                <Link to="/admin" onClick={collapse} className="block p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40"><span className="font-semibold text-white flex items-center justify-between">Admin & CRM <ArrowUpRight className="w-3 h-3" /></span><span className="text-[10px] text-slate-500">Management access</span></Link>
              </div>

              <div className="space-y-3">
                <a href={brandSettings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold transition-colors"><MessageSquare className="w-4 h-4" /> WhatsApp</a>
                <div className="space-y-1.5 text-slate-300">
                  <a href={`tel:${brandSettings.phone}`} className="flex items-center gap-2 hover:text-amber-400"><Phone className="w-3.5 h-3.5 text-amber-400" /> {brandSettings.phone}</a>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-2 hover:text-amber-400 break-all"><Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" /> {SUPPORT_EMAIL}</a>
                </div>
                <div className="text-[10px] text-slate-500 leading-relaxed border-t border-slate-800 pt-2">Commercial terms are subject to formal approval and the legally binding agreement. Submitted assets remain subject to verification, valuation, risk assessment and legal eligibility.</div>
              </div>
            </div>

            {autoOpened && <div className="px-4 pb-2 text-[10px] text-slate-600 text-right">Quick information will collapse automatically.</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
