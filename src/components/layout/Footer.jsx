import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bot, FileCheck2, FileText, HelpCircle, LockKeyhole, Mail, MessageSquare, Phone, ShieldAlert, UserRound } from 'lucide-react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';

const SUPPORT_EMAIL = 'sreevriddhiforwealth@gmail.com';

const actions = [
  { label: 'Check Eligibility', note: 'Start your evaluation', path: '/eligibility', icon: FileCheck2 },
  { label: 'Ask Sree Vriddhi AI', note: 'Get guided answers', action: 'chat', icon: Bot },
  { label: 'Contact Sree Vriddhi', note: 'Talk to our team', path: '/contact', icon: MessageSquare },
  { label: 'Customer Portal', note: 'Access your workspace', path: '/portal', icon: UserRound },
  { label: 'Customer Grievance', note: 'Raise a concern', path: '/grievances', icon: ShieldAlert },
  { label: 'Frequently Asked Questions', note: 'Find quick answers', path: '/faq', icon: HelpCircle },
];

const legal = [
  ['Customer Risk & Policy Acknowledgement', '/terms', FileText],
  ['Privacy & Data Use', '/privacy', LockKeyhole],
];

const Footer = () => {
  const { brandSettings } = useSreeVriddhi();

  const ActionCard = ({ item }) => {
    const Icon = item.icon;
    const className = 'group relative min-h-[104px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-950 to-[#02050b] p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:shadow-[0_20px_55px_rgba(0,0,0,.38)]';
    const content = <><span className="absolute -right-7 -top-7 h-20 w-20 rounded-full border border-amber-300/10 transition duration-500 group-hover:scale-150 group-hover:rotate-45"/><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-xl border border-amber-300/20 bg-amber-300/10 text-amber-300"><Icon size={16}/></span><ArrowUpRight size={14} className="text-slate-600 transition group-hover:text-amber-300"/></div><div><span className="block text-xs font-bold text-slate-100 group-hover:text-amber-200">{item.label}</span><span className="mt-1 block text-[10px] text-slate-500">{item.note}</span></div></div></>;
    if (item.action === 'chat') return <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent('sv-open-chat'))}>{content}</button>;
    return <Link to={item.path} className={className}>{content}</Link>;
  };

  return <footer className="relative z-30 overflow-hidden border-t border-amber-500/20 bg-[#02050b] text-slate-300">
    <div className="pointer-events-none absolute inset-0 opacity-50"><div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-amber-400/5 blur-3xl"/><div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl"/></div>
    <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[.24em] text-amber-300"><span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,.8)]"/> Sree Vriddhi / Action Centre</div>
          <h2 className="font-serif-brand text-3xl font-bold leading-tight text-white md:text-4xl">What do you need to do next?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">This footer is intentionally not another website menu. Use it for actions, support, customer access and policy information after you have finished exploring a section.</p>
        </div>
        <div className="rounded-3xl border border-amber-300/15 bg-gradient-to-br from-amber-300/[0.08] to-slate-900/70 p-5"><div className="flex items-center gap-4"><div className="grid h-14 w-28 shrink-0 place-items-center overflow-hidden rounded-2xl border border-amber-300/30 bg-slate-950/80 shadow-[0_0_35px_rgba(212,175,55,.12)]"><img src={brandSettings.primaryLogo || '/brand/logo-primary.jpeg'} alt="Sree Vriddhi logo" className="h-12 w-24 object-contain"/></div><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-amber-300">CONNECT WITH SREE VRIDDHI</p><h3 className="mt-1 text-lg font-bold text-white">Human support when you need it.</h3><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400"><a href={`tel:${brandSettings.phone}`} className="inline-flex items-center gap-2 hover:text-amber-300"><Phone size={13} className="text-amber-300"/>{brandSettings.phone}</a><a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-2 hover:text-amber-300"><Mail size={13} className="text-amber-300"/>{SUPPORT_EMAIL}</a></div></div></div></div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{actions.map((item) => <ActionCard key={item.label} item={item}/>)}</div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-5"><p className="text-[10px] font-black uppercase tracking-[.22em] text-slate-500">POLICY & CUSTOMER AWARENESS</p><p className="mt-2 max-w-3xl text-xs leading-5 text-slate-400">Before submitting details or proceeding with any business participation, review the Customer Risk & Policy Acknowledgement and Privacy & Data Use information.</p><div className="mt-4 flex flex-wrap gap-2">{legal.map(([label,path,Icon]) => <Link key={path} to={path} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-[11px] font-bold text-slate-300 transition hover:border-amber-300/30 hover:text-amber-200"><Icon size={13}/>{label}</Link>)}</div></div>
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-3xl border border-white/10 bg-slate-900/50 p-5"><a href={brandSettings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/90 px-4 py-3 text-xs font-black text-white hover:bg-emerald-500"><MessageSquare size={15}/> WhatsApp</a><Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-xs font-bold text-amber-200 hover:bg-amber-300/20">Sree Vriddhi Home <ArrowUpRight size={14}/></Link></div>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-white/5 pt-5 text-[10px] text-slate-600 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Sree Vriddhi Value Management</span><span>Commercial terms remain subject to verification, risk assessment, formal approval and the applicable written agreement.</span></div>
    </div>
  </footer>;
};
export default Footer;
