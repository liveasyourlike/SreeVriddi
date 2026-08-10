import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Languages, Search } from 'lucide-react';
import { useSreeVriddhi } from '../context/SreeVriddhiContext';

const LANGS = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
];

export default function LanguageSelector({ className = '' }) {
  const { language, toggleLanguage } = useSreeVriddhi();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const selected = LANGS.find((item) => item.code === language) || LANGS[0];
  const filtered = LANGS.filter((item) => `${item.label} ${item.native}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const choose = (code) => {
    toggleLanguage(code);
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${selected.label}`}
        onClick={() => setOpen((value) => !value)}
        className="flex min-w-[142px] items-center justify-between gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-left text-slate-100 shadow-sm transition hover:border-amber-400/70 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
      >
        <span className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-amber-400" />
          <span className="text-xs font-semibold">{selected.native}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-[100] w-64 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 p-2 shadow-2xl ring-1 ring-black/30">
          <div className="mb-2 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-2.5">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search language"
              className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
          <div role="listbox" aria-label="Languages" className="max-h-72 overflow-y-auto">
            {filtered.map((item) => (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={item.code === language}
                onClick={() => choose(item.code)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition ${item.code === language ? 'bg-amber-500/15 text-amber-300' : 'text-slate-200 hover:bg-slate-800'}`}
              >
                <span className="flex flex-col">
                  <span className="text-sm font-semibold">{item.native}</span>
                  <span className="text-[11px] text-slate-500">{item.label}</span>
                </span>
                {item.code === language && <Check className="h-4 w-4 text-amber-400" />}
              </button>
            ))}
            {filtered.length === 0 && <p className="px-3 py-4 text-center text-xs text-slate-500">No language found</p>}
          </div>
          <div className="border-t border-slate-800 px-2 pt-2 text-[10px] text-slate-500">Choose a language to update the site content.</div>
        </div>
      )}
    </div>
  );
}
