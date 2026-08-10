import React, { useEffect, useState } from 'react';

const API_BASE = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE ? import.meta.env.VITE_API_BASE.replace(/\/$/, '') : '';

const money = value => {
  if (!Number.isFinite(Number(value))) return 'N/A';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value));
};

export default function LiveMarketTable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/market/live`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Market data unavailable');
      setData(json);
      setError('');
    } catch (e) {
      console.warn('market fetch failed', e);
      setError('Live market service is unavailable.');
    } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 30 * 1000);
    return () => clearInterval(id);
  }, []);

  if (!data) return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
      <div className="flex items-center justify-between gap-3"><span>{loading ? 'Loading live market data…' : error}</span><button onClick={fetchData} className="rounded-lg border border-slate-700 px-3 py-1 text-xs text-amber-300">Retry</button></div>
    </div>
  );

  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div><h4 className="text-sm font-bold text-amber-300">Live Market Rates</h4><p className="text-[10px] text-slate-500">International spot-equivalent benchmark — all gold values shown in INR.</p></div>
        <span className="text-[10px] text-slate-500">{data.source}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm"><thead><tr className="border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-500"><th className="py-2 text-left font-semibold">Market</th><th className="py-2 text-right font-semibold">Live value</th><th className="py-2 text-right font-semibold">Unit</th></tr></thead>
          <tbody>
            <tr className="border-b border-slate-800/80"><td className="py-3 text-slate-300">USD / INR</td><td className="py-3 text-right font-bold text-white">₹{Number(data.usdInr).toFixed(4)}</td><td className="py-3 text-right text-xs text-slate-500">INR per USD</td></tr>
            <tr className="border-b border-slate-800/80"><td className="py-3 text-slate-300">Gold 24K / 999</td><td className="py-3 text-right font-bold text-amber-300">{money(data.gold24k999InrPer10g)}</td><td className="py-3 text-right text-xs text-slate-500">per 10g</td></tr>
            <tr className="border-b border-slate-800/80"><td className="py-3 text-slate-300">Gold 22K / 916</td><td className="py-3 text-right font-bold text-amber-300">{money(data.gold22k916InrPer10g)}</td><td className="py-3 text-right text-xs text-slate-500">per 10g</td></tr>
            <tr className="border-b border-slate-800/80"><td className="py-3 text-slate-300">Gold 18K / 750</td><td className="py-3 text-right font-bold text-amber-300">{money(data.gold18k750InrPer10g)}</td><td className="py-3 text-right text-xs text-slate-500">per 10g</td></tr>
            <tr className="border-b border-slate-800/80"><td className="py-3 text-slate-300">Gold 24K / 999</td><td className="py-3 text-right font-bold text-white">{money(data.gold24k999InrPer1g)}</td><td className="py-3 text-right text-xs text-slate-500">per 1g</td></tr>
            <tr><td className="py-2 text-slate-500" colSpan="2">Last updated</td><td className="py-2 text-right text-[10px] text-slate-500">{data.fetchedAt ? new Date(data.fetchedAt).toLocaleString('en-IN') : 'N/A'}</td></tr>
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3"><p className="text-[10px] leading-4 text-slate-500">Gold figures are international spot-equivalent calculations by purity; they are not Hyderabad/jeweller retail quotes and exclude making charges, GST and local premiums.</p><button onClick={fetchData} disabled={loading} className="shrink-0 rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-amber-400 disabled:opacity-50">{loading ? 'Refreshing…' : 'Refresh'}</button></div>
    </div>
  );
}
