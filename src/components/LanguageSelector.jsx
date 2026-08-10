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

const GOOGLE_LANGS = LANGS.map((item) => item.code).join(',');

function setGoogleLanguageCookie(code) {
  if (code === 'en') {
    document.cookie = 'googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    return;
  }
  document.cookie = `googtrans=/en/${code};path=/`;
}

function triggerGoogleLanguage(code) {
  const combo = document.querySelector('.goog-te-combo');
  if (!combo) return false;
  combo.value = code;
  combo.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
}

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

  // Load Google's page translator once. It translates the rendered DOM, so the
  // same language selection works on every public, portal and admin route.
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate || document.getElementById('google_translate_element')) return;
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: GOOGLE_LANGS,
        autoDisplay: false,
        multilanguagePage: true
      }, 'google_translate_element');
    };

    if (!document.getElementById('google_translate_script')) {
      const script = document.createElement('script');
      script.id = 'google_translate_script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }

    return () => {
      // Keep the Google callback while the application is mounted; the script is global.
      delete window.googleTranslateElementInit;
    };
  }, []);

  useEffect(() => {
    if (language === 'en') return;
    const timer = window.setTimeout(() => {
      triggerGoogleLanguage(language);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [language]);

  const choose = (code) => {
    toggleLanguage(code);
    setGoogleLanguageCookie(code);
    setOpen(false);
    setQuery('');

    // Google Translate changes the current DOM immediately when available.
    // Reloading is the reliable fallback and preserves the current route.
    window.setTimeout(() => {
      const translated = triggerGoogleLanguage(code);
      if (!translated) window.location.reload();
    }, 100);
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <div id="google_translate_element" className="absolute -left-[99999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true" />
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
              aria-label="Search languages"
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
          <div className="border-t border-slate-800 px-2 pt-2 text-[10px] text-slate-500">Google Translate will translate the current page and keep the selected language across routes.</div>
        </div>
      )}
    </div>
  );
}
