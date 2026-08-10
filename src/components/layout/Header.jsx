import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Phone, Sun, Moon, Menu, X, ShieldCheck, Lock, BookOpen } from 'lucide-react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import LanguageSelector from '../LanguageSelector';

const Header = () => {
  const { brandSettings, theme, language, toggleTheme } = useSreeVriddhi();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const t = { banner:'Compliance First: Product structures & returns subject to legal verification and regulatory terms.', whatsapp:'WhatsApp Direct', login:'Login / CRM', eligibility:'Check Eligibility', mobileLogin:'Customer & Admin Portal Login', themeLabel:'Theme' };
  const navLinks = [
    { name:'Home', path:'/' }, { name:'About', path:'/about' }, { name:'How It Works', path:'/how-it-works' }, { name:'Value & Assets', path:'/assets' }, { name:'Products', path:'/products' }, { name:'Eligibility', path:'/eligibility' }, { name:'Why Sree Vriddhi', path:'/why-us' }, { name:'Protection', path:'/protection' }, { name:'Gallery', path:'/gallery' }, { name:'FAQ', path:'/faq' }, { name:'Insights', path:'/insights' }, { name:'Contact', path:'/contact' }
  ];
  const isActive = path => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
  const closeMobile = () => { setMobileMenuOpen(false); setMoreOpen(false); };
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 shadow-2xl">
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 border-b border-amber-500/10 py-1.5 px-3 sm:px-4 text-[10px] sm:text-xs text-slate-300">
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-2 text-center sm:text-left">
          <div className="flex items-center gap-1.5 text-amber-300/90 font-medium leading-4 min-w-0"><ShieldCheck className="w-3.5 h-3.5 shrink-0 text-amber-400" /><span className="break-words">{t.banner}</span></div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0"><a href={`tel:${brandSettings.phone}`} className="hover:text-amber-400 flex items-center gap-1"><Phone className="w-3 h-3 text-amber-400" /><span className="hidden sm:inline">{brandSettings.phone}</span><span className="sm:hidden">Call</span></a><a href={brandSettings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-emerald-600/90 hover:bg-emerald-500 text-white px-2 py-1 rounded-full flex items-center gap-1 font-semibold text-[10px]"><MessageSquare className="w-3 h-3" />WhatsApp</a></div>
        </div>
      </div>
      <div className="container py-2.5 sm:py-3.5 flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink-0" onClick={closeMobile}>
          <img src={brandSettings.logoMark || brandSettings.primaryLogo} alt="Sree Vriddhi Mark" className="h-9 sm:h-10 w-auto max-w-[44px] object-contain shrink-0" />
          <div className="hidden sm:block min-w-0"><div className="font-serif-brand text-xl sm:text-2xl font-bold tracking-widest text-white truncate"><span>SREE</span><span className="text-amber-400">VRIDDHI</span></div><p className="text-[10px] text-amber-200/80 tracking-widest uppercase font-medium truncate">{brandSettings.tagline}</p></div>
        </Link>
        <nav className="hidden lg:flex min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden">
          {navLinks.slice(0,6).map(link => <Link key={link.path} to={link.path} className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-[11px] xl:text-xs font-semibold uppercase whitespace-nowrap ${isActive(link.path)?'bg-amber-500/15 text-amber-300 border border-amber-500/30':'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}>{link.name}</Link>)}
          <div className="relative shrink-0"><button onClick={()=>setMoreOpen(v=>!v)} className="px-2 xl:px-2.5 py-1.5 rounded-lg text-[11px] xl:text-xs font-semibold uppercase whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-800/60">More</button>{moreOpen&&<div className="absolute right-0 mt-2 w-48 max-h-[70vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-lg shadow-lg z-50">{navLinks.slice(6).map(m=><Link key={m.path} to={m.path} onClick={closeMobile} className="block px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-white">{m.name}</Link>)}</div>}</div>
        </nav>
        <div className="hidden lg:flex items-center gap-2 shrink-0 ml-auto"><LanguageSelector className="bg-transparent text-slate-300 max-w-[110px]" /><button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400" title={t.themeLabel} aria-label={t.themeLabel}>{theme==='dark'?<Sun className="w-4 h-4 text-amber-400"/>:theme==='light'?<Moon className="w-4 h-4"/>:<BookOpen className="w-4 h-4 text-amber-400"/>}</button><Link to="/login" className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-300 text-[10px] xl:text-[11px] font-bold uppercase flex items-center gap-1 whitespace-nowrap"><Lock className="w-3.5 h-3.5" />{t.login}</Link><Link to="/eligibility" className="px-2.5 xl:px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 text-[10px] xl:text-xs font-extrabold uppercase whitespace-nowrap">{t.eligibility}</Link></div>
        <div className="lg:hidden ml-auto flex items-center gap-1.5 shrink-0"><LanguageSelector className="bg-slate-900 text-slate-200 border border-slate-700 max-w-[92px]" /><button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300" title={t.themeLabel} aria-label={t.themeLabel}>{theme==='dark'?<Sun className="w-4 h-4 text-amber-400"/>:theme==='light'?<Moon className="w-4 h-4"/>:<BookOpen className="w-4 h-4 text-amber-400"/>}</button><button onClick={()=>setMobileMenuOpen(v=>!v)} className="p-2 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-400" aria-label={mobileMenuOpen?'Close menu':'Open menu'}>{mobileMenuOpen?<X className="w-5 h-5"/>:<Menu className="w-5 h-5"/>}</button></div>
      </div>
      {mobileMenuOpen&&<div className="lg:hidden bg-slate-950 border-b border-amber-500/20 px-3 sm:px-4 pt-2 pb-5 max-h-[calc(100vh-80px)] overflow-y-auto"><div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 gap-2 mb-3">{navLinks.map(link=><Link key={link.path} to={link.path} onClick={closeMobile} className={`p-2.5 rounded-lg text-[11px] sm:text-xs font-semibold ${isActive(link.path)?'bg-amber-500/20 text-amber-300 border border-amber-500/30':'text-slate-300 bg-slate-900/60'}`}>{link.name}</Link>)}</div><div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2"><Link to="/login" onClick={closeMobile} className="py-2.5 rounded-lg bg-slate-900 text-amber-300 border border-amber-500/30 text-xs font-bold text-center">{t.mobileLogin}</Link><Link to="/eligibility" onClick={closeMobile} className="py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 font-extrabold text-xs text-center">{t.eligibility}</Link></div></div>}
    </header>
  );
};
export default Header;
