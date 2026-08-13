import React, { useEffect, useMemo, useState } from 'react'
import { CalendarDays, FileText, LogOut, MessageSquare, Search, ShieldCheck, UserRound, Users } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'

const STORE = 'sv_ai_workspace_v4'
const readStore = () => { try { return JSON.parse(localStorage.getItem(STORE) || '{}') } catch { return {} } }
const money = (v) => v ? `₹${Number(String(v).replace(/[^0-9.]/g, '') || 0).toLocaleString('en-IN')}` : '—'

function useSession() {
  const [state, setState] = useState({ loading: true, session: null })
  useEffect(() => {
    const token = localStorage.getItem('sv_crm_token_v3')
    if (!token) { setState({ loading: false, session: null }); return }
    fetch('/api/crm/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) })
      .then(async (r) => { const data = await r.json().catch(() => ({})); if (!r.ok) throw new Error(data.error || 'Authentication required'); return data })
      .then((session) => setState({ loading: false, session }))
      .catch(() => { localStorage.removeItem('sv_crm_token_v3'); setState({ loading: false, session: null }) })
  }, [])
  return state
}

export default function CRMWorkspace() {
  const navigate = useNavigate()
  const { loading, session } = useSession()
  const [tab, setTab] = useState('overview')
  const [store, setStore] = useState(readStore())
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const refresh = () => setStore(readStore())
    refresh()
    window.addEventListener('storage', refresh)
    const timer = window.setInterval(refresh, 1500)
    return () => { window.removeEventListener('storage', refresh); window.clearInterval(timer) }
  }, [])

  if (loading) return <div className="min-h-[75vh] flex items-center justify-center bg-slate-950 text-sm text-slate-400">Verifying CRM session…</div>
  if (!session) return <Navigate to="/crm/login" replace />

  const contacts = store.contacts || []
  const sessions = store.sessions || []
  const bookings = store.bookings || []
  const filtered = useMemo(() => contacts.filter((c) => `${c.name || ''} ${c.email || ''} ${c.phone || ''} ${c.asset || ''}`.toLowerCase().includes(query.toLowerCase())), [contacts, query])
  const logout = () => { localStorage.removeItem('sv_crm_token_v3'); navigate('/crm/login') }
  const nav = [['overview', 'Overview', ShieldCheck], ['contacts', 'Contacts', Users], ['conversations', 'Conversations', MessageSquare], ['appointments', 'Call Requests', CalendarDays]]

  return <div className="min-h-[78vh] bg-slate-950 text-slate-100">
    <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
      <aside className="w-full border-b border-slate-800 p-4 lg:w-64 lg:border-b-0 lg:border-r lg:min-h-[78vh]">
        <div className="mb-6 border-b border-slate-800 pb-5"><div className="text-lg font-black">SREE VRIDDHI</div><div className="text-[10px] font-bold tracking-[.22em] text-amber-400">CRM WORKSPACE</div></div>
        <nav className="space-y-1">{nav.map(([key, label, Icon]) => <button key={key} onClick={() => setTab(key)} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-bold ${tab === key ? 'border border-amber-500/30 bg-amber-500/10 text-amber-300' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}><Icon className="h-4 w-4"/>{label}</button>)}</nav>
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-[11px] text-slate-400"><div>Signed in as</div><b className="text-white">{session.username}</b><div className="mt-1 uppercase text-amber-400">{session.role}</div></div>
        <button onClick={logout} className="mt-3 flex items-center gap-2 text-xs text-rose-300"><LogOut className="h-4 w-4"/> Sign out</button>
      </aside>
      <main className="min-w-0 flex-1 p-4 sm:p-7">
        <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row"><div><div className="text-[10px] font-black uppercase tracking-widest text-amber-400">Customer Operations</div><h1 className="mt-1 text-2xl font-black">CRM Workspace</h1><p className="mt-1 text-xs text-slate-400">Pre-chat details, conversations, attachments and call requests in one customer view.</p></div><a href="/" className="text-xs text-amber-300">← Public website</a></header>
        {tab === 'overview' && <><section className="grid grid-cols-2 gap-3 xl:grid-cols-4">{[[Users,'Contacts',contacts.length],[MessageSquare,'Conversations',sessions.length],[CalendarDays,'Call requests',bookings.length],[FileText,'Attachments',sessions.reduce((n,s)=>n+(s.attachments?.length||0),0)]].map(([Icon,label,value])=><div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"><Icon className="h-4 w-4 text-amber-400"/><div className="mt-2 text-2xl font-black">{value}</div><div className="text-[11px] text-slate-400">{label}</div></div>)}</section><section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-5"><h2 className="font-bold">Customer journey</h2><div className="mt-4 grid gap-3 md:grid-cols-4">{['Pre-chat submitted','Contact matched / created','Conversation captured','Call / follow-up requested'].map((x,i)=><div key={x} className="rounded-xl border border-slate-800 bg-slate-950 p-3"><div className="text-[10px] text-amber-400">0{i+1}</div><div className="mt-1 text-xs font-bold">{x}</div></div>)}</div></section></>}
        {tab === 'contacts' && <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50"><div className="flex flex-col justify-between gap-3 border-b border-slate-800 p-4 sm:flex-row"><div><h2 className="font-bold">Contacts</h2><p className="text-[11px] text-slate-500">No demo contacts are seeded. Records come from the website pre-chat workflow.</p></div><div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500"/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search customer…" className="rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-amber-400"/></div></div><div className="overflow-x-auto"><table className="min-w-full text-xs"><thead className="bg-slate-950 text-slate-500"><tr>{['Customer','Email','Phone','Asset / Interest','Investing','Updated'].map(h=><th key={h} className="p-3 text-left">{h}</th>)}</tr></thead><tbody>{filtered.map((c)=><tr key={c.email} onClick={()=>setSelected(c)} className="cursor-pointer border-t border-slate-800 hover:bg-slate-950"><td className="p-3 font-bold">{c.name || 'Unnamed'}</td><td className="p-3">{c.email}</td><td className="p-3">{c.phone || '—'}</td><td className="p-3">{c.asset || '—'}</td><td className="p-3">{money(c.amount)}</td><td className="p-3 text-slate-500">{c.updatedAt ? new Date(c.updatedAt).toLocaleString('en-IN') : '—'}</td></tr>)}</tbody></table>{!filtered.length&&<div className="p-10 text-center text-xs text-slate-500">No customer records yet. Submit the AI pre-chat form to create the first contact.</div>}</div></section>}
        {tab === 'conversations' && <section className="space-y-3">{sessions.slice().reverse().map((s)=><div key={s.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"><div className="flex justify-between gap-3"><div><b>{s.title || 'Customer conversation'}</b><p className="mt-1 text-[11px] text-slate-400">{s.name || 'Unknown'} · {s.email || 'No email'}</p></div><span className={s.status==='active'?'text-emerald-400':'text-slate-500'}>{s.status || 'ended'}</span></div><div className="mt-3 text-[11px] text-slate-500">{s.messages?.length||0} messages · {s.attachments?.length||0} attachments · {s.startedAt ? new Date(s.startedAt).toLocaleString('en-IN') : '—'}</div></div>)}{!sessions.length&&<div className="rounded-2xl border border-slate-800 p-10 text-center text-xs text-slate-500">No conversations yet.</div>}</section>}
        {tab === 'appointments' && <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50"><div className="border-b border-slate-800 p-4"><h2 className="font-bold">Scheduled Call Requests</h2><p className="text-[11px] text-slate-500">Appointments captured by the AI scheduling flow.</p></div><div className="overflow-x-auto"><table className="min-w-full text-xs"><thead className="bg-slate-950 text-slate-500"><tr><th className="p-3 text-left">Customer</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Date</th><th className="p-3 text-left">Time</th><th className="p-3 text-left">Status</th></tr></thead><tbody>{bookings.slice().reverse().map((b)=><tr key={b.id || `${b.email}-${b.date}-${b.time}`} className="border-t border-slate-800"><td className="p-3">{b.name}</td><td className="p-3">{b.email}</td><td className="p-3">{b.date}</td><td className="p-3">{b.time} IST</td><td className="p-3 text-amber-300">{b.status || 'requested'}</td></tr>)}</tbody></table>{!bookings.length&&<div className="p-10 text-center text-xs text-slate-500">No call requests yet.</div>}</div></section>}
        {selected&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={()=>setSelected(null)}><div className="w-full max-w-xl rounded-2xl border border-amber-500/30 bg-slate-950 p-6 shadow-2xl" onClick={(e)=>e.stopPropagation()}><div className="flex justify-between"><div><div className="text-[10px] font-black uppercase tracking-widest text-amber-400">Customer 360</div><h2 className="mt-1 text-xl font-black">{selected.name || 'Unnamed'}</h2><p className="text-xs text-slate-400">{selected.email}</p></div><button onClick={()=>setSelected(null)} className="text-slate-500">×</button></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{[['Full name',selected.name],['Email',selected.email],['Phone',selected.phone],['Asset / Interest',selected.asset],['Money investing',money(selected.amount)],['Created',selected.createdAt ? new Date(selected.createdAt).toLocaleString('en-IN') : '—']].map(([a,b])=><div key={a} className="rounded-xl bg-slate-900 p-3"><div className="text-[10px] text-slate-500">{a}</div><div className="mt-1 text-sm font-bold">{b || '—'}</div></div>)}</div><div className="mt-5 flex gap-2"><a className="rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950" href={`mailto:${selected.email}`}>Email</a>{selected.phone&&<a className="rounded-xl border border-slate-700 px-3 py-2 text-xs" href={`tel:${selected.phone}`}>Call</a>}</div></div></div>}
      </main>
    </div>
  </div>
}
