import React, { useEffect, useState } from 'react';
import { Download, FileText, History, UserCheck } from 'lucide-react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';

const STORE = 'sv_ai_workspace_v4';
const DB_NAME = 'sv_ai_attachments_v1';
const DB_STORE = 'files';

const readWebsiteStore = () => {
  try {
    const current = JSON.parse(localStorage.getItem(STORE) || '{}');
    if (current.contacts?.length || current.sessions?.length) return current;
    return JSON.parse(localStorage.getItem('sv_ai_workspace_v3') || '{}');
  } catch { return {}; }
};

const getAttachment = (fileId) => new Promise((resolve, reject) => {
  if (!('indexedDB' in window)) return reject(new Error('Attachment storage is unavailable.'));
  const request = indexedDB.open(DB_NAME, 1);
  request.onupgradeneeded = () => request.result.createObjectStore(DB_STORE, { keyPath: 'id' });
  request.onsuccess = () => {
    const db = request.result;
    const tx = db.transaction(DB_STORE, 'readonly');
    const get = tx.objectStore(DB_STORE).get(fileId);
    get.onsuccess = () => { resolve(get.result); db.close(); };
    get.onerror = () => { reject(get.error); db.close(); };
  };
  request.onerror = () => reject(request.error);
});

const downloadAttachment = async (file) => {
  try {
    const record = await getAttachment(file.id);
    if (!record?.blob) return;
    const url = URL.createObjectURL(record.blob);
    const a = document.createElement('a');
    a.href = url; a.download = file.name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch { /* Keep the dashboard usable if browser storage is unavailable. */ }
};

const Customer360 = () => {
  const { customers } = useSreeVriddhi();
  const c = customers[0] || {};
  const [website, setWebsite] = useState({ contacts: [], sessions: [], bookings: [] });

  useEffect(() => {
    const refresh = () => setWebsite(readWebsiteStore());
    refresh();
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Customer 360° Profile Manager</h1>
        <p className="text-xs text-slate-400 mt-1">Full customer lifecycle view, KYC audit trails, website AI contacts, conversations and attachments.</p>
      </div>

      <div className="glass-card p-8 border-amber-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="font-mono text-xs text-amber-400 font-bold">{c.id}</span>
            <h2 className="text-xl font-bold text-white font-serif-brand">{c.name}</h2>
            <p className="text-xs text-slate-400">{c.location} | {c.phone} | {c.email}</p>
          </div>
          <span className="badge-approved px-3 py-1 rounded-full text-xs font-bold uppercase">KYC Verified (LOW RISK)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div><span>PAN Number:</span> <strong className="block font-mono text-white">{c.panNumber}</strong></div>
          <div><span>Aadhaar Last 4:</span> <strong className="block font-mono text-white">{c.aadhaarLast4}</strong></div>
          <div><span>Bank Name:</span> <strong className="block text-white">{c.bankName}</strong></div>
          <div><span>Active Contracts:</span> <strong className="block text-emerald-400">{c.activeContractsCount}</strong></div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-amber-300 font-serif-brand flex items-center gap-1.5"><History className="w-4 h-4" /><span>Customer Timeline Audit History</span></h3>
          <div className="space-y-2 pl-4 border-l-2 border-amber-500/30">
            {c.timeline?.map((t, idx) => <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex justify-between items-center"><div><span className="font-bold text-white">{t.event}</span><span className="block text-[10px] text-slate-500">By: {t.user}</span></div><span className="text-[10px] font-mono text-amber-400">{t.date}</span></div>)}
          </div>
        </div>
      </div>

      <div className="glass-card p-6 border-cyan-500/20 space-y-5">
        <div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-white flex items-center gap-2"><UserCheck className="w-5 h-5 text-amber-300" />Website AI Contacts</h2><p className="text-xs text-slate-400 mt-1">Contacts created or updated through the AI pre-chat form.</p></div><span className="text-xs text-amber-300 font-bold">{website.contacts?.length || 0} contacts</span></div>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="min-w-full text-xs"><thead className="bg-slate-950 text-slate-400"><tr><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">Asset / Interest</th><th className="text-left p-3">Money investing</th><th className="text-left p-3">Updated</th></tr></thead><tbody>{(website.contacts || []).map((contact) => <tr key={contact.email} className="border-t border-slate-800 text-slate-200"><td className="p-3 font-semibold">{contact.name}</td><td className="p-3">{contact.email}</td><td className="p-3">{contact.asset || '—'}</td><td className="p-3">{contact.amount || '—'}</td><td className="p-3 text-slate-400">{contact.updatedAt ? new Date(contact.updatedAt).toLocaleString('en-IN') : '—'}</td></tr>)}</tbody></table>
          {!website.contacts?.length && <div className="p-5 text-xs text-slate-500">No website AI contacts have been created in this browser yet.</div>}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-white">AI Conversations</h2><span className="text-xs text-amber-300 font-bold">{website.sessions?.length || 0} total</span></div>
          <div className="space-y-2 max-h-80 overflow-auto">{(website.sessions || []).slice().reverse().map((s) => <div key={s.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800"><div className="flex justify-between gap-3"><strong className="text-white text-xs">{s.title}</strong><span className={s.status === 'active' ? 'text-emerald-400' : 'text-slate-500'}>{s.status}</span></div><p className="text-[10px] text-slate-400 mt-1">{s.name} · {s.email}</p><p className="text-[10px] text-slate-500 mt-1">{s.messages?.length || 0} messages · {s.attachments?.length || 0} attachments</p></div>)}{!website.sessions?.length && <div className="text-xs text-slate-500">No website AI conversations yet.</div>}</div>
        </div>

        <div className="glass-card p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-white flex items-center gap-2"><FileText className="w-5 h-5 text-amber-300" />Customer Attachments</h2><span className="text-xs text-amber-300 font-bold">{(website.sessions || []).reduce((n, s) => n + (s.attachments?.length || 0), 0)} files</span></div>
          <div className="space-y-2 max-h-80 overflow-auto">{(website.sessions || []).flatMap((s) => (s.attachments || []).map((a) => ({ ...a, sessionTitle: s.title }))).map((a) => <div key={a.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3"><FileText className="w-4 h-4 text-slate-400" /><div className="min-w-0 flex-1"><strong className="block text-xs text-white truncate">{a.name}</strong><span className="block text-[10px] text-slate-500">{a.email} · {(a.size / 1024 / 1024).toFixed(2)} MB · {a.sessionTitle}</span></div><button type="button" onClick={() => downloadAttachment(a)} className="p-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-amber-500"><Download className="w-4 h-4" /></button></div>)}{!(website.sessions || []).some((s) => s.attachments?.length) && <div className="text-xs text-slate-500">No website attachments yet.</div>}</div>
        </div>
      </div>

      <div className="glass-card p-6 border-slate-800">
        <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-white">Scheduled Call Requests</h2><span className="text-xs text-amber-300 font-bold">{website.bookings?.length || 0} requests</span></div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800"><table className="min-w-full text-xs"><thead className="bg-slate-950 text-slate-400"><tr><th className="text-left p-3">Customer</th><th className="text-left p-3">Email</th><th className="text-left p-3">Date</th><th className="text-left p-3">Time</th><th className="text-left p-3">Status</th></tr></thead><tbody>{(website.bookings || []).slice().reverse().map((b) => <tr key={b.id} className="border-t border-slate-800 text-slate-200"><td className="p-3">{b.name}</td><td className="p-3">{b.email}</td><td className="p-3">{b.date}</td><td className="p-3">{b.time} IST</td><td className="p-3 text-amber-300">{b.status}</td></tr>)}</tbody></table>{!website.bookings?.length && <div className="p-5 text-xs text-slate-500">No call requests yet.</div>}</div>
      </div>
    </div>
  );
};

export default Customer360;
