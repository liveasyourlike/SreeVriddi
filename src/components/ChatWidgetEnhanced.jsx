import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bot, CalendarClock, Check, ChevronLeft, ChevronRight, Download, File, Maximize2,
  MessageSquarePlus, Mic, Minimize2, Paperclip, Phone, Send, Sparkles, X
} from 'lucide-react';
import './ChatWidget.css';

const SUPPORT_EMAIL = 'sreevriddhiforwealth@gmail.com';
const SUPPORT_PHONE = '+91 9640352929';
const STORAGE_KEY = 'sreevriddhi-ai-conversations-v5';
const PROFILE_KEY = 'sreevriddhi-ai-profile-v5';
const CONTACTS_KEY = 'sreevriddhi-ai-contacts-v1';
const WINDOW_KEY = 'sreevriddhi-ai-window-v3';
const DB_NAME = 'sreevriddhi-customer-files';
const DB_VERSION = 1;
const STORE_NAME = 'attachments';
const MAX_FILE_BYTES = 10 * 1024 * 1024;

const ASSETS = ['Daily Finance','Physical Gold','Fixed Deposits','Housing Rentals','Vehicle Rentals','Oil & Gas Purchase','Street Foods','Saree Stalls','Fruits & Juice Centers','Kirana Stores','EV & Automobile Workshops','Staff Recruitment Agency','Virtual Stocks','Other / Not sure'];
const QUICK_PROMPTS = ['How does Sree Vriddhi work?','What opportunities are available?','Explain the process in simple words.','What is artificial intelligence?','What is the contact number?'];
const TIME_SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00'];

