import { Mail, MessageSquare, Phone } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useSreeVriddhi } from '../context/SreeVriddhiContext'
import LanguageSelector from './LanguageSelector'

export default function PersistentExperienceDock() {
  const { brandSettings, theme, toggleTheme } = useSreeVriddhi()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <aside className="fixed bottom-24 right-4 z-[85] hidden sm:block" aria-label="Sree Vriddhi contact information">
        <div className="group relative [perspective:1000px]">
          <div className="absolute -inset-3 rounded-[2rem] bg-amber-400/10 blur-xl transition duration-500 group-hover:bg-amber-400/20" />
          <div className="relative overflow-hidden rounded-[1.6rem] border border-amber-300/25 bg-[#07101f]/95 p-3 shadow-[0_25px_80px_rgba(0,0,0,.5)] backdrop-blur-xl transition duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(3deg)_rotateY(-4deg)_translateY(-3px)]">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl border border-amber-300/30 bg-amber-300/10 text-amber-300"><Phone size={15} /></div>
              <div><p className="text-[8px] font-black uppercase tracking-[.2em] text-amber-300">Sree Vriddhi</p><p className="text-[10px] text-slate-500">Connect directly</p></div>
            </div>
            <div className="mt-2 grid gap-1.5 text-[10px]">
              <a href={`tel:${brandSettings.phone}`} className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-slate-200 hover:bg-amber-300/10 hover:text-amber-200"><Phone size={12} className="text-amber-300" />{brandSettings.phone}</a>
              <a href={`mailto:${brandSettings.email}`} className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-slate-200 hover:bg-amber-300/10 hover:text-amber-200"><Mail size={12} className="text-amber-300" />{brandSettings.email}</a>
              <a href={brandSettings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-emerald-300 hover:bg-emerald-400/10"><MessageSquare size={12} />WhatsApp</a>
            </div>
          </div>
        </div>
      </aside>

      {isHome && (
        <div className="fixed left-4 top-4 z-[86] flex items-center gap-2 sm:left-auto sm:right-4" aria-label="Sree Vriddhi display controls">
          <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-1.5 shadow-2xl backdrop-blur-xl"><LanguageSelector className="bg-transparent text-slate-200" /></div>
          <button type="button" onClick={toggleTheme} className="grid h-10 min-w-10 place-items-center rounded-2xl border border-amber-300/20 bg-slate-950/85 px-3 text-[9px] font-black uppercase tracking-[.12em] text-amber-200 shadow-2xl backdrop-blur-xl hover:border-amber-300/50" title={`Display mode: ${theme}`} aria-label={`Display mode: ${theme}`}>{theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'Reading'}</button>
        </div>
      )}
    </>
  )
}
