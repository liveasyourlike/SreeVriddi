import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, CalendarClock, Check, ChevronLeft, ChevronRight, Clock3, Download, GripVertical, Mail, Maximize2, MessageSquarePlus, Mic, Minimize2, Phone, Plus, Send, Sparkles, Trash2, X } from 'lucide-react';

const SUPPORT_EMAIL = 'sreevriddhiforwealth@gmail.com';
const SUPPORT_PHONE = '+91 9640352929';
const STORAGE_KEY = 'sreevriddhi-ai-conversations-v4';
const PROFILE_KEY = 'sreevriddhi-ai-profile-v4';
const WINDOW_KEY = 'sreevriddhi-ai-window-v2';
const ASSETS = ['Daily Finance','Physical Gold','Fixed Deposits','Housing Rentals','Vehicle Rentals','Oil & Gas Purchase','Street Foods','Saree Stalls','Fruits & Juice Centers','Kirana Stores','EV & Automobile Workshops','Staff Recruitment Agency','Virtual Stocks','Other / Not sure'];
const QUICK_PROMPTS = ['How does Sree Vriddhi work?','What opportunities are available?','Explain the process in simple words.','What is artificial intelligence?','Write a professional email for me.','What is Python?'];
const TIME_SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00'];

const pad = n => String(n).padStart(2, '0');
const dateKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayKey = dateKey(new Date());
const formatDate = key => {
  if (!key) return '';
  const [y,m,d] = key.split('-').map(Number);
  return new Intl.DateTimeFormat('en-IN', { day:'2-digit', month:'short', year:'numeric' }).format(new Date(y,m-1,d));
};
const formatTime = value => {
  if (!value) return '';
  const [h,m] = value.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${pad(m)} ${suffix}`;
};
const newConversation = () => ({ id:`${Date.now()}-${Math.random().toString(36).slice(2)}`, title:'New conversation', createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(), ended:false, messages:[] });
const monthDays = (monthDate) => {
  const first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const count = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
  const start = first.getDay();
  const cells = [];
  for (let i=0;i<start;i++) cells.push(null);
  for (let d=1;d<=count;d++) cells.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), d));
  while (cells.length % 7) cells.push(null);
  return cells;
};

export default function ChatWidget() {
  const [open,setOpen] = useState(false);
  const [collapsed,setCollapsed] = useState(false);
  const [profileReady,setProfileReady] = useState(false);
  const [profile,setProfile] = useState({fullName:'',email:'',asset:'',amount:'',callDate:'',callTime:''});
  const [conversations,setConversations] = useState([]);
  const [activeId,setActiveId] = useState(null);
  const [message,setMessage] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [listening,setListening] = useState(false);
  const [scheduleOpen,setScheduleOpen] = useState(true);
  const [calendarMonth,setCalendarMonth] = useState(() => new Date(new Date().getFullYear(),new Date().getMonth(),1));
  const [dragging,setDragging] = useState(false);
  const [resizing,setResizing] = useState(false);
  const [position,setPosition] = useState({x:null,y:null});
  const [size,setSize] = useState({width:520,height:760});
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const active = useMemo(() => conversations.find(c=>c.id===activeId) || null,[conversations,activeId]);
  const messages = active?.messages || [];
  const activeCount = conversations.filter(c=>!c.ended).length;
  const cells = useMemo(() => monthDays(calendarMonth),[calendarMonth]);
  const monthLabel = new Intl.DateTimeFormat('en-IN',{month:'long',year:'numeric'}).format(calendarMonth);

  useEffect(() => {
    try {
      const p=JSON.parse(localStorage.getItem(PROFILE_KEY)||'null');
      if(p?.fullName&&p?.email){setProfile(p);setProfileReady(true);}
      const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
      if(saved.length){setConversations(saved);setActiveId(saved[0].id);} else {const c=newConversation();setConversations([c]);setActiveId(c.id);}
      const w=JSON.parse(localStorage.getItem(WINDOW_KEY)||'null');
      if(w?.width)setSize({width:w.width,height:w.height||760});
      if(w?.x!==undefined&&w?.y!==undefined)setPosition({x:w.x,y:w.y});
    } catch { const c=newConversation();setConversations([c]);setActiveId(c.id); }
    const handler=()=>{setOpen(true);setCollapsed(false);};
    window.addEventListener('sreevriddhi:open-ai',handler);
    return()=>window.removeEventListener('sreevriddhi:open-ai',handler);
  },[]);
  useEffect(()=>{if(conversations.length)localStorage.setItem(STORAGE_KEY,JSON.stringify(conversations));},[conversations]);
  useEffect(()=>{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));},[profile]);
  useEffect(()=>{localStorage.setItem(WINDOW_KEY,JSON.stringify({...position,...size}));},[position,size]);

  useEffect(()=>{
    const move=e=>{
      if(dragRef.current){
        const r=dragRef.current;
        setPosition({x:Math.max(8,Math.min(window.innerWidth-r.w-8,e.clientX-r.offsetX)),y:Math.max(8,Math.min(window.innerHeight-r.h-8,e.clientY-r.offsetY))});
      }
      if(resizeRef.current){
        const r=resizeRef.current;
        setSize({width:Math.max(360,Math.min(window.innerWidth-16,e.clientX-r.left)),height:Math.max(500,Math.min(window.innerHeight-16,e.clientY-r.top))});
      }
    };
    const up=()=>{dragRef.current=null;resizeRef.current=null;setDragging(false);setResizing(false);};
    window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);
    return()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);};
  },[]);

  const beginDrag=e=>{
    if(e.button!==0 || e.target.closest('[data-no-drag]')) return;
    const box=e.currentTarget.parentElement.getBoundingClientRect();
    dragRef.current={offsetX:e.clientX-box.left,offsetY:e.clientY-box.top,w:box.width,h:box.height};
    if(position.x===null)setPosition({x:box.left,y:box.top});
    setDragging(true);e.preventDefault();
  };
  const beginResize=e=>{
    if(e.button!==0)return;
    const box=e.currentTarget.parentElement.parentElement.getBoundingClientRect();
    resizeRef.current={left:box.left,top:box.top};setResizing(true);e.preventDefault();e.stopPropagation();
  };

  const saveProfile=e=>{
    e.preventDefault();
    if(!profile.fullName.trim()||!profile.email.trim())return setError('Full name and email are required.');
    if(!/^\S+@\S+\.\S+$/.test(profile.email))return setError('Please enter a valid email address.');
    localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));setProfileReady(true);setError('');
    updateActive(c=>({...c,ended:false,messages:c.messages.length?c.messages:[{role:'assistant',content:`Hi ${profile.fullName.trim()}! Welcome to Sree Vriddhi. I can help with Sree Vriddhi questions as well as general questions. What would you like to know?`,category:'BUSINESS',at:new Date().toISOString()}]}));
  };
  const updateProfile=(k,v)=>setProfile(p=>({...p,[k]:v}));
  const updateActive=fn=>setConversations(items=>items.map(c=>c.id===activeId?{...fn(c),updatedAt:new Date().toISOString()}:c));
  const createConversation=()=>{const c=newConversation();setConversations(items=>[c,...items]);setActiveId(c.id);setMessage('');setError('');setCollapsed(false);};
  const endConversation=()=>{if(!active)return;updateActive(c=>({...c,ended:true}));setError('Conversation ended. Start a new conversation whenever you need help.');};
  const sendText=async text=>{
    const clean=text.trim();if(!clean||loading||!active||active.ended)return;
    const history=messages.map(m=>({role:m.role,content:m.content}));
    updateActive(c=>({...c,title:c.messages.length?c.title:clean.slice(0,45),ended:false,messages:[...c.messages,{role:'user',content:clean,at:new Date().toISOString()}]}));
    setMessage('');setError('');setLoading(true);
    try{
      const r=await fetch('/api/ai/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:clean,history,profile,channel:'website'})});
      const d=await r.json();if(!r.ok)throw new Error(d.error||'Assistant unavailable');
      updateActive(c=>({...c,messages:[...c.messages,{role:'assistant',content:d.answer,category:d.category,risk:d.risk,requiresHuman:d.requiresHuman,at:new Date().toISOString()}]}));
    }catch(e){setError(e.message||'Assistant unavailable');}finally{setLoading(false);}
  };
  const handleKeyDown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();if(message.trim()&&!loading)sendText(message);}};
  const download=()=>{
    if(!active)return;
    const text=[`Sree Vriddhi AI Assistant`,`Customer: ${profile.fullName}`,`Email: ${profile.email}`,`Asset: ${profile.asset||'Not selected'}`,`Amount: ${profile.amount||'Not provided'}`,`Call: ${profile.callDate&&profile.callTime?`${formatDate(profile.callDate)} ${formatTime(profile.callTime)}`:'Not scheduled'}`,`Status: ${active.ended?'Ended':'Active'}`,'',...active.messages.map(m=>`${m.role==='user'?'You':'AI'}: ${m.content}`)].join('\n\n');
    const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`${active.title.replace(/[^a-z0-9]+/gi,'-').toLowerCase()||'sree-vriddhi-chat'}.txt`;a.click();URL.revokeObjectURL(url);
  };
  const schedule=()=>{
    if(!profile.callDate||!profile.callTime)return setError('Choose a future date and an available time slot.');
    if(profile.callDate<todayKey)return setError('Please choose a future date.');
    localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));setError('');setScheduleOpen(false);
    updateActive(c=>({...c,messages:[...c.messages,{role:'assistant',content:`Call request saved for ${formatDate(profile.callDate)} at ${formatTime(profile.callTime)}. This is a request in Preview mode; staff/calendar confirmation is not connected yet.`,category:'BUSINESS',at:new Date().toISOString()}]}));
  };
  const voice=()=>{const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R)return setError('Voice input is not supported by this browser.');const r=new R();r.lang='en-IN';r.interimResults=false;r.onstart=()=>setListening(true);r.onend=()=>setListening(false);r.onerror=()=>{setListening(false);setError('Voice input could not be started.');};r.onresult=e=>setMessage(e.results?.[0]?.[0]?.transcript||'');r.start();};
  const chooseDate=d=>{if(!d)return;if(dateKey(d)<todayKey)return;updateProfile('callDate',dateKey(d));setError('');};
  const previousMonth=()=>setCalendarMonth(d=>new Date(d.getFullYear(),d.getMonth()-1,1));
  const nextMonth=()=>setCalendarMonth(d=>new Date(d.getFullYear(),d.getMonth()+1,1));
  const canPrevious=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth(),1)>new Date(new Date().getFullYear(),new Date().getMonth(),1);

  if(!open)return <div className="fixed bottom-3 right-3 z-[60]"><button onClick={()=>setOpen(true)} className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-white shadow-lg hover:bg-emerald-500"><Bot className="h-4 w-4"/>AI Assistant</button></div>;

  const panelStyle=position.x===null?{width:`min(${size.width}px,calc(100vw - 16px))`,height:collapsed?'auto':`min(${size.height}px,calc(100vh - 16px))`}:{left:position.x,top:position.y,width:Math.min(size.width,window.innerWidth-16),height:collapsed?'auto':Math.min(size.height,window.innerHeight-16)};

  return <div className="fixed z-[60]" style={position.x===null?{right:8,bottom:8}:{...panelStyle}}>
    <div className={`relative flex ${collapsed?'h-auto':'h-full'} w-full flex-col overflow-hidden rounded-2xl border-2 ${dragging?'border-amber-400 shadow-[0_0_30px_rgba(245,158,11,.25)]':'border-slate-700'} bg-slate-900 shadow-2xl`}>
      <div onPointerDown={beginDrag} className="flex shrink-0 cursor-move select-none items-center justify-between border-b border-slate-700 bg-slate-950 px-3 py-2.5" title="Drag the header to move the assistant">
        <div className="flex min-w-0 items-center gap-2"><div className="rounded-full bg-emerald-500/15 p-2"><Bot className="h-4 w-4 text-emerald-400"/></div><div className="min-w-0"><strong className="block truncate text-sm text-white">Sree Vriddhi AI Assistant</strong><span className="text-[10px] text-emerald-300">Business + General AI · {activeCount} active</span></div></div>
        <div className="flex items-center gap-0.5" data-no-drag><button onClick={createConversation} title="Start new conversation" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"><MessageSquarePlus className="h-4 w-4"/></button><button onClick={download} disabled={!messages.length} title="Download conversation" className="rounded-lg p-1.5 text-slate-400 disabled:opacity-30 hover:bg-slate-800 hover:text-white"><Download className="h-4 w-4"/></button><button onClick={()=>setCollapsed(v=>!v)} title={collapsed?'Expand':'Collapse'} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white">{collapsed?<Maximize2 className="h-4 w-4"/>:<Minimize2 className="h-4 w-4"/>}</button><button onClick={()=>setOpen(false)} title="Close" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"><X className="h-4 w-4"/></button></div>
      </div>

      {!collapsed&&<>
      {!profileReady?<div className="flex-1 overflow-y-auto p-4"><div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4"><div className="flex items-center gap-2 text-white"><Sparkles className="h-5 w-5 text-amber-400"/><strong>Before we start</strong></div><p className="mt-1 text-xs leading-5 text-slate-400">A few details help the assistant understand what you need.</p></div><form onSubmit={saveProfile} className="space-y-3"><label className="block text-xs text-slate-300">1. Full name<input required value={profile.fullName} onChange={e=>updateProfile('fullName',e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" placeholder="Your full name"/></label><label className="block text-xs text-slate-300">2. Email<input required type="email" value={profile.email} onChange={e=>updateProfile('email',e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" placeholder="you@example.com"/></label><label className="block text-xs text-slate-300">3. Asset / area of interest<select value={profile.asset} onChange={e=>updateProfile('asset',e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"><option value="">Select an option</option>{ASSETS.map(a=><option key={a}>{a}</option>)}</select></label><label className="block text-xs text-slate-300">4. Money you are considering<input value={profile.amount} onChange={e=>updateProfile('amount',e.target.value)} inputMode="decimal" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" placeholder="Amount (₹)"/></label><button className="w-full rounded-lg bg-amber-500 px-3 py-2.5 text-xs font-semibold text-slate-950">Start conversation</button></form>{error&&<div className="mt-3 text-[10px] text-red-300">{error}</div>}</div>:<>
        <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-slate-800 bg-slate-950 p-2">{conversations.slice(0,8).map(c=><button key={c.id} onClick={()=>{setActiveId(c.id);setError('');}} data-no-drag className={`max-w-[140px] shrink-0 rounded-lg px-2 py-1.5 text-[9px] ${c.id===activeId?'bg-amber-500/15 text-amber-300':'text-slate-500 hover:bg-slate-900'}`}>{c.title}{c.ended?' · ended':''}</button>)}<button onClick={createConversation} data-no-drag className="shrink-0 rounded-lg border border-slate-800 px-2 py-1.5 text-[9px] text-slate-400">+ New</button></div>
        <div className="flex shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-3 py-2 text-[9px] text-slate-500"><span className="truncate">{profile.fullName} · {profile.email}</span><button onClick={()=>setProfileReady(false)} data-no-drag className="shrink-0 text-amber-400">Edit details</button></div>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">{messages.length===0&&<div className="space-y-3"><div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4"><div className="flex items-center gap-2 text-white"><Sparkles className="h-4 w-4 text-amber-400"/><strong className="text-sm">How can I help?</strong></div><p className="mt-1 text-xs text-slate-400">Ask about Sree Vriddhi or any general question.</p></div><div className="grid gap-2 sm:grid-cols-2">{QUICK_PROMPTS.map(p=><button key={p} onClick={()=>sendText(p)} data-no-drag className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-left text-[10px] text-slate-200 hover:border-amber-500/30">{p}</button>)}</div></div>}{messages.map((m,i)=><div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[90%] rounded-xl p-3 text-xs leading-5 ${m.role==='user'?'bg-emerald-600/20 text-white':'border border-slate-800 bg-slate-950/80 text-slate-200'}`}><div className="mb-1 text-[9px] uppercase tracking-wider text-slate-500">{m.role==='user'?'You':'AI'}{m.category?` · ${m.category}`:''}</div><div className="whitespace-pre-wrap">{m.content}</div></div></div>)}{loading&&<div className="text-xs text-slate-500">AI is preparing a response…</div>}{error&&<div className="rounded-lg border border-red-500/30 bg-red-500/5 p-2 text-[10px] text-red-300">{error}</div>}</div>
        <form onSubmit={e=>{e.preventDefault();sendText(message)}} className="shrink-0 border-t border-slate-800 bg-slate-950 p-3"><div className="flex items-end gap-2"><textarea disabled={active?.ended} value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={handleKeyDown} rows={2} maxLength={4000} placeholder={active?.ended?'Conversation ended — start a new conversation':'Ask anything… Enter to send'} className="min-w-0 flex-1 resize-none rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-amber-500 disabled:opacity-50"/><button type="button" onClick={voice} disabled={listening||active?.ended} title="Voice input" data-no-drag className="rounded-lg border border-slate-700 p-2 text-slate-300"><Mic className="h-4 w-4"/></button><button type="submit" disabled={!message.trim()||loading||active?.ended} data-no-drag className="rounded-lg bg-amber-500 p-2 text-slate-950 disabled:opacity-40"><Send className="h-4 w-4"/></button></div><div className="mt-2 text-[9px] text-slate-600">Enter to send · Shift+Enter for a new line</div></form>

        <div className="shrink-0 border-t border-slate-800 bg-slate-950 p-3"><button type="button" onClick={()=>setScheduleOpen(v=>!v)} data-no-drag className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-left"><span className="flex items-center gap-2 text-[10px] font-semibold text-slate-200"><CalendarClock className="h-4 w-4 text-amber-400"/>5. Schedule a call</span><span className="text-[9px] text-amber-300">{profile.callDate&&profile.callTime?`${formatDate(profile.callDate)} · ${formatTime(profile.callTime)}`:'Choose date & time'}</span></button>
          {scheduleOpen&&<div className="mt-3 rounded-xl border border-amber-500/20 bg-slate-900 p-3"><div className="mb-2 flex items-center justify-between"><button type="button" onClick={previousMonth} disabled={!canPrevious} data-no-drag className="rounded-full border border-slate-700 p-1.5 text-slate-300 disabled:opacity-30"><ChevronLeft className="h-4 w-4"/></button><strong className="text-xs text-white">{monthLabel}</strong><button type="button" onClick={nextMonth} data-no-drag className="rounded-full border border-slate-700 p-1.5 text-slate-300"><ChevronRight className="h-4 w-4"/></button></div><div className="grid grid-cols-7 gap-1 text-center text-[8px] text-slate-500 mb-1">{['S','M','T','W','T','F','S'].map((d,i)=><span key={`${d}-${i}`}>{d}</span>)}</div><div className="grid grid-cols-7 gap-1">{cells.map((d,i)=>{const key=d?dateKey(d):`empty-${i}`;const selected=d&&dateKey(d)===profile.callDate;const disabled=!d||dateKey(d)<todayKey;return <button key={key} type="button" disabled={disabled} onClick={()=>chooseDate(d)} data-no-drag className={`aspect-square rounded-full text-[10px] transition ${selected?'bg-amber-500 font-bold text-slate-950 ring-2 ring-amber-300':'bg-slate-950 text-slate-200 hover:bg-amber-500/20'} ${disabled?'cursor-not-allowed opacity-20':''}`}>{d?.getDate()}</button>;})}</div>
            <div className="mt-3 flex items-center gap-2 text-[9px] font-semibold text-slate-300"><Clock3 className="h-3.5 w-3.5 text-amber-400"/>Available times <span className="font-normal text-slate-500">(IST)</span></div><div className="mt-2 grid max-h-28 grid-cols-4 gap-1.5 overflow-y-auto pr-1">{TIME_SLOTS.map(t=><button key={t} type="button" disabled={!profile.callDate} onClick={()=>{updateProfile('callTime',t);setError('');}} data-no-drag className={`rounded-full border px-1.5 py-1.5 text-[9px] ${profile.callTime===t?'border-amber-400 bg-amber-500 text-slate-950 font-semibold':'border-slate-700 bg-slate-950 text-slate-300 hover:border-amber-500/50'} disabled:cursor-not-allowed disabled:opacity-30`}>{formatTime(t)}</button>)}</div><div className="mt-3 rounded-lg border border-slate-800 bg-slate-950 p-2 text-center text-[9px] text-slate-400">{profile.callDate&&profile.callTime?<><span className="text-slate-500">Selected:</span> <strong className="text-white">{formatDate(profile.callDate)} · {formatTime(profile.callTime)}</strong></>:<span>Select a date, then a time slot.</span>}</div><button type="button" onClick={schedule} disabled={!profile.callDate||!profile.callTime} data-no-drag className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-[10px] font-semibold text-slate-950 disabled:opacity-40"><Check className="h-3.5 w-3.5"/>Request call at selected time</button><p className="mt-2 text-[8px] leading-4 text-slate-600">Preview mode: this records the requested slot on this device. Calendar/staff confirmation will be connected in the backend step.</p></div>}
        </div>
        <div className="flex shrink-0 items-center justify-between border-t border-slate-800 bg-slate-950 px-3 py-2"><div className="flex gap-3 text-[9px] text-slate-500"><a href={`tel:${SUPPORT_PHONE.replace(/\s/g,'')}`} className="flex items-center gap-1 hover:text-white"><Phone className="h-3 w-3"/>{SUPPORT_PHONE}</a><a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-1 hover:text-white"><Mail className="h-3 w-3"/>Email</a></div><div className="flex items-center gap-1" data-no-drag><button onClick={download} disabled={!messages.length} title="Download" className="rounded p-1.5 text-slate-500 hover:bg-slate-800 hover:text-white disabled:opacity-30"><Download className="h-3.5 w-3.5"/></button><button onClick={endConversation} disabled={!active||active.ended} title="End conversation" className="rounded p-1.5 text-slate-500 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-30"><Trash2 className="h-3.5 w-3.5"/></button><button onClick={createConversation} title="Start new" className="rounded border border-slate-700 px-2 py-1 text-[9px] text-slate-300 hover:border-amber-500/50">Start New</button></div></div>
      </>}
      <div onPointerDown={beginResize} data-no-drag title="Drag to resize" className="absolute bottom-0 right-0 z-20 flex h-7 w-7 cursor-nwse-resize items-end justify-end rounded-tl-lg border-l border-t border-amber-500/50 bg-slate-950/95 p-1.5 shadow-lg"><GripVertical className="h-4 w-4 rotate-[-45deg] text-amber-400"/></div>
    </div>
  </div>;
}