const pad = n => String(n).padStart(2, '0');
const dateKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayKey = dateKey(new Date());
const formatDate = key => {
  if (!key) return '';
  const [y,m,d] = key.split('-').map(Number);
  return new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(y,m-1,d));
};
const formatTime = value => {
  if (!value) return '';
  const [h,m] = value.split(':').map(Number);
  return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`;
};
const newConversation = () => ({
  id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,
  title:'New conversation',
  createdAt:new Date().toISOString(),
  updatedAt:new Date().toISOString(),
  ended:false,
  messages:[]
});
const getMonthCells = monthDate => {
  const first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const total = new Date(monthDate.getFullYear(), monthDate.getMonth()+1, 0).getDate();
  const cells = Array(first.getDay()).fill(null);
  for(let day=1;day<=total;day++) cells.push(new Date(monthDate.getFullYear(),monthDate.getMonth(),day));
  while(cells.length%7) cells.push(null);
  return cells;
};

function openDb() {
  return new Promise((resolve,reject) => {
    if (!window.indexedDB) return reject(new Error('IndexedDB unavailable'));
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME,{keyPath:'id'});
        store.createIndex('email','email',{unique:false});
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function saveAttachment(record) {
  const db = await openDb();
  return new Promise((resolve,reject) => {
    const tx = db.transaction(STORE_NAME,'readwrite');
    tx.objectStore(STORE_NAME).put(record);
    tx.oncomplete = () => { db.close(); resolve(record); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}
async function getAttachments(email) {
  if (!email || !window.indexedDB) return [];
  const db = await openDb();
  return new Promise((resolve,reject) => {
    const tx = db.transaction(STORE_NAME,'readonly');
    const req = tx.objectStore(STORE_NAME).index('email').getAll(email.toLowerCase().trim());
    req.onsuccess = () => { db.close(); resolve(req.result || []); };
    req.onerror = () => { db.close(); reject(req.error); };
  });
}
function downloadBlob(blob,name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href=url; a.download=name; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

export default function ChatWidgetEnhanced() {
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
  const [scheduleOpen,setScheduleOpen] = useState(false);
  const [calendarMonth,setCalendarMonth] = useState(()=>new Date(new Date().getFullYear(),new Date().getMonth(),1));
  const [position,setPosition] = useState({x:null,y:null});
  const [size,setSize] = useState({width:520,height:760});
  const [dragging,setDragging] = useState(false);
  const [attachments,setAttachments] = useState([]);
  const [uploading,setUploading] = useState(false);
  const inputRef = useRef(null);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);

  const active = useMemo(()=>conversations.find(c=>c.id===activeId)||null,[conversations,activeId]);
  const messages = active?.messages || [];
  const activeCount = conversations.filter(c=>!c.ended).length;
  const cells = useMemo(()=>getMonthCells(calendarMonth),[calendarMonth]);
  const monthLabel = new Intl.DateTimeFormat('en-IN',{month:'long',year:'numeric'}).format(calendarMonth);
  const canPrevious = new Date(calendarMonth.getFullYear(),calendarMonth.getMonth(),1) > new Date(new Date().getFullYear(),new Date().getMonth(),1);

  useEffect(()=>{
    try {
      const p=JSON.parse(localStorage.getItem(PROFILE_KEY)||'null');
      if(p?.fullName&&p?.email){setProfile(p);setProfileReady(true);}
      const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
      if(saved.length){setConversations(saved);setActiveId(saved[0].id);}
      else {const c=newConversation();setConversations([c]);setActiveId(c.id);}
      const w=JSON.parse(localStorage.getItem(WINDOW_KEY)||'null');
      if(w?.width)setSize({width:w.width,height:w.height||760});
      if(w?.x!==undefined&&w?.y!==undefined)setPosition({x:w.x,y:w.y});
    } catch {
      const c=newConversation(); setConversations([c]); setActiveId(c.id);
    }
    const handler=()=>{setOpen(true);setCollapsed(false);};
    window.addEventListener('sreevriddhi:open-ai',handler);
    return()=>window.removeEventListener('sreevriddhi:open-ai',handler);
  },[]);
  useEffect(()=>{if(conversations.length)localStorage.setItem(STORAGE_KEY,JSON.stringify(conversations));},[conversations]);
  useEffect(()=>{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));},[profile]);
  useEffect(()=>{localStorage.setItem(WINDOW_KEY,JSON.stringify({...position,...size}));},[position,size]);
  useEffect(()=>{
    if(!profile.email)return;
    getAttachments(profile.email).then(setAttachments).catch(()=>setAttachments([]));
  },[profile.email]);

  useEffect(()=>{
    const move=e=>{
      if(dragRef.current){
        const r=dragRef.current;
        setPosition({x:Math.max(8,Math.min(window.innerWidth-r.width-8,e.clientX-r.offsetX)),y:Math.max(8,Math.min(window.innerHeight-r.height-8,e.clientY-r.offsetY))});
      }
      if(resizeRef.current){
        const r=resizeRef.current;
        setSize({width:Math.max(380,Math.min(window.innerWidth-16,e.clientX-r.left)),height:Math.max(560,Math.min(window.innerHeight-16,e.clientY-r.top))});
      }
    };
    const up=()=>{dragRef.current=null;resizeRef.current=null;setDragging(false);};
    window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);
    return()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);};
  },[]);

  const updateActive=fn=>setConversations(items=>items.map(c=>c.id===activeId?{...fn(c),updatedAt:new Date().toISOString()}:c));
  const updateProfile=(key,value)=>setProfile(p=>({...p,[key]:value}));

  const beginDrag=e=>{
    if(e.button!==0||e.target.closest('[data-no-drag]'))return;
    const box=e.currentTarget.parentElement.getBoundingClientRect();
    dragRef.current={offsetX:e.clientX-box.left,offsetY:e.clientY-box.top,width:box.width,height:box.height};
    if(position.x===null)setPosition({x:box.left,y:box.top});
    setDragging(true);e.preventDefault();
  };
  const beginResize=e=>{
    if(e.button!==0)return;
    const box=e.currentTarget.parentElement.parentElement.getBoundingClientRect();
    resizeRef.current={left:box.left,top:box.top};e.preventDefault();e.stopPropagation();
  };

  const saveProfile=e=>{
    e.preventDefault();
    if(!profile.fullName.trim()||!profile.email.trim())return setError('Full name and email are required.');
    if(!/^\S+@\S+\.\S+$/.test(profile.email))return setError('Please enter a valid email address.');
    localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));
    try {
      const contacts=JSON.parse(localStorage.getItem(CONTACTS_KEY)||'[]');
      const next={...profile,updatedAt:new Date().toISOString()};
      const merged=[next,...contacts.filter(c=>c.email?.toLowerCase()!==profile.email.toLowerCase())];
      localStorage.setItem(CONTACTS_KEY,JSON.stringify(merged));
    } catch {}
    setProfileReady(true);setError('');
    updateActive(c=>({...c,ended:false,messages:c.messages.length?c.messages:[{role:'assistant',content:`Hi ${profile.fullName.trim()}! Welcome to Sree Vriddhi. I can help with Sree Vriddhi questions and general questions. What would you like to know?`,category:'BUSINESS',at:new Date().toISOString()}]}));
  };
  const createConversation=()=>{
    const c=newConversation();setConversations(items=>[c,...items]);setActiveId(c.id);setMessage('');setError('');setCollapsed(false);
  };
  const endConversation=()=>{
    if(!active||active.ended)return;
    updateActive(c=>({...c,ended:true}));setError('Conversation ended. Select Start New to continue.');
  };
  const sendText=async text=>{
    const clean=text.trim();
    if(!clean||loading||!active||active.ended)return;
    const history=messages.map(m=>({role:m.role,content:m.content}));
    updateActive(c=>({...c,title:c.messages.length?c.title:clean.slice(0,45),ended:false,messages:[...c.messages,{role:'user',content:clean,at:new Date().toISOString()}]}));
    setMessage('');setError('');setLoading(true);
    try{
      const r=await fetch('/api/ai/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:clean,history,profile,channel:'website'})});
      const d=await r.json();if(!r.ok)throw new Error(d.error||'Assistant unavailable');
      updateActive(c=>({...c,messages:[...c.messages,{role:'assistant',content:d.answer,category:d.category,risk:d.risk,requiresHuman:d.requiresHuman,at:new Date().toISOString()}]}));
    }catch(e){setError(e.message||'Assistant unavailable');}finally{setLoading(false);}
  };
  const handleKeyDown=e=>{
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();if(message.trim()&&!loading)sendText(message);}
  };
  const downloadConversation=()=>{
    if(!active)return;
    const text=[`Sree Vriddhi AI Assistant`,`Customer: ${profile.fullName}`,`Email: ${profile.email}`,`Asset: ${profile.asset||'Not selected'}`,`Amount: ${profile.amount||'Not provided'}`,`Call: ${profile.callDate&&profile.callTime?`${formatDate(profile.callDate)} ${formatTime(profile.callTime)}`:'Not scheduled'}`,`Status: ${active.ended?'Ended':'Active'}`,'',...active.messages.map(m=>`${m.role==='user'?'You':'AI'}: ${m.content}`)].join('\n\n');
    downloadBlob(new Blob([text],{type:'text/plain;charset=utf-8'}),`${active.title.replace(/[^a-z0-9]+/gi,'-').toLowerCase()||'sree-vriddhi-chat'}.txt`);
  };
  const chooseDate=d=>{if(!d||dateKey(d)<todayKey)return;updateProfile('callDate',dateKey(d));setError('');};
  const requestCall=()=>{
    if(!profile.callDate||!profile.callTime)return setError('Choose a future date and an available time slot.');
    if(profile.callDate<todayKey)return setError('Please choose a future date.');
    localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));setError('');setScheduleOpen(false);
    updateActive(c=>({...c,messages:[...c.messages,{role:'assistant',content:`Call request saved for ${formatDate(profile.callDate)} at ${formatTime(profile.callTime)}. This is a Preview request; calendar confirmation is not connected yet.`,category:'BUSINESS',at:new Date().toISOString()}]}));
  };
  const voice=()=>{
    const R=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!R)return setError('Voice input is not supported by this browser.');
    const r=new R();r.lang='en-IN';r.interimResults=false;r.onstart=()=>setListening(true);r.onend=()=>setListening(false);r.onerror=()=>{setListening(false);setError('Voice input could not be started.');};r.onresult=e=>setMessage(e.results?.[0]?.[0]?.transcript||'');r.start();
  };

  const handleFiles=async fileList=>{
    const files=Array.from(fileList||[]);
    if(!files.length||!profile.email)return;
    setUploading(true);setError('');
    try{
      const saved=[];
      for(const file of files){
        if(file.size>MAX_FILE_BYTES){setError(`${file.name} is larger than 10 MB and was not uploaded.`);continue;}
        const record={id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,email:profile.email.toLowerCase().trim(),name:file.name,type:file.type||'application/octet-stream',size:file.size,uploadedAt:new Date().toISOString(),blob:file};
        await saveAttachment(record);saved.push(record);
      }
      if(saved.length){
        setAttachments(items=>[...saved,...items]);
        updateActive(c=>({...c,messages:[...c.messages,{role:'user',content:`Uploaded ${saved.map(f=>f.name).join(', ')}`,attachments:saved.map(f=>({id:f.id,name:f.name,type:f.type,size:f.size})),at:new Date().toISOString()}]}));
      }
    }catch(e){setError('The file could not be stored in this browser. Please try again.');}
    finally{setUploading(false);if(inputRef.current)inputRef.current.value='';}
  };
  const onFileChange=e=>handleFiles(e.target.files);
  const downloadAttachment=file=>downloadBlob(file.blob,file.name);

  const panelStyle=position.x===null
    ?{right:8,bottom:8,width:`min(${size.width}px,calc(100vw - 16px))`,height:collapsed?'auto':`min(${size.height}px,calc(100vh - 16px))`}
    :{left:position.x,top:position.y,width:Math.min(size.width,window.innerWidth-16),height:collapsed?'auto':Math.min(size.height,window.innerHeight-16)};

  if(!open)return <div className="fixed bottom-3 right-3 z-[60]"><button onClick={()=>setOpen(true)} className="sv-chat-launch"><Bot size={17}/>AI Assistant</button></div>;

  return <div className="fixed z-[60]" style={panelStyle}>
    <section className={`sv-chat-shell ${collapsed?'sv-chat-collapsed':''} ${dragging?'sv-chat-dragging':''}`}>
      <header className="sv-chat-header" onPointerDown={beginDrag} title="Drag this header to move the assistant">
        <div className="sv-chat-brand"><span className="sv-chat-bot"><Bot size={18}/></span><div><strong>Sree Vriddhi AI Assistant</strong><span>Business + General AI · {activeCount} active</span></div></div>
        <div className="sv-chat-actions" data-no-drag>
          <button onClick={createConversation} title="Start new conversation"><MessageSquarePlus size={17}/></button>
          <button onClick={downloadConversation} disabled={!messages.length} title="Download conversation"><Download size={17}/></button>
          <button onClick={()=>setCollapsed(v=>!v)} title={collapsed?'Expand':'Collapse'}>{collapsed?<Maximize2 size={17}/>:<Minimize2 size={17}/>}</button>
          <button onClick={()=>setOpen(false)} title="Close"><X size={18}/></button>
        </div>
      </header>
      {!collapsed&&<div className="sv-chat-body">
        {!profileReady?(
          <form className="sv-prechat" onSubmit={saveProfile}>
            <div className="sv-prechat-title"><Sparkles size={18}/>Before we start</div>
            <p>Tell us a few details so the assistant can give more relevant help.</p>
            <label>Full name<input value={profile.fullName} onChange={e=>updateProfile('fullName',e.target.value)} placeholder="Your full name"/></label>
            <label>Email<input type="email" value={profile.email} onChange={e=>updateProfile('email',e.target.value)} placeholder="you@example.com"/></label>
            <label>Asset<select value={profile.asset} onChange={e=>updateProfile('asset',e.target.value)}><option value="">Select an asset</option>{ASSETS.map(a=><option key={a}>{a}</option>)}</select></label>
            <label>Money investing<input value={profile.amount} onChange={e=>updateProfile('amount',e.target.value)} placeholder="e.g. ₹50,000"/></label>
            <button className="sv-primary" type="submit">Start conversation <Send size={15}/></button>
          </form>
        ):(
          <>
            <div className="sv-conv-toolbar"><span>{profile.fullName} · {profile.email}</span><button onClick={()=>{setProfileReady(false);setError('');}}>Edit details</button></div>
            <div className="sv-message-list">
              {!messages.length&&<div className="sv-empty"><Sparkles size={24}/><strong>How can I help?</strong><span>Ask about Sree Vriddhi or any general question.</span><div className="sv-quick-grid">{QUICK_PROMPTS.map(q=><button key={q} onClick={()=>sendText(q)}>{q}</button>)}</div></div>}
              {messages.map((m,i)=><div key={`${m.at}-${i}`} className={`sv-message-row ${m.role==='user'?'sv-user':'sv-ai'}`}>
                <div className="sv-message-meta">{m.role==='user'?'You':'Sree Vriddhi AI'}{m.category&&m.role==='assistant'?` · ${m.category}`:''}</div>
                <div className="sv-message-bubble">{m.content}</div>
                {m.attachments?.map(a=><div className="sv-inline-attachment" key={a.id}><File size={16}/><span>{a.name}</span></div>)}
              </div>)}
              {loading&&<div className="sv-message-row sv-ai"><div className="sv-message-meta">Sree Vriddhi AI</div><div className="sv-message-bubble sv-typing">Thinking…</div></div>}
            </div>

            <div className="sv-composer">
              <input ref={inputRef} type="file" multiple onChange={onFileChange} style={{display:'none'}} />
              <button className="sv-icon-btn" onClick={()=>inputRef.current?.click()} title="Attach files up to 10 MB each" disabled={uploading||active?.ended}><Paperclip size={18}/></button>
              <textarea value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={handleKeyDown} disabled={loading||active?.ended} placeholder="Type your message… Press Enter to send" rows={2}/>
              <button className="sv-icon-btn" onClick={voice} title="Voice input" disabled={active?.ended}>{listening?<span>●</span>:<Mic size={18}/>}</button>
              <button className="sv-send" onClick={()=>sendText(message)} disabled={!message.trim()||loading||active?.ended} title="Send"><Send size={18}/></button>
            </div>
            <div className="sv-composer-help">Any file format · max 10 MB per file · Enter sends · Shift+Enter adds a new line</div>
            {error&&<div className="sv-error">{error}</div>}

            <div className="sv-attachments">
              <div className="sv-section-head"><strong>Customer attachments</strong><span>{attachments.length} stored</span></div>
              {!attachments.length?<div className="sv-muted">Uploaded files for this email will appear here.</div>:attachments.slice(0,6).map(file=><div className="sv-file-row" key={file.id}><File size={17}/><div><strong title={file.name}>{file.name}</strong><span>{(file.size/1024/1024).toFixed(2)} MB · {new Date(file.uploadedAt).toLocaleString('en-IN')}</span></div><button onClick={()=>downloadAttachment(file)} title="Download"><Download size={16}/></button></div>)}
            </div>

            <div className="sv-schedule">
              <button className="sv-schedule-head" onClick={()=>setScheduleOpen(v=>!v)}><span><CalendarClock size={17}/>5. Schedule a call</span><span>{scheduleOpen?'−':'+'}</span></button>
              {scheduleOpen&&<div className="sv-schedule-content">
                <div className="sv-calendar-head"><button onClick={()=>setCalendarMonth(new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()-1,1))} disabled={!canPrevious}><ChevronLeft size={17}/></button><strong>{monthLabel}</strong><button onClick={()=>setCalendarMonth(new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()+1,1))}><ChevronRight size={17}/></button></div>
                <div className="sv-weekdays">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><span key={d}>{d}</span>)}</div>
                <div className="sv-calendar">{cells.map((d,i)=>{const key=d?dateKey(d):'';const selected=key&&key===profile.callDate;const disabled=!d||key<todayKey;return <button key={i} disabled={disabled} className={selected?'selected':''} onClick={()=>chooseDate(d)}>{d?d.getDate():''}</button>})}</div>
                <div className="sv-time-title">Available time · IST</div>
                <div className="sv-time-grid">{TIME_SLOTS.map(t=><button key={t} className={profile.callTime===t?'selected':''} disabled={!profile.callDate} onClick={()=>updateProfile('callTime',t)}>{formatTime(t)}</button>)}</div>
                {profile.callDate&&profile.callTime&&<div className="sv-selected-booking">Selected: <strong>{formatDate(profile.callDate)} · {formatTime(profile.callTime)}</strong><button onClick={requestCall}><Check size={15}/>Request call</button></div>}
              </div>}
            </div>
            <div className="sv-chat-footer"><span><Phone size={13}/>{SUPPORT_PHONE}</span><span>·</span><span>{SUPPORT_EMAIL}</span><button onClick={endConversation}>End conversation</button></div>
          </>
        )}
      </div>}
      {!collapsed&&<div className="sv-resize-handle" onPointerDown={beginResize} title="Drag to resize"><span>↘</span></div>}
    </section>
  </div>;
}
