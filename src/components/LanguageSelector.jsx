import React from 'react';
import { useSreeVriddhi } from '../context/SreeVriddhiContext';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', label: 'മലയാളം (Malayalam)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' }
];

export default function LanguageSelector({ className = '' }) {
  const { language, toggleLanguage } = useSreeVriddhi();

  return (
    <select
      aria-label="Choose language"
      value={language}
      onChange={(e) => toggleLanguage(e.target.value)}
      className={`bg-transparent border border-amber-300 text-amber-50 px-2 py-1 rounded ${className}`}
    >
      {LANGS.map(l => (
        <option key={l.code} value={l.code}>{l.label}</option>
      ))}
    </select>
  );
}
