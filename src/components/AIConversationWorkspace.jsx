import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarClock, ChevronDown, Download, Grip, Maximize2, MessageSquarePlus, Minimize2, PhoneCall, Search, Trash2, UserRound, X } from 'lucide-react';

const ASSETS = ['Daily Finance','Physical Gold','Fixed Deposits','Housing Rentals','Vehicle Rentals','Oil & Gas Purchase','Retail Businesses - Street Foods','Retail Businesses - Saree Stalls','Retail Businesses - Fruits & Juice Centers','Retail Businesses - Kirana Stores','EV & Automobile Workshops','Staff Recruitment Agency','Virtual Stocks','Not sure yet'];
const PROFILE_KEY = 'sv_ai_customer_profile_v2';
const THREADS_KEY = 'sv_ai_threads_v2';

const uid = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
const initialThread = () => ({ id: uid('CON'), title: 'New conversation', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), messages: [] });

export default function AIConversationWorkspace({ onClose }) {
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null'));
  const [profileDraft, setProfileDraft] = useState(profile || { fullName:'', email:'', asset:'', amount:'', callDate:'', callTime:'' });
  const [threads, setThreads] = useState(() => JSON.parse(localStorage.getItem(THREADS_KEY) || 'null') || [initialThread()]);
  const [activeId, setActiveId] = useState(() => (JSON.parse(localStorage.getItem(THREADS_KEY) || 'null') || [])[0]?.id || null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showThreads, setShowThreads] = useState(false);
  const [size, setSize] = useState({ width: 440, height: 650 });
  const [position, setPosition] = useState({ right: 16, bottom: 16 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef(null);

  useEffect(() => { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem(THREADS_KEY, JSON.stringify(threads)); }, [threads]);
  useEffect(() => { if (!activeId && threads[0]) setActiveId(threads[0].id); }, [activeId, threads]);

  const active = useMemo(() => threads.find(t => t.id === activeId) || threads[0], [threads, activeId]);
  const activeCount = threads.filter(t => t.status === 'active').length;

  const saveProfile = async (e) => {
    e.preventDefault();
    if (!profileDraft.fullName.trim() || !profileDraft.email.trim()) return;
    try {
      const r = await fetch('/api/customer/profile', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(profileDraft) });
      const data = await r.json();
      setProfile(data.customer || profileDraft);
      setThreads(prev => prev.map(t => t.id === activeId && t.messages.length === 0 ? ({...t, title:`Welcome · ${profileDraft.fullName}`}) : t));
    } catch { setProfile(profileDraft); }
  };

  const newConversation = () => { const t = initialThread(); setThreads(p => [t, ...p]); setActiveId(t.id); setShowThreads(false); };
  const endConversation = () => setThreads(p => p.map(t => t.id === activeId ? {...t, status:'ended', updatedAt:new Date().toISOString()} : t));
  const deleteConversation = (id) => { const next = threads.filter(t => t.id !== id); const safe = next.length ? next : [initialThread()]; setThreads(safe); setActiveId(safe[0].id); };

  const downloadConversation = () => {
    if (!active) return;
    const lines = [`Sree Vriddhi AI Conversation`, `Customer: ${profile?.fullName || 'Not provided'}`, `Email: ${profile?.email || 'Not provided'}`, `Asset: ${profile?.asset || 'Not provided'}`, `Amount: ${profile?.amount || 'Not provided'}`, `Call: ${profile?.callDate || 'Not scheduled'} ${profile?.callTime || ''}`, `Status: ${active.status}`, '', ...active.messages.map(m => `${m.role === 'user' ? 'Customer' : 'Sree Vriddhi AI'}: ${m.content}`)];
    const blob = new Blob([lines.join('\n')], {type:'text/plain;charset=utf-8'}); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${active.id}.txt`; a.click(); URL.revokeObjectURL(a.href);
  };

  const send = async () => {
    if (!text.trim() || loading || !profile || active?.status === 'ended') return;
    const message = text.trim(); setText(''); setLoading(true);
    const history = active.messages.map(m => ({role:m.role, content:m.content}));
    setThreads(prev => prev.map(t => t.id === activeId ? {...t, updatedAt:new Date().toISOString(), messages:[...t.messages,{role:'user',content:message}]} : t));
    try {
      const r = await fetch('/api/ai/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,history,channel:'website',customer:profile})});
      const data = await r.json(); if (!r.ok) throw new Error(data.error || 'Assistant unavailable');
      setThreads(prev => prev.map(t => t.id === activeId ? {...t, title:t.messages.length <= 1 ? message.slice(0,34) : t.title, updatedAt:new Date().toISOString(), messages:[...t.messages,{role:'assistant',content:data.answer,category:data.category}]} : t));
    } catch(e) { setThreads(prev => prev.map(t => t.id === activeId ? {...t,messages:[...t.messages,{role:'assistant',content:e.message || 'AI assistant is temporarily unavailable.'}]} : t)); }
    finally { setLoading(false); }
  };

  const startDrag = (e) => { if (e.target.closest('button')) return; setDragging(true); dragRef.current={x:e.clientX,y:e.clientY,pos:{...position}}; };
  useEffect(() => { const move=e=>{ if(!dragging||!dragRef.current)return; setPosition({right:Math.max(8,dragRef.current.pos.right-(e.clientX-dragRef.current.x)),bottom:Math.max(8,dragRef.current.pos.bottom-(e.clientY-dragRef.current.y))}); }; const up=()=>setDragging(false); window.addEventListener('mousemove',move);window.addEventListener('mouseup',up);return()=>{window.removeEventListener('mousemove',move);window.removeEventListener('mouseup',up)}; },[dragging]);

  if (collapsed) return <button onClick={()=>setCollapsed(false)} style={{position:'fixed',right:position.right,bottom:position.bottom}} className="z-[70] rounded-full border border-emerald-500/30 bg-slate-950 px-4 py-3 text-xs font-semibold text-white shadow-2xl">Open Sree Vriddhi AI · {activeCount} active</button>;

  return <div style={{position:'fixed',right:position.right,bottom:position.bottom,width:`min(${size.width}px,calc(100vw - 16px))`,height:`min(${size.height}px,calc(100vh - 16px))`}} className="z-[70] flex flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 text-white shadow-2xl">
    {!profile ? <div className="overflow-y-auto p-5"><div className="mb-5"><h2 className="text-lg font-bold">Welcome to Sree Vriddhi AI 👋</h2><p className="mt-1 text-xs text-slate-400">Tell us a little about you so the assistant can guide your conversation.</p></div><form onSubmit={saveProfile} className="space-y-3">{[['fullName','Full Name','text'],['email','Email','email'],['amount','Money you are considering','text']].map(([key,label,type])=><label key={key} className="block text-xs"><span className="mb-1 block text-slate-400">{label}</span><input required={key!=='amount'} type={type} value={profileDraft[key]} onChange={e=>setProfileDraft({...profileDraft,[key]:e.target.value})} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500" /></label>)}<label className="block text-xs"><span className="mb-1 block text-slate-400">Asset / Interest</span><select value={profileDraft.asset} onChange={e=>setProfileDraft({...profileDraft,asset:e.target.value})} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"><option value="">Select an option</option>{ASSETS.map(x=><option key={x}>{x}</option>)}</select></label><div className="grid grid-cols-2 gap-2"><label className="text-xs"><span className="mb-1 block text-slate-400">Call date</span><input type="date" value={profileDraft.callDate} onChange={e=>setProfileDraft({...profileDraft,callDate:e.target.value})} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-2" /></label><label className="text-xs"><span className="mb-1 block text-slate-400">Call time</span><input type="time" value={profileDraft.callTime} onChange={e=>setProfileDraft({...profileDraft,callTime:e.target.value})} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-2" /></label></div><button className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold">Start my conversation</button></form></div> : <>
    <header onMouseDown={startDrag} className="flex cursor-move items-center justify-between border-b border-slate-800 bg-slate-900 px-3 py-2"><div><div className="text-sm font-bold">Sree Vriddhi AI</div><div className="text-[10px] text-emerald-400">● {activeCount} active conversation{activeCount===1?'':'s'}</div></div><div className="flex items-center gap-1"><button title="Conversations" onClick={()=>setShowThreads(v=>!v)} className="rounded p-1.5 hover:bg-slate-800"><Search className="h-4 w-4" /></button><button title="New conversation" onClick={newConversation} className="rounded p-1.5 hover:bg-slate-800"><MessageSquarePlus className="h-4 w-4" /></button><button title="Download" onClick={downloadConversation} className="rounded p-1.5 hover:bg-slate-800"><Download className="h-4 w-4" /></button><button title="Collapse" onClick={()=>setCollapsed(true)} className="rounded p-1.5 hover:bg-slate-800"><Minimize2 className="h-4 w-4" /></button><button title="Close" onClick={onClose} className="rounded p-1.5 hover:bg-slate-800"><X className="h-4 w-4" /></button></div></header>
    {showThreads && <div className="absolute inset-x-0 top-14 z-10 max-h-[55%] overflow-y-auto border-b border-slate-700 bg-slate-950 p-2">{threads.map(t=><div key={t.id} className="mb-1 flex items-center gap-2 rounded-lg p-2 hover:bg-slate-900"><button className="min-w-0 flex-1 text-left" onClick={()=>{setActiveId(t.id);setShowThreads(false)}}><div className="truncate text-xs font-semibold">{t.title}</div><div className="text-[9px] text-slate-500">{t.status} · {new Date(t.updatedAt).toLocaleString()}</div></button><button title="Delete" onClick={()=>deleteConversation(t.id)} className="text-slate-500 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button></div>)}</div>}
    <div className="flex-1 space-y-3 overflow-y-auto p-3">{active.messages.length===0 && <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4"><div className="text-sm font-semibold">Hi {profile.fullName}! 👋</div><p className="mt-1 text-xs leading-5 text-slate-400">Welcome to Sree Vriddhi. I can help answer your questions and guide you through the next step.</p><div className="mt-3 text-[10px] text-slate-500">Interest: {profile.asset || 'Not selected'} · Amount: {profile.amount || 'Not provided'}</div></div>}{active.messages.map((m,i)=><div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[88%] whitespace-pre-wrap rounded-xl px-3 py-2 text-xs leading-5 ${m.role==='user'?'bg-emerald-600/20':'bg-slate-900 border border-slate-800'}`}>{m.content}</div></div>)}{loading&&<div className="text-xs text-slate-500">AI is preparing a response…</div>}</div>
    <div className="border-t border-slate-800 p-2"><div className="flex gap-2"><textarea value={text} disabled={active.status==='ended'} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} placeholder={active.status==='ended'?'Conversation ended — start a new conversation':'Type your message…'} rows={2} className="min-w-0 flex-1 resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none" /><button onClick={send} disabled={!text.trim()||loading||active.status==='ended'} className="self-end rounded-lg bg-emerald-600 p-2 disabled:opacity-40">Send</button></div><div className="mt-1 flex items-center justify-between text-[9px] text-slate-600"><span>Enter to send · Shift+Enter for new line</span>{active.status==='active'?<button onClick={endConversation} className="text-red-400">End conversation</button>:<button onClick={newConversation} className="text-emerald-400">Start new</button>}</div></div>
    <div onMouseDown={e=>{e.preventDefault();dragRef.current={x:e.clientX,y:e.clientY,size:{...size}};const move=ev=>setSize({width:Math.max(340,Math.min(720,dragRef.current.size.width+(ev.clientX-dragRef.current.x))),height:Math.max(420,Math.min(window.innerHeight-16,dragRef.current.size.height+(ev.clientY-dragRef.current.y)))});const up=()=>{window.removeEventListener('mousemove',move);window.removeEventListener('mouseup',up)};window.addEventListener('mousemove',move);window.addEventListener('mouseup',up)}} className="absolute bottom-1 right-1 cursor-nwse-resize p-1 text-slate-600"><Grip className="h-4 w-4" /></div>
  </>}
  </div>;
}
