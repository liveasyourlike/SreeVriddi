import React, { useEffect, useState } from 'react';

const API_BASE = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE ? import.meta.env.VITE_API_BASE.replace(/\/$/, '') : '';

export default function LiveMarketTable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/market/live`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      setData(j);
      setError('');
    } catch (e) {
      console.warn('market fetch failed', e);
      setError('Live market service is unavailable.');
    } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  if (!data) return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
      <div className="flex items-center justify-between gap-3"><span>{loading ? 'Loading market data...' : error}</span><button onClick={fetchData} className="rounded-lg border border-slate-700 px-3 py-1 text-xs text-amber-300">Retry</button></div>
    </div>
  );

  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
      <div className="flex items-center justify-between mb-3"><h4 className="text-sm font-bold text-amber-300">Live Market Rates</h4><span className="text-xs text-slate-400">Source: {data.source}</span></div>
      <table className="w-full text-sm"><tbody>
        <tr className="border-t border-slate-800"><td className="py-2 text-slate-400">USD → INR</td><td className="py-2 text-right font-bold text-white">{data.usdInr ?? 'N/A'}</td></tr>
        <tr className="border-t border-slate-800"><td className="py-2 text-slate-400">Gold (10g) — Hyderabad</td><td className="py-2 text-right font-bold text-white">₹{data.goldPer10gInr_hyderabad ?? 'N/A'}</td></tr>
        <tr className="border-t border-slate-800"><td className="py-2 text-slate-400">Gold (10g) — Telangana (avg)</td><td className="py-2 text-right font-bold text-white">₹{data.goldPer10gInr_telangana_avg ?? 'N/A'}</td></tr>
        <tr className="border-t border-slate-800"><td className="py-2 text-slate-400">Last Updated</td><td className="py-2 text-right text-xs text-slate-400">{data.fetchedAt ? new Date(data.fetchedAt).toLocaleString() : 'N/A'}</td></tr>
      </tbody></table>
      <button onClick={fetchData} disabled={loading} className="mt-3 rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-amber-400 disabled:opacity-50">{loading ? 'Refreshing…' : 'Refresh now'}</button>
    </div>
  );
}
