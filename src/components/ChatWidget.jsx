import React, { useEffect, useMemo, useState } from 'react';
import { Bot, CalendarClock, Download, Mail, Mic, Phone, Plus, Send, Sparkles, Trash2, X } from 'lucide-react';

const SUPPORT_EMAIL = 'sreevriddhiforwealth@gmail.com';
const SUPPORT_PHONE = '+91 9640352929';
const STORAGE_KEY = 'sreevriddhi-ai-conversations-v3';
const PROFILE_KEY = 'sreevriddhi-ai-profile-v3';
const ASSETS = ['Daily Finance','Physical Gold','Fixed Deposits','Housing Rentals','Vehicle Rentals','Oil & Gas Purchase','Street Foods','Saree Stalls','Fruits & Juice Centers','Kirana Stores','EV & Automobile Workshops','Staff Recruitment Agency','Virtual Stocks','Other / Not sure'];
const QUICK_PROMPTS = ['How does Sree Vriddhi work?','What opportunities are available?','Explain the process in simple words.','What is artificial intelligence?','Write a professional email for me.','What is Python?'];

const newConversation = () => ({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, title: 'New conversation', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), messages: [] });

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [profileReady, setProfileReady] = useState(false);
  const [profile, setProfile] = useState({ fullName:'', email:'', asset:'', amount:'', callDate:'', callTime:'' });
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);
  const active = useMemo(() => conversations.find(c => c.id === activeId) || null, [conversations, activeId]);
  const messages = active?.messages || [];

  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null');
      if (p?.fullName && p?.email) { setProfile(p); setProfileReady(true); }
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (saved.length) { setConversations(saved); setActiveId(saved[0].id); }
      else { const c = newConversation(); setConversations([c]); setActiveId(c.id); }
    } catch { const c = newConversation(); setConversations([c]); setActiveId(c.id); }
    const handler = () => setOpen(true); window.addEventListener('sreevriddhi:open-ai', handler); return () => window.removeEventListener('sreevriddhi:open-ai', handler);
  }, []);
  useEffect(() => { if (conversations.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations)); }, [conversations]);

  const saveProfile = e => {
    e.preventDefault();
    if (!profile.fullName.trim() || !profile.email.trim()) return setError('Full name and email are required.');
    if (!/^\S+@\S+\.\S+$/.test(profile.email)) return setError('Please enter a valid email address.');
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); setProfileReady(true); setError('');
  };
  const updateProfile = (k,v) => setProfile(p => ({...p,[k]:v}));
  const updateActive = fn => setConversations(items => items.map(c => c.id === activeId ? {...fn(c), updatedAt:new Date().toISOString()} : c));
  const createConversation = () => { const c = newConversation(); setConversations(items => [c,...items]); setActiveId(c.id); setMessage(''); setError(''); };
  const deleteConversation = () => {
    if (!active) return;
    const remaining = conversations.filter(c => c.id !== active.id);
    if (!remaining.length) { const c = newConversation(); setConversations([c]); setActiveId(c.id); } else { setConversations(remaining); setActiveId(remaining[0].id); }
  };
  const sendText = async text => {
    const clean = text.trim(); if (!clean || loading || !active) return;
    const history = messages.map(m => ({role:m.role,content:m.content}));
    updateActive(c => ({...c,title:c.messages.length ? c.title : clean.slice(0,45),messages:[...c.messages,{role:'user',content:clean,at:new Date().toISOString()}]}));
    setMessage(''); setError(''); setLoading(true);
    try {
      const r = await fetch('/api/ai/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:clean,history,profile,channel:'website'})});
      const d = await r.json(); if (!r.ok) throw new Error(d.error || 'Assistant unavailable');
      updateActive(c => ({...c,messages:[...c.messages,{role:'assistant',content:d.answer,category:d.category,risk:d.risk,requiresHuman:d.requiresHuman,at:new Date().toISOString()}]}));
    } catch(e) { setError(e.message || 'Assistant unavailable'); } finally { setLoading(false); }
  };
  const handleKeyDown = e => { if(e.key==='Enter' && !e.shiftKey){e.preventDefault(); if(message.trim()&&!loading) sendText(message);} };
  const download = () => {
    if(!active) return;
    const text = [`Sree Vriddhi AI Assistant`,`Customer: ${profile.fullName}`,`Email: ${profile.email}`,`Asset: ${profile.asset || 'Not selected'}`,`Amount: ${profile.amount || 'Not provided'}`,`Call: ${profile.callDate && profile.callTime ? `${profile.callDate} ${profile.callTime}` : 'Not scheduled'}`,'',...active.messages.map(m=>`${m.role==='user'?'You':'AI'}: ${m.content}`)].join('\n\n');
    const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'})); const a=document.createElement('a'); a.href=url; a.download=`${active.title.replace(/[^a-z0-9]+/gi,'-').toLowerCase()||'sree-vriddhi-chat'}.txt`; a.click(); URL.revokeObjectURL(url);
  };
  const schedule = e => { e.preventDefault(); if(!profile.callDate||!profile.callTime) return setError('Select a date and time first.'); localStorage.setItem(PROFILE_KEY,JSON.stringify(profile)); setError(''); updateActive(c=>({...c,messages:[...c.messages,{role:'assistant',content:`Your call request is saved for ${profile.callDate} at ${profile.callTime}. Our support team can be reached at ${SUPPORT_PHONE} or ${SUPPORT_EMAIL}.`,category:'BUSINESS'}]})); };
  const voice = () => { const R=window.SpeechRecognition||window.webkitSpeechRecognition; if(!R) return setError('Voice input is not supported by this browser.'); const r=new R(); r.lang='en-IN'; r.interimResults=false; r.onstart=()=>setListening(true); r.onend=()=>setListening(false); r.onerror=()=>{setListening(false);setError('Voice input could not be started.');}; r.onresult=e=>setMessage(e.results?.[0]?.[0]?.transcript||''); r.start(); };

  if(!open) return <div className="fixed bottom-3 right-3 z-[60]"><button onClick={()=>setOpen(true)} className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-white shadow-lg hover:bg-emerald-500"><Bot className="h-4 w-4"/>AI Assistant</button></div>;

  return <div className="fixed bottom-3 right-3 z-[60] max-w-[calc(100vw-24px)]"><div className="w-[min(470px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 p-3"><div className="flex items-center gap-2"><div className="rounded-full bg-emerald-500/15 p-2"><Bot className="h-4 w-4 text-emerald-400"/></div><div><strong className="block text-sm text-white">Sree Vriddhi AI Assistant</strong><span className="text-[10px] text-emerald-300">Business + General AI</span></div></div><div className="flex gap-1"><button onClick={createConversation} title="New conversation" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800"><Plus className="h-4 w-4"/></button><button onClick={download} disabled={!messages.length} title="Download conversation" className="rounded-lg p-1.5 text-slate-400 disabled:opacity-30 hover:bg-slate-800"><Download className="h-4 w-4"/></button><button onClick={()=>setOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800"><X className="h-4 w-4"/></button></div></div>

    {!profileReady ? <div className="max-h-[75vh] overflow-y-auto p-4"><div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4"><div className="flex items-center gap-2 text-white"><Sparkles className="h-5 w-5 text-amber-400"/><strong>Before we start</strong></div><p className="mt-1 text-xs leading-5 text-slate-400">A few details help the assistant understand what you need.</p></div><form onSubmit={saveProfile} className="space-y-3">
      <label className="block text-xs text-slate-300">1. Full name<input required value={profile.fullName} onChange={e=>updateProfile('fullName',e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" placeholder="Your full name"/></label>
      <label className="block text-xs text-slate-300">2. Email<input required type="email" value={profile.email} onChange={e=>updateProfile('email',e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" placeholder="you@example.com"/></label>
      <label className="block text-xs text-slate-300">3. Asset / area of interest<select value={profile.asset} onChange={e=>updateProfile('asset',e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"><option value="">Select an option</option>{ASSETS.map(a=><option key={a}>{a}</option>)}</select></label>
      <label className="block text-xs text-slate-300">4. Money you are considering<input value={profile.amount} onChange={e=>updateProfile('amount',e.target.value)} inputMode="decimal" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" placeholder="Amount (₹)"/></label>
      <button className="w-full rounded-lg bg-amber-500 px-3 py-2.5 text-xs font-semibold text-slate-950">Start conversation</button></form><p className="mt-3 text-[9px] text-slate-600">These details are stored in this browser for returning conversations.</p>{error&&<div className="mt-2 text-[10px] text-red-300">{error}</div>}</div> : <>
      <div className="flex gap-1 overflow-x-auto border-b border-slate-800 bg-slate-950 p-2">{conversations.slice(0,8).map(c=><button key={c.id} onClick={()=>setActiveId(c.id)} className={`max-w-[140px] shrink-0 rounded-lg px-2 py-1.5 text-[9px] ${c.id===activeId?'bg-amber-500/15 text-amber-300':'text-slate-500 hover:bg-slate-900'}`}>{c.title}</button>)}<button onClick={createConversation} className="shrink-0 rounded-lg border border-slate-800 px-2 py-1.5 text-[9px] text-slate-400">+ New</button></div>
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-3 py-2 text-[9px] text-slate-500"><span>{profile.fullName} · {profile.email}</span><button onClick={()=>setProfileReady(false)} className="text-amber-400">Edit details</button></div>
      <div className="max-h-[48vh] space-y-3 overflow-y-auto p-3">{messages.length===0&&<div className="space-y-3"><div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4"><div className="flex items-center gap-2 text-white"><Sparkles className="h-4 w-4 text-amber-400"/><strong className="text-sm">How can I help?</strong></div><p className="mt-1 text-xs text-slate-400">Ask about Sree Vriddhi or any general question.</p></div><div className="grid gap-2 sm:grid-cols-2">{QUICK_PROMPTS.map(p=><button key={p} onClick={()=>sendText(p)} className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-left text-[10px] text-slate-200 hover:border-amber-500/30">{p}</button>)}</div></div>}{messages.map((m,i)=><div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[90%] rounded-xl p-3 text-xs leading-5 ${m.role==='user'?'bg-emerald-600/20 text-white':'border border-slate-800 bg-slate-950/80 text-slate-200'}`}><div className="mb-1 text-[9px] uppercase tracking-wider text-slate-500">{m.role==='user'?'You':'AI'}{m.category?` · ${m.category}`:''}</div><div className="whitespace-pre-wrap">{m.content}</div></div></div>)}{loading&&<div className="text-xs text-slate-500">AI is preparing a response…</div>}{error&&<div className="rounded-lg border border-red-500/30 bg-red-500/5 p-2 text-[10px] text-red-300">{error}</div>}</div>
      <form onSubmit={e=>{e.preventDefault();sendText(message)}} className="border-t border-slate-800 bg-slate-950 p-3"><div className="flex items-end gap-2"><textarea value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={handleKeyDown} rows={2} maxLength={4000} placeholder="Ask anything… Enter to send" className="min-w-0 flex-1 resize-none rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-amber-500"/><button type="button" onClick={voice} disabled={listening} title="Voice input" className="rounded-lg border border-slate-700 p-2 text-slate-300"><Mic className="h-4 w-4"/></button><button type="submit" disabled={!message.trim()||loading} className="rounded-lg bg-amber-500 p-2 text-slate-950 disabled:opacity-40"><Send className="h-4 w-4"/></button></div><div className="mt-2 text-[9px] text-slate-600">Enter to send · Shift+Enter for a new line</div></form>
      <div className="border-t border-slate-800 bg-slate-950 p-3"><details><summary className="flex cursor-pointer list-none items-center gap-2 text-[10px] font-semibold text-slate-300"><CalendarClock className="h-3.5 w-3.5 text-amber-400"/>5. Schedule a call</summary><form onSubmit={schedule} className="mt-3 grid grid-cols-2 gap-2"><input type="date" min={new Date().toISOString().slice(0,10)} value={profile.callDate} onChange={e=>updateProfile('callDate',e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-[10px] text-white"/><input type="time" value={profile.callTime} onChange={e=>updateProfile('callTime',e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-[10px] text-white"/><button className="col-span-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[10px] font-semibold text-amber-300">Request call at selected time</button></form><p className="mt-2 text-[9px] text-slate-600">Preview mode saves the request on this device. Staff notification/calendar integration is the next backend step.</p></details></div>
      <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-3 py-2 text-[9px] text-slate-600"><span><Phone className="mr-1 inline h-3 w-3"/>{SUPPORT_PHONE}</span><a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-slate-300"><Mail className="mr-1 inline h-3 w-3"/>{SUPPORT_EMAIL}</a><button onClick={deleteConversation} title="Delete conversation"><Trash2 className="h-3 w-3"/></button></div>
    </>}
  </div></div>;
}
