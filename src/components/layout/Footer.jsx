import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MessageSquare, ArrowUpRight, LockKeyhole, FileText, Sparkles, Gem, WalletCards, FileCheck2, Building2, CircleHelp, Landmark, Globe2 } from 'lucide-react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';

const SUPPORT_EMAIL = 'sreevriddhiforwealth@gmail.com';
const nav = [
  ['About Sree Vriddhi','/about',Globe2], ['How It Works','/how-it-works',Sparkles], ['Value & Assets','/assets',Gem], ['Products','/products',WalletCards],
  ['Eligibility','/eligibility',FileCheck2], ['Why Sree Vriddhi','/why-us',Shield], ['Protection','/protection',Landmark], ['Gallery','/gallery',Building2],
  ['Insights','/insights',CircleHelp], ['FAQ','/faq',CircleHelp], ['Contact','/contact',MessageSquare], ['Customer Grievance','/grievances',Shield],
];

const Footer = () => {
  const { brandSettings } = useSreeVriddhi();
  return <footer className="relative z-30 overflow-hidden border-t border-amber-500/20 bg-[#030711] text-slate-300">
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div><div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[.24em] text-amber-300"><Sparkles size={14}/> Navigate Sree Vriddhi</div><h2 className="font-serif-brand text-3xl font-bold text-white md:text-4xl">Everything, one interactive footer.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Use the 3D navigation tiles below to move directly to any section. Connect with Sree Vriddhi when you need a human conversation.</p></div>
        <Link to="/" className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-xs font-black uppercase tracking-wider text-amber-200 hover:bg-amber-300/20">Back to Sree Vriddhi Home <ArrowUpRight size={15}/></Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {nav.map(([label,path,Icon], i) => <Link key={path} to={path} className="group relative min-h-[112px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/95 to-slate-950 p-4 transition duration-300 hover:-translate-y-1 hover:rotate-[.4deg] hover:border-amber-300/40 hover:shadow-[0_18px_50px_rgba(0,0,0,.35)]"><div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-amber-300/10 transition duration-500 group-hover:scale-125 group-hover:rotate-45"/><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-xl border border-amber-300/20 bg-amber-300/10 text-amber-300 shadow-[0_0_25px_rgba(212,175,55,.08)]"><Icon size={16}/></span><span className="text-[9px] font-black text-slate-600">{String(i+1).padStart(2,'0')}</span></div><span className="text-xs font-bold text-slate-200 transition group-hover:text-amber-200">{label}</span></div></Link>)}
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_auto]">
        <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-amber-300/[0.08] to-slate-900/70 p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-amber-300/30 bg-slate-950/70 shadow-[0_0_40px_rgba(212,175,55,.12)]"><img src={brandSettings.logoMark || brandSettings.primaryLogo} alt="Sree Vriddhi logo" className="h-12 w-12 object-contain"/></div><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-amber-300">CONNECT WITH SREE VRIDDHI</p><h3 className="mt-1 text-xl font-bold text-white">Questions? Start a direct conversation.</h3><div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400"><a href={`tel:${brandSettings.phone}`} className="inline-flex items-center gap-2 hover:text-amber-300"><Phone size={14} className="text-amber-300"/>{brandSettings.phone}</a><a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-2 hover:text-amber-300"><Mail size={14} className="text-amber-300"/>{SUPPORT_EMAIL}</a></div></div></div></div>
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-3xl border border-white/10 bg-slate-900/70 p-5"><a href={brandSettings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/90 px-4 py-3 text-xs font-black text-white hover:bg-emerald-500"><MessageSquare size={15}/> WhatsApp</a><Link to="/terms" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs font-bold hover:border-amber-300/30 hover:text-amber-200"><FileText size={14}/> Terms</Link><Link to="/privacy" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs font-bold hover:border-amber-300/30 hover:text-amber-200"><LockKeyhole size={14}/> Privacy</Link></div>
      </div>
      <div className="mt-8 flex flex-col gap-2 border-t border-white/5 pt-5 text-[10px] text-slate-600 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Sree Vriddhi Value Management</span><span>Commercial terms remain subject to verification, risk assessment, formal approval and the applicable written agreement.</span></div>
    </div>
  </footer>;
};
export default Footer;
