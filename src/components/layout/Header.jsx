import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Phone, Sun, Moon, Menu, X, ShieldCheck, BookOpen, ChevronDown } from 'lucide-react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import LanguageSelector from '../LanguageSelector';

const Header = () => {
  const { brandSettings, theme, language, toggleTheme } = useSreeVriddhi();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const translations = {
    en: { banner: 'Compliance First: Product structures & returns subject to legal verification and regulatory terms.', whatsapp: 'WhatsApp Direct', eligibility: 'Check Eligibility', themeLabel: 'Theme' },
    hi: { banner: 'अनुपालन प्रथम: उत्पाद संरचनाएँ और रिटर्न कानूनी सत्यापन एवं नियमों के अधीन हैं।', whatsapp: 'व्हाट्सएप डायरेक्ट', eligibility: 'पात्रता जांचें', themeLabel: 'थीम' },
    te: { banner: 'క్రమబద్ధత మొదట: ఉత్పత్తి నిర్మాణాలు మరియు రిటర్న్లు చట్టపరమైన ధృవీకరణకు లోబడి ఉంటాయి.', whatsapp: 'వాట్సాప్ డైరెక్ట్', eligibility: 'అర్హత తనిఖీ', themeLabel: 'థీమ్' }
  };
  const t = translations[language] || translations.en;
  const navLinks = [
    { name: language === 'hi' ? 'होम' : language === 'te' ? 'హోమ్' : 'Home', path: '/' },
    { name: language === 'hi' ? 'हमारे बारे में' : language === 'te' ? 'మా గురించి' : 'About', path: '/about' },
    { name: language === 'hi' ? 'यह कैसे काम करता है' : language === 'te' ? 'ఇది ఎలా పని చేస్తుంది' : 'How It Works', path: '/how-it-works' },
    { name: language === 'hi' ? 'मूल्य और परिसंपत्तियाँ' : language === 'te' ? 'విలువ మరియు ఆస్తులు' : 'Value & Assets', path: '/assets' },
    { name: language === 'hi' ? 'उत्पाद' : language === 'te' ? 'ఉత్పత్తులు' : 'Products', path: '/products' },
    { name: language === 'hi' ? 'पात्रता' : language === 'te' ? 'అర్హత' : 'Eligibility', path: '/eligibility' },
    { name: language === 'hi' ? 'स्री व्रिद्धी क्यों' : language === 'te' ? 'Sree Vriddhi ఎందుకు' : 'Why Sree Vriddhi', path: '/why-us' },
    { name: language === 'hi' ? 'सुरक्षा' : language === 'te' ? 'రక్షణ' : 'Protection', path: '/protection' },
    { name: language === 'hi' ? 'गैलरी' : language === 'te' ? 'గ్యాలరీ' : 'Gallery', path: '/gallery' },
    { name: 'FAQ', path: '/faq' },
    { name: language === 'hi' ? 'अंतर्दृष्टियाँ' : language === 'te' ? 'ఇన్‌సైట్స్' : 'Insights', path: '/insights' },
    { name: language === 'hi' ? 'संपर्क' : language === 'te' ? 'సంపర్కం' : 'Contact', path: '/contact' }
  ];
  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
  useEffect(() => {
    const close = (event) => { if (moreRef.current && !moreRef.current.contains(event.target)) setMoreOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);
  useEffect(() => { setMoreOpen(false); }, [location.pathname]);

  return (
    <header className="sticky top-0 z-[90] bg-slate-950/95 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl">
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 border-b border-amber-500/10 py-1 px-3 sm:px-4 text-[10px] sm:text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-1.5">
          <div className="flex items-center gap-1.5 text-amber-300/90 font-medium min-w-0"><ShieldCheck className="w-3.5 h-3.5 shrink-0 text-amber-400" /><span className="truncate">{t.banner}</span></div>
          <div className="hidden sm:flex items-center gap-3 shrink-0"><a href={`tel:${brandSettings.phone}`} className="hover:text-amber-400 transition-colors flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-amber-400" /><span>{brandSettings.phone}</span></a><a href={brandSettings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-emerald-600/90 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold transition-all text-[10px] shadow-sm"><MessageSquare className="w-3 h-3" /><span>{t.whatsapp}</span></a></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group min-w-0">
          <img src={brandSettings.logoMark || brandSettings.primaryLogo} alt="Sree Vriddhi logo" className="h-9 object-contain block sm:hidden" />
          <img src={brandSettings.primaryLogo || brandSettings.logoMark} alt="Sree Vriddhi logo" className="h-9 object-contain hidden sm:block" />
          <div className="hidden sm:block min-w-0"><div className="font-serif-brand text-lg sm:text-xl font-bold tracking-[.08em] text-white">Sree <span className="text-amber-400">Vriddhi</span></div><p className="text-[9px] text-amber-200/80 tracking-widest uppercase font-medium truncate">{brandSettings.tagline}</p></div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.slice(0, 6).map((link) => <Link key={link.path} to={link.path} className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${isActive(link.path) ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}>{link.name}</Link>)}
          {navLinks.length > 6 && <div ref={moreRef} className="relative z-[100]"><button type="button" aria-haspopup="menu" aria-expanded={moreOpen} onClick={() => setMoreOpen((value) => !value)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-white border border-transparent hover:border-amber-500/30 hover:bg-slate-800/80">More <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180 text-amber-400' : ''}`} /></button>{moreOpen && <div role="menu" className="absolute right-0 top-[calc(100%+10px)] w-64 rounded-2xl border border-amber-500/30 bg-[#07101f] shadow-[0_25px_70px_rgba(0,0,0,.65)] ring-1 ring-white/10 overflow-hidden z-[200] p-2"><div className="px-3 py-2 text-[9px] font-black tracking-[.16em] text-amber-400 border-b border-slate-800 mb-1">EXPLORE SREE VRIDDHI</div>{navLinks.slice(6).map((m) => <Link role="menuitem" key={m.path} to={m.path} onClick={() => setMoreOpen(false)} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-100 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"><span>{m.name}</span><span className="text-slate-600">→</span></Link>)}</div>}</div>}
        </nav>
        <div className="hidden lg:flex items-center gap-2.5"><LanguageSelector className="bg-transparent text-slate-300" /><button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400 transition-colors" title={t.themeLabel} aria-label={t.themeLabel}>{theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : theme === 'light' ? <Moon className="w-4 h-4 text-slate-300" /> : <BookOpen className="w-4 h-4 text-amber-400" />}</button><Link to="/eligibility" className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all">{t.eligibility}</Link></div>
        <div className="lg:hidden flex items-center gap-2"><a href={brandSettings.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={t.whatsapp} className="p-2 rounded-lg bg-emerald-600/15 border border-emerald-500/30 text-emerald-300"><MessageSquare className="w-4 h-4" /></a><button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} className="p-2 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-400">{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button></div>
      </div>
      {mobileMenuOpen && <div className="lg:hidden bg-slate-950 border-b border-amber-500/20 px-3 pt-2 pb-4 space-y-3 max-h-[75vh] overflow-y-auto"><div className="grid grid-cols-2 gap-1.5">{navLinks.map((link) => <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} className={`p-2 rounded-lg text-[11px] font-semibold tracking-wide transition-all ${isActive(link.path) ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'}`}>{link.name}</Link>)}</div><div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 items-center"><div className="min-w-0"><LanguageSelector className="w-full bg-slate-900 text-slate-200" /></div><button onClick={toggleTheme} className="w-full py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 flex items-center justify-center gap-2 text-xs" title={t.themeLabel}>{theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : theme === 'light' ? <Moon className="w-4 h-4" /> : <BookOpen className="w-4 h-4 text-amber-400" />} {t.themeLabel}</button></div><Link to="/eligibility" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 font-extrabold text-[11px] text-center shadow-lg">{t.eligibility}</Link></div>}
    </header>
  );
};
export default Header;
