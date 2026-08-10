import React, { useEffect, useState } from 'react';
const API_BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE ? import.meta.env.VITE_API_BASE : 'http://localhost:4000';

export default function AdminTranslations() {
  const [translations, setTranslations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const r = await fetch(`${API_BASE}/api/translations`);
        const j = await r.json();
        if (!mounted) return;
        setTranslations(j.translations || {});
      } catch (e) { console.warn(e); }
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6">Loading translations...</div>;
  if (!translations) return <div className="p-6">No translations available.</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Translations (read-only in test mode)</h2>
      <pre className="bg-slate-900 p-4 rounded text-sm overflow-auto" style={{maxHeight: '60vh'}}>{JSON.stringify(translations, null, 2)}</pre>
    </div>
  );
}
