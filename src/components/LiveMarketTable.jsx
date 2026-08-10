import React, { useEffect, useState } from 'react';

const API_BASE = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE ? import.meta.env.VITE_API_BASE.replace(/\/$/, '') : '';
const money = value => Number.isFinite(Number(value)) ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value)) : 'N/A';
const pct = value => Number.isFinite(Number(value)) ? `${Number(value).toFixed(2)}%` : 'N/A';

export default function LiveMarketTable() {
  const [data, setData] = useState(null), [loading, setLoading] = useState(false), [error, setError] = useState('');
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/market/indiaSnapshot`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Market data unavailable');
      setData(json); setError('');
    } catch (e) { console.warn('market snapshot failed', e); setError('Market data is temporarily unavailable.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); const id = setInterval(fetchData, 60 * 1000); return () => clearInterval(id); }, []);

  if (!data) return <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"><div className="flex items-center justify-between gap-3"><span>{loading ? 'Loading India market snapshot…' : error}</span><button onClick={fetchData} className="rounded-lg border border-slate-700 px-3 py-1 text-xs text-amber-300">Retry</button></div></div>;

  return <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
      <div><h4 className="text-sm font-bold text-amber-300">India Market & Investment Snapshot</h4><p className="text-[10px] text-slate-500">Live/reference indicators in INR; investment rates are official reference rates.</p></div>
      <button onClick={fetchData} disabled={loading} className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-amber-400 disabled:opacity-50">{loading ? 'Refreshing…' : 'Refresh'}</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] text-sm"><thead><tr className="border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-500"><th className="py-2 text-left">Market / Category</th><th className="py-2 text-right">Value</th><th className="py-2 text-right">Reference</th></tr></thead><tbody>
        <tr className="border-b border-slate-800/80"><td className="py-3">NIFTY 50</td><td className="py-3 text-right font-bold text-white">{Number(data.nifty50?.value).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td><td className="py-3 text-right text-xs text-slate-500">Index {data.nifty50?.changePct != null ? `${data.nifty50.changePct >= 0 ? '+' : ''}${pct(data.nifty50.changePct)} today` : ''}</td></tr>
        <tr className="border-b border-slate-800/80"><td className="py-3">USD / INR</td><td className="py-3 text-right font-bold text-white">₹{Number(data.usdInr).toFixed(4)}</td><td className="py-3 text-right text-xs text-slate-500">INR per USD</td></tr>
        <tr className="border-b border-slate-800/80"><td className="py-3">Gold 24K / 999</td><td className="py-3 text-right font-bold text-amber-300">{money(data.gold24k999InrPer10g)}</td><td className="py-3 text-right text-xs text-slate-500">per 10g · spot-equivalent</td></tr>
        <tr className="border-b border-slate-800/80"><td className="py-3">Petrol — Hyderabad</td><td className="py-3 text-right font-bold text-white">{money(data.fuel?.petrolInrPerLitre)}</td><td className="py-3 text-right text-xs text-slate-500">per litre</td></tr>
        <tr className="border-b border-slate-800/80"><td className="py-3">Diesel — Hyderabad</td><td className="py-3 text-right font-bold text-white">{money(data.fuel?.dieselInrPerLitre)}</td><td className="py-3 text-right text-xs text-slate-500">per litre</td></tr>
        <tr className="border-b border-slate-800/80"><td className="py-3">PPF</td><td className="py-3 text-right font-bold text-emerald-300">{pct(data.investments.ppf.rate)}</td><td className="py-3 text-right text-xs text-slate-500">p.a. · {data.investments.ppf.period}</td></tr>
        <tr className="border-b border-slate-800/80"><td className="py-3">NSC</td><td className="py-3 text-right font-bold text-emerald-300">{pct(data.investments.nsc.rate)}</td><td className="py-3 text-right text-xs text-slate-500">p.a. · {data.investments.nsc.period}</td></tr>
        <tr className="border-b border-slate-800/80"><td className="py-3">SCSS</td><td className="py-3 text-right font-bold text-emerald-300">{pct(data.investments.scss.rate)}</td><td className="py-3 text-right text-xs text-slate-500">p.a. · {data.investments.scss.period}</td></tr>
        <tr><td className="py-3">EPF</td><td className="py-3 text-right font-bold text-emerald-300">{pct(data.investments.epf.rate)}</td><td className="py-3 text-right text-xs text-slate-500">p.a. · {data.investments.epf.period}</td></tr>
      </tbody></table>
    </div>
    <div className="mt-3 flex flex-col sm:flex-row sm:justify-between gap-2 text-[10px] leading-4 text-slate-500"><span>Gold is an international spot-equivalent benchmark; fuel is a Hyderabad reference price. Investment rates are government-announced reference rates, not guaranteed returns.</span><span className="shrink-0">Updated {new Date(data.fetchedAt).toLocaleString('en-IN')}</span></div>
  </div>;
}
