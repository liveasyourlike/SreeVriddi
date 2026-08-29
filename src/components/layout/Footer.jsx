import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, LockKeyhole, Mail, MessageSquare, Phone } from 'lucide-react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';

const SUPPORT_EMAIL = 'sreevriddhiforwealth@gmail.com';
const SUPPORT_PHONE = '+91 9640352929';
const WHATSAPP = 'https://wa.me/919640352929';

const Footer = () => {
  const { brandSettings } = useSreeVriddhi();

  return (
    <footer className="relative z-30 overflow-hidden border-t border-amber-500/20 bg-[#02050b] text-slate-300">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-amber-400/5 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-3 text-[10px] font-black uppercase tracking-[.24em] text-amber-300">Sree Vriddhi</div>
            <h2 className="font-serif-brand text-2xl font-bold leading-tight text-white md:text-3xl">Your Value. Our Responsibility. Your Returns.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Have a question about an eligible asset or the evaluation process? Speak with Sree Vriddhi directly.</p>
          </div>
          <div className="relative rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/[0.10] via-slate-950/90 to-slate-900/70 p-5 shadow-[0_25px_70px_rgba(0,0,0,.35)] [transform-style:preserve-3d] transition-transform duration-500 hover:[transform:perspective(900px)_rotateX(3deg)_rotateY(-3deg)]">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-28 shrink-0 place-items-center overflow-hidden rounded-2xl border border-amber-300/30 bg-slate-950/90 shadow-[0_0_35px_rgba(212,175,55,.12)]">
                <img src={brandSettings.primaryLogo || '/brand/logo-primary.jpeg'} alt="Sree Vriddhi logo" className="h-14 w-24 object-contain" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.22em] text-amber-300">Contact</p>
                <div className="mt-2 grid gap-1.5 text-xs text-slate-300">
                  <a href={`tel:${SUPPORT_PHONE}`} className="inline-flex items-center gap-2 hover:text-amber-300"><Phone size={13} className="text-amber-300" />{SUPPORT_PHONE}</a>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-2 hover:text-amber-300"><Mail size={13} className="text-amber-300" />{SUPPORT_EMAIL}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link to="/terms" className="group relative min-h-[126px] overflow-hidden rounded-[1.75rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/[0.09] via-slate-950 to-slate-900 p-5 shadow-[0_20px_60px_rgba(0,0,0,.28)] transition duration-500 hover:-translate-y-1 hover:border-amber-300/50">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-amber-300/10 transition duration-700 group-hover:scale-150 group-hover:rotate-45" />
            <div className="relative flex h-full items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-300 shadow-inner"><FileText size={20} /></span>
              <div><span className="text-[9px] font-black uppercase tracking-[.2em] text-amber-400">01 / CUSTOMER AWARENESS</span><h3 className="mt-2 text-base font-extrabold text-white group-hover:text-amber-200">Customer Risk &amp; Policy Acknowledgement</h3><p className="mt-1 text-[11px] leading-5 text-slate-400">Review the business terms, risks and return conditions before submitting an enquiry.</p></div>
            </div>
          </Link>
          <Link to="/privacy" className="group relative min-h-[126px] overflow-hidden rounded-[1.75rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.06] via-slate-950 to-slate-900 p-5 shadow-[0_20px_60px_rgba(0,0,0,.28)] transition duration-500 hover:-translate-y-1 hover:border-cyan-300/40">
            <div className="absolute -right-10 -bottom-10 h-28 w-28 rounded-full border border-cyan-300/10 transition duration-700 group-hover:scale-150" />
            <div className="relative flex h-full items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-inner"><LockKeyhole size={20} /></span>
              <div><span className="text-[9px] font-black uppercase tracking-[.2em] text-cyan-300">02 / PRIVACY &amp; DATA</span><h3 className="mt-2 text-base font-extrabold text-white group-hover:text-cyan-200">Privacy Policy</h3><p className="mt-1 text-[11px] leading-5 text-slate-400">See what information is collected, why it is used and how it is handled.</p></div>
            </div>
          </Link>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-white/5 pt-5 text-[10px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Sree Vriddhi Value Management</span>
          <span className="inline-flex items-center gap-3"><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300"><MessageSquare size={13} className="inline mr-1" />WhatsApp</a><a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-amber-300">Email</a></span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
