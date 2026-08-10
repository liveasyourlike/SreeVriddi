import { useSreeVriddhi } from '../context/SreeVriddhiContext';

const API_BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE ? import.meta.env.VITE_API_BASE : 'http://localhost:4000';

export async function translateText(text, targetLang) {
  // Basic cache key
  const key = `sv_trans_${targetLang}_${text.slice(0,120)}`;
  try {
    const cached = localStorage.getItem(key);
    if (cached) return JSON.parse(cached);
  } catch (e) {}

  const res = await fetch(`${API_BASE}/api/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, targetLang })
  });
  if (!res.ok) throw new Error('Translation failed');
  const data = await res.json();
  try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) {}
  return data;
}

export default function useTranslator() {
  const { language } = useSreeVriddhi();

  const translate = async (text) => {
    if (!text) return '';
    if (!language || language === 'en') return text;
    try {
      const { translated } = await translateText(text, language);
      return translated || text;
    } catch (e) {
      console.warn('Translation error', e);
      return text;
    }
  };

  return { language, translate };
}
