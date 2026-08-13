import React, { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { CalendarDays, ChevronRight, Clock3, Download, LogOut, MessageSquare, Search, ShieldCheck, UserPlus, Users } from 'lucide-react'

const STORE = 'sv_ai_workspace_v4'
const readStore = () => { try { return JSON.parse(localStorage.getItem(STORE) || '{}') } catch { return {} } }
const writeStore = (value) => localStorage.setItem(STORE, JSON.stringify(value))
const money = (value) => value ? `₹${Number(String(value).replace(/[^0-9.]/g, '') || 0).toLocaleString('en-IN')}` : '—'

function Protected({ children }) {
  const token = localStorage.getItem('sv_crm_token')
  if (!token) return <Navigate to="/crm/login" replace />
  return children
}

export default function CRMWorkspace() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('contacts')
  const [store, setStore] = useState(readStore())
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [role, setRole] = useState(localStorage.getItem('sv_crm_role') || 'user')

  const refresh = () => setStore(readStore())
  useEffect(() => { refresh(); const fn = () => refresh(); window.addEventListener('storage', fn); return () => window.removeEventListener('storage', fn) }, [])

  const contacts = store.contacts || []
  const sessions = store.sessions || []
  const bookings = store.bookings || []
  const filtered = useMemo(() => contacts.filter(c => `${c.name} ${c.email} ${c.asset} ${c.amount}`.toLowerCase().includes(query.toLowerCase())), [contacts, query])

  const logout = () => { localStorage.removeItem('sv_crm_token'); localStorage.removeItem('sv_crm_role'); navigate('/crm/login') }

  const stats = [
    ['Contacts', contacts.length, Users],
    ['Conversations', sessions.length, MessageSquare],
    ['Call requests', bookings.length, CalendarDays],
    ['Active chats', sessions.filter(s => s.status === 'active').length, ShieldCheck],
  ]

  return <Protected><div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
    <aside className="w-full lg:w-64 border-r border-amber-500/20 bg-slate-950 p-4 flex-shrink-0">
      <div className="mb-6 pb-4 border-b border-slate-800"><div className="text-lg font-black text-white">SREE VRIDDHI</div><div className="text-[10px] tracking-[0.2em] text-amber-400 font-bold">BASIC CRM</div></div>
      <nav className="space-y-1">{[['contacts','Contacts'],['conversations','Conversations'],['appointments','Call Requests']].map(([key,label]) => <button key={key} onClick={() => setTab(key)} className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold ${tab === key ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>{label}</button>)}</nav>
      <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-500">Signed in as <b className="text-slate-300">{role}</b></div>
      <button onClick={logout} className="mt-3 flex items-center gap-2 text-xs text-rose-300"><LogOut className="w-4 h-4"/> Sign out</button>
    </aside>

    <main className="flex-1 p-4 sm:p-7 overflow-auto">
      <header className="flex flex-col sm:flex-row justify-between gap-4 mb-7"><div><h1 className="text-2xl font-black">CRM Workspace</h1><p className="text-xs text-slate-400 mt-1">Customer records created from the website AI pre-chat and subsequent interactions.</p></div><Link to="/" className="text-xs text-amber-300 hover:text-amber-200">← Public website</Link></header>

      <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-7">{stats.map(([label,value,Icon]) => <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"><Icon className="w-4 h-4 text-amber-400"/><div className="text-2xl font-black mt-2">{value}</div><div className="text-[11px] text-slate-400">{label}</div></div>)}</section>

      {tab === 'contacts' && <section className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-3 justify-between"><div><h2 className="font-bold">Contacts</h2><p className="text-[11px] text-slate-500">Pre-chat fields are automatically mapped into the CRM record.</p></div><div className="relative"><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name, email, asset..." className="pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs outline-none focus:border-amber-400"/></div></div>
        <div className="overflow-x-auto"><table className="min-w-full text-xs"><thead className="bg-slate-950 text-slate-500"><tr><th className="p-3 text-left">Contact</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Asset / Interest</th><th className="p-3 text-left">Investing</th><th className="p-3 text-left">Updated</th><th className="p-3"></th></tr></thead><tbody>{filtered.map(c => <tr key={c.email} className="border-t border-slate-800 hover:bg-slate-950/70"><td className="p-3"><b>{c.name}</b><span className="block text-[10px] text-slate-500">{c.phone || 'Phone not supplied'}</span></td><td className="p-3">{c.email}</td><td className="p-3">{c.asset || '—'}</td><td className="p-3">{money(c.amount)}</td><td className="p-3 text-slate-500">{c.updatedAt ? new Date(c.updatedAt).toLocaleString('en-IN') : '—'}</td><td className="p-3"><button onClick={() => setSelected(c)} className="text-amber-300"><ChevronRight/></button></td></tr>)}</tbody></table>{!filtered.length && <div className="p-8 text-center text-xs text-slate-500">No CRM contacts found. Complete the website AI pre-chat form to create one.</div>}</div>
      </section>}

      {tab === 'conversations' && <section className="space-y-3">{sessions.slice().reverse().map(s => <div key={s.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"><div className="flex justify-between gap-3"><div><b className="text-sm">{s.title}</b><p className="text-[11px] text-slate-400 mt-1">{s.name} · {s.email}</p></div><span className={s.status === 'active' ? 'text-emerald-400 text-xs' : 'text-slate-500 text-xs'}>{s.status}</span></div><div className="mt-3 text-[11px] text-slate-500">{s.messages?.length || 0} messages · {s.attachments?.length || 0} attachments · Started {new Date(s.startedAt).toLocaleString('en-IN')}</div><button onClick={() => { setSelected(contacts.find(c => c.email === s.email) || { name:s.name,email:s.email }); setTab('contacts') }} className="mt-3 text-xs text-amber-300">Open customer →</button></div>)}{!sessions.length && <div className="rounded-2xl border border-slate-800 p-8 text-center text-xs text-slate-500">No conversations yet.</div>}</section>}

      {tab === 'appointments' && <section className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden"><div className="p-4 border-b border-slate-800"><h2 className="font-bold">Scheduled Call Requests</h2><p className="text-[11px] text-slate-500">Requests created from the AI assistant scheduling flow.</p></div><div className="overflow-x-auto"><table className="min-w-full text-xs"><thead className="bg-slate-950 text-slate-500"><tr><th className="p-3 text-left">Customer</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Date</th><th className="p-3 text-left">Time</th><th className="p-3 text-left">Status</th></tr></thead><tbody>{bookings.slice().reverse().map(b => <tr key={b.id} className="border-t border-slate-800"><td className="p-3">{b.name}</td><td className="p-3">{b.email}</td><td className="p-3">{b.date}</td><td className="p-3"><Clock3 className="inline w-3 h-3 mr-1"/>{b.time} IST</td><td className="p-3 text-amber-300">{b.status}</td></tr>)}</tbody></table>{!bookings.length && <div className="p-8 text-center text-xs text-slate-500">No call requests yet.</div>}</div></section>}

      {selected && <div className="fixed inset-0 z-[100] bg-black/60 p-4 flex items-center justify-center" onClick={() => setSelected(null)}><div className="w-full max-w-xl rounded-2xl border border-amber-500/30 bg-slate-950 shadow-2xl p-6" onClick={e => e.stopPropagation()}><div className="flex justify-between"><div><div className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">Customer 360</div><h2 className="text-xl font-black mt-1">{selected.name}</h2><p className="text-xs text-slate-400">{selected.email}</p></div><button onClick={() => setSelected(null)} className="text-slate-500">×</button></div><div className="grid sm:grid-cols-2 gap-3 mt-6">{[['Asset / Interest',selected.asset],['Money investing',money(selected.amount)],['Created',selected.createdAt ? new Date(selected.createdAt).toLocaleString('en-IN') : '—'],['Updated',selected.updatedAt ? new Date(selected.updatedAt).toLocaleString('en-IN') : '—']].map(([a,b]) => <div key={a} className="rounded-xl bg-slate-900 p-3"><div className="text-[10px] text-slate-500">{a}</div><div className="text-sm font-bold mt-1">{b || '—'}</div></div>)}</div><div className="mt-5 flex gap-2"><a href={`mailto:${selected.email}`} className="px-3 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold">Email customer</a>{selected.phone && <a href={`tel:${selected.phone}`} className="px-3 py-2 rounded-xl border border-slate-700 text-xs">Call</a>}</div></div></div>}
    </main>
  </div></Protected>
}
