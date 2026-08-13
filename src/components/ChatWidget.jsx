import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bot, CalendarDays, ChevronLeft, ChevronRight, Clock3, Download, ExternalLink,
  FileUp, Maximize2, Mic, Minus, Move, Paperclip, Phone, Plus, Send,
  UserRound, X
} from 'lucide-react';

const STORE = 'sv_ai_workspace_v4';
const DB_NAME = 'sv_ai_attachments_v1';
const DB_STORE = 'files';
const PHONE = '+91 9640352929';
const EMAIL = 'sreevriddhiforwealth@gmail.com';
const WHATSAPP = 'https://wa.me/919640352929';
const ASSETS = [
  'Daily finance', 'Physical gold', 'Fixed Deposits', 'Housing Rentals', 'Vehicle Rentals',
  'Oil & Gas Purchase', 'Retail Businesses', 'EV and automobiles workshops',
  'Staff Recruitment Agency', 'Virtual Stocks'
];

const defaultGeometry = { x: null, y: null, width: 440, height: 700 };
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const readStore = () => {
  try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { return {}; }
};
const writeStore = (value) => localStorage.setItem(STORE, JSON.stringify(value));
const id = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const downloadBlob = (name, blob, type) => {
  const url = URL.createObjectURL(blob instanceof Blob ? blob : new Blob([blob], { type: type || 'text/plain' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

function openAttachmentDb() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return reject(new Error('Browser storage is unavailable.'));
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(DB_STORE, { keyPath: 'id' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open attachment storage.'));
  });
}

async function saveAttachmentBlob(record) {
  const db = await openAttachmentDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).put(record);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error || new Error('Could not save attachment.'));
  });
  db.close();
}

async function getAttachmentBlob(fileId) {
  const db = await openAttachmentDb();
  const result = await new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readonly');
    const request = tx.objectStore(DB_STORE).get(fileId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not read attachment.'));
  });
  db.close();
  return result;
}

function CalendarPicker({ value, onChange }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const initial = value ? new Date(`${value}T00:00:00`) : today;
  const [cursor, setCursor] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));
  const days = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();
    const count = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    return [...Array(first).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];
  }, [cursor]);
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const prevDisabled = cursor <= thisMonth;
  return (
    <div className="sv-cal">
      <div className="sv-cal-head">
        <button type="button" disabled={prevDisabled} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}><ChevronLeft /></button>
        <strong>{cursor.toLocaleString('en-IN', { month: 'long', year: 'numeric' })}</strong>
        <button type="button" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}><ChevronRight /></button>
      </div>
      <div className="sv-week">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((x, i) => <span key={`${x}-${i}`}>{x}</span>)}</div>
      <div className="sv-days">
        {days.map((day, i) => {
          if (!day) return <span key={`empty-${i}`} />;
          const dt = new Date(cursor.getFullYear(), cursor.getMonth(), day);
          const iso = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          return <button type="button" key={iso} disabled={dt < today} className={value === iso ? 'selected' : ''} onClick={() => onChange(iso)}>{day}</button>;
        })}
      </div>
    </div>
  );
}

function ClockPicker({ hour, minute, ampm, onChange }) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <div className="sv-clock-picker">
      <div className="sv-clock-title"><Clock3 /> Choose call time</div>
      <div className="sv-clock-face">
        <div className="sv-clock-center" />
        {hours.map((h) => {
          const angle = ((h - 3) * Math.PI) / 6;
          const left = 50 + Math.cos(angle) * 39;
          const top = 50 + Math.sin(angle) * 39;
          return <button type="button" key={h} className={Number(hour) === h ? 'selected' : ''} style={{ left: `${left}%`, top: `${top}%` }} onClick={() => onChange(String(h), minute, ampm)}>{h}</button>;
        })}
      </div>
      <div className="sv-clock-controls">
        <div className="sv-minute-pills">{['00', '30'].map((m) => <button type="button" className={minute === m ? 'selected' : ''} key={m} onClick={() => onChange(hour || '12', m, ampm)}>{m} min</button>)}</div>
        <div className="sv-ampm"><button type="button" className={ampm === 'AM' ? 'selected' : ''} onClick={() => onChange(hour || '12', minute, 'AM')}>AM</button><button type="button" className={ampm === 'PM' ? 'selected' : ''} onClick={() => onChange(hour || '12', minute, 'PM')}>PM</button></div>
      </div>
      <div className="sv-selected-time">{hour ? `${String(hour).padStart(2, '0')}:${minute} ${ampm}` : 'Select a time'}</div>
    </div>
  );
}

function MessageContent({ content }) {
  const text = String(content || '');
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return <>{parts.map((part, i) => {
    if (/^https?:\/\//i.test(part)) {
      const cleanUrl = part.replace(/[),.;!?]+$/g, '');
      const trailing = part.slice(cleanUrl.length);
      return <React.Fragment key={i}><a className="sv-inline-link" href={cleanUrl} target="_blank" rel="noopener noreferrer">{cleanUrl}</a>{trailing}</React.Fragment>;
    }
    return <React.Fragment key={i}>{part.split('\n').map((line, j) => <React.Fragment key={`${i}-${j}`}>{j > 0 && <br />}{line}</React.Fragment>)}</React.Fragment>;
  })}</>;
}

function Sources({ sources = [] }) {
  if (!sources.length) return null;
  return <div className="sv-sources"><span className="sv-sources-label">Sources &amp; actions</span><div className="sv-source-list">{sources.map((s, i) => <a key={`${s.url}-${i}`} href={s.url} target="_blank" rel="noopener noreferrer" className="sv-source-link"><ExternalLink />{s.label}</a>)}</div></div>;
}

function makeSession(profile, greeting) {
  return { id: id(), email: profile.email, name: profile.name, title: 'New conversation', status: 'active', startedAt: new Date().toISOString(), messages: [{ role: 'assistant', content: greeting }], attachments: [] };
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [draft, setDraft] = useState({ name: '', email: '', asset: '', amount: '' });
  const [sessions, setSessions] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileError, setFileError] = useState('');
  const [booking, setBooking] = useState(false);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmpm] = useState('AM');
  const [attachments, setAttachments] = useState([]);
  const [listening, setListening] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [geometry, setGeometry] = useState(defaultGeometry);
  const scrollRef = useRef(null);
  const fileRef = useRef(null);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const geometryRef = useRef(geometry);

  useEffect(() => { geometryRef.current = geometry; }, [geometry]);

  const persistAll = (patch = {}) => writeStore({ ...readStore(), ...patch });
  const currentSession = sessions.find((s) => s.id === sessionId) || null;
  const activeCount = sessions.filter((s) => s.status === 'active').length;

  useEffect(() => {
    const s = readStore();
    const storedSessions = s.sessions || [];
    setSessions(storedSessions);
    setGeometry({ ...defaultGeometry, ...(s.geometry || {}) });
    if (s.currentSessionId) {
      const current = storedSessions.find((x) => x.id === s.currentSessionId);
      if (current) {
        setSessionId(current.id);
        setProfile(s.contacts?.find((c) => c.email?.toLowerCase() === current.email?.toLowerCase()) || { name: current.name, email: current.email });
        setMessages(current.messages || []);
        setAttachments(current.attachments || []);
      }
    }
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; });
  }, [messages, loading, error]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('sreevriddhi:open-ai', handler);
    return () => window.removeEventListener('sreevriddhi:open-ai', handler);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const g = geometryRef.current;
      if (dragRef.current) {
        const d = dragRef.current;
        const x = clamp(d.x + e.clientX - d.startX, 8, Math.max(8, window.innerWidth - g.width - 8));
        const y = clamp(d.y + e.clientY - d.startY, 8, Math.max(8, window.innerHeight - g.height - 8));
        const next = { ...g, x, y };
        geometryRef.current = next;
        setGeometry(next);
      }
      if (resizeRef.current) {
        const r = resizeRef.current;
        const width = clamp(r.width + e.clientX - r.startX, 340, Math.min(760, window.innerWidth - 16));
        const height = clamp(r.height + e.clientY - r.startY, 460, Math.min(900, window.innerHeight - 16));
        const next = { ...g, width, height, x: clamp(g.x ?? (window.innerWidth - width - 16), 8, Math.max(8, window.innerWidth - width - 8)), y: clamp(g.y ?? (window.innerHeight - height - 16), 8, Math.max(8, window.innerHeight - height - 8)) };
        geometryRef.current = next;
        setGeometry(next);
      }
    };
    const onUp = () => {
      if (dragRef.current || resizeRef.current) persistAll({ geometry: geometryRef.current });
      dragRef.current = null;
      resizeRef.current = null;
      document.body.classList.remove('sv-no-select');
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
  }, []);

  const beginDrag = (e) => {
    if (e.target.closest('button')) return;
    const g = geometryRef.current;
    const current = g.x == null ? { ...g, x: window.innerWidth - g.width - 16, y: window.innerHeight - g.height - 16 } : g;
    geometryRef.current = current;
    setGeometry(current);
    dragRef.current = { startX: e.clientX, startY: e.clientY, x: current.x, y: current.y };
    document.body.classList.add('sv-no-select');
  };

  const beginResize = (e) => {
    e.preventDefault(); e.stopPropagation();
    const g = geometryRef.current;
    resizeRef.current = { startX: e.clientX, startY: e.clientY, width: g.width, height: g.height };
    document.body.classList.add('sv-no-select');
  };

  const selectSession = (s) => {
    setSessionId(s.id);
    setProfile(readStore().contacts?.find((c) => c.email?.toLowerCase() === s.email?.toLowerCase()) || { name: s.name, email: s.email });
    setMessages(s.messages || []);
    setAttachments(s.attachments || []);
    setInput(''); setError(''); setHistoryOpen(false);
    persistAll({ currentSessionId: s.id });
  };

  const start = () => {
    if (!draft.name.trim() || !/^\S+@\S+\.\S+$/.test(draft.email.trim())) return;
    const s = readStore();
    const normalizedEmail = draft.email.trim().toLowerCase();
    const existing = (s.contacts || []).find((c) => c.email?.toLowerCase() === normalizedEmail);
    const p = existing ? { ...existing, name: draft.name.trim() || existing.name, asset: draft.asset || existing.asset || '', amount: draft.amount || existing.amount || '', updatedAt: new Date().toISOString() } : { id: id(), name: draft.name.trim(), email: normalizedEmail, asset: draft.asset, amount: draft.amount, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const contacts = [...(s.contacts || []).filter((c) => c.email?.toLowerCase() !== normalizedEmail), p];
    const returning = (s.sessions || []).some((x) => x.email?.toLowerCase() === normalizedEmail);
    const greeting = `Hello ${p.name.split(' ')[0]}! ${returning ? 'Welcome back to Sree Vriddhi.' : 'Welcome to Sree Vriddhi.'} I’m your AI assistant. I can answer Sree Vriddhi questions and general questions, explain information in simple words, help with documents, and help you request a call.`;
    const session = makeSession(p, greeting);
    const ns = [...(s.sessions || []), session];
    writeStore({ ...s, contacts, sessions: ns, currentSessionId: session.id });
    setProfile(p); setSessionId(session.id); setSessions(ns); setMessages(session.messages); setAttachments([]); setDraft({ name: p.name, email: p.email, asset: p.asset || '', amount: p.amount || '' }); setError(''); setFileError('');
  };

  const send = async () => {
    const clean = input.trim();
    if (!clean || loading || !currentSession) return;
    const history = messages.map(({ role, content }) => ({ role, content }));
    const next = [...messages, { role: 'user', content: clean }];
    setMessages(next); setInput(''); setError(''); setLoading(true);
    const nextSessions = sessions.map((s) => s.id === sessionId ? { ...s, messages: next, title: s.title === 'New conversation' ? clean.slice(0, 42) : s.title } : s);
    setSessions(nextSessions); persistAll({ sessions: nextSessions, currentSessionId: sessionId });
    try {
      const response = await fetch('/api/ai/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: clean, history, channel: 'website', profile }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'The AI service could not complete that request right now.');
      const assistant = { role: 'assistant', content: data.answer, risk: data.risk, requiresHuman: data.requiresHuman, sources: data.sources || [] };
      const all = [...next, assistant];
      const finalSessions = nextSessions.map((s) => s.id === sessionId ? { ...s, messages: all } : s);
      setMessages(all); setSessions(finalSessions); persistAll({ sessions: finalSessions, currentSessionId: sessionId });
    } catch (e) { setError(e.message || 'The AI service could not complete that request right now.'); }
    finally { setLoading(false); }
  };

  const key = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  const upload = async (e) => {
    const files = [...e.target.files];
    const bad = files.find((f) => f.size > 10 * 1024 * 1024);
    if (bad) { setFileError(`${bad.name} exceeds the 10 MB per-file limit.`); e.target.value = ''; return; }
    if (!currentSession) return;
    setFileError('');
    try {
      const out = [];
      for (const file of files) {
        const fileId = id();
        const uploadedAt = new Date().toISOString();
        await saveAttachmentBlob({ id: fileId, blob: file, name: file.name, type: file.type || 'application/octet-stream', size: file.size, email: profile.email, sessionId, uploadedAt });
        out.push({ id: fileId, name: file.name, size: file.size, type: file.type || 'application/octet-stream', email: profile.email, sessionId, uploadedAt });
      }
      const nextAttachments = [...attachments, ...out];
      const nextSessions = sessions.map((s) => s.id === sessionId ? { ...s, attachments: nextAttachments } : s);
      setAttachments(nextAttachments); setSessions(nextSessions); persistAll({ sessions: nextSessions, currentSessionId: sessionId });
    } catch (e) { setFileError(e.message || 'Could not save the attachment.'); }
    e.target.value = '';
  };

  const downloadAttachment = async (file) => {
    try { const record = await getAttachmentBlob(file.id); if (!record?.blob) throw new Error('Attachment is no longer available in this browser.'); downloadBlob(file.name, record.blob, file.type); }
    catch (e) { setFileError(e.message); }
  };

  const downloadConversation = () => {
    if (!messages.length) return;
    const text = messages.map((m) => `${m.role === 'assistant' ? 'Sree Vriddhi AI' : profile?.name || 'You'}:\n${m.content}`).join('\n\n');
    downloadBlob(`sree-vriddhi-conversation-${new Date().toISOString().slice(0, 10)}.txt`, new Blob([text], { type: 'text/plain;charset=utf-8' }));
  };

  const schedule = () => {
    if (!date || !hour || !profile || !currentSession) return;
    const time = `${String(hour).padStart(2, '0')}:${minute} ${ampm}`;
    const s = readStore();
    const bookingItem = { id: id(), date, time, email: profile.email, name: profile.name, asset: profile.asset || '', amount: profile.amount || '', sessionId, createdAt: new Date().toISOString(), status: 'requested' };
    const bookings = [...(s.bookings || []), bookingItem];
    const confirmation = { role: 'assistant', content: `Call request saved for ${date} at ${time} (IST). Your request is linked to ${profile.email}. Sree Vriddhi will confirm the appointment separately; this interface does not claim a confirmed calendar slot.` };
    const all = [...messages, confirmation];
    const ns = sessions.map((x) => x.id === sessionId ? { ...x, messages: all, booking: bookingItem } : x);
    writeStore({ ...s, bookings, sessions: ns, currentSessionId: sessionId });
    setSessions(ns); setMessages(all); setBooking(false); setDate(''); setHour(''); setMinute('00'); setAmpm('AM');
  };

  const end = () => {
    if (!sessionId) return;
    const ns = sessions.map((x) => x.id === sessionId && x.status === 'active' ? { ...x, status: 'ended', endedAt: new Date().toISOString() } : x);
    setSessions(ns); persistAll({ sessions: ns, currentSessionId: sessionId });
  };

  const newChat = () => {
    setProfile(null); setSessionId(null); setMessages([]); setAttachments([]); setInput(''); setDraft({ name: '', email: '', asset: '', amount: '' }); setBooking(false); setDate(''); setHour(''); setError(''); setFileError(''); setHistoryOpen(false); persistAll({ currentSessionId: null });
  };

  const voice = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { setError('Voice input is not supported by this browser.'); return; }
    const recognition = new Recognition();
    recognition.lang = 'en-IN'; recognition.onstart = () => setListening(true); recognition.onend = () => setListening(false); recognition.onerror = () => setError('Voice input could not be started.'); recognition.onresult = (e) => setInput(e.results?.[0]?.[0]?.transcript || ''); recognition.start();
  };

  const handleDraftEmail = (email) => {
    const normalized = email.toLowerCase().trim();
    const existing = readStore().contacts?.find((c) => c.email?.toLowerCase() === normalized);
    setDraft((d) => ({ ...d, email, ...(existing ? { name: existing.name || d.name, asset: existing.asset || d.asset, amount: existing.amount || d.amount } : {}) }));
  };

  const style = geometry.x == null ? { width: `${geometry.width}px`, height: `${geometry.height}px` } : { left: `${geometry.x}px`, top: `${geometry.y}px`, width: `${geometry.width}px`, height: `${geometry.height}px`, right: 'auto', bottom: 'auto' };

  return <div className="sv-chat-wrap">
    {!open && <button className="sv-launch" onClick={() => setOpen(true)}><Bot /> AI Assistant</button>}
    {open && <div className={`sv-chat ${min ? 'collapsed' : ''}`} style={style}>
      <header className="sv-header" onPointerDown={beginDrag}>
        <div className="sv-brand"><div className="sv-logo"><img src="/brand/logo-mark.jpeg" alt="Sree Vriddhi" /></div><div><b>Sree Vriddhi AI</b><small>Business + General AI · {activeCount} active</small></div></div>
        <div className="sv-actions">
          <button title="Conversation history" onClick={() => setHistoryOpen((v) => !v)}><Move /></button>
          <button title="Download conversation" onClick={downloadConversation} disabled={!messages.length}><Download /></button>
          <button title="Start new conversation" onClick={newChat}><Plus /></button>
          <button title={min ? 'Expand' : 'Collapse'} onClick={() => setMin((v) => !v)}>{min ? <Maximize2 /> : <Minus />}</button>
          <button title="Close" onClick={() => setOpen(false)}><X /></button>
        </div>
      </header>

      {historyOpen && !min && <aside className="sv-history"><div className="sv-history-title">Conversations <span>{sessions.length}</span></div>{sessions.length === 0 && <p>No previous conversations yet.</p>}{sessions.slice().reverse().map((s) => <button type="button" key={s.id} className={s.id === sessionId ? 'active' : ''} onClick={() => selectSession(s)}><b>{s.title}</b><small>{s.name} · {new Date(s.startedAt).toLocaleString('en-IN')} · {s.status}</small></button>)}</aside>}

      {!min && <>
        {!profile ? <section className="sv-prechat">
          <div className="sv-welcome"><div className="sv-welcome-logo"><img src="/brand/logo-mark.jpeg" alt="Sree Vriddhi" /></div><div><h3>Before we begin</h3><p>Tell us a few details so I can personalize your conversation.</p></div></div>
          <label>1. Full name<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Your full name" /></label>
          <label>2. Email<input type="email" value={draft.email} onChange={(e) => handleDraftEmail(e.target.value)} placeholder="you@example.com" /></label>
          <label>3. Asset / interest<select value={draft.asset} onChange={(e) => setDraft({ ...draft, asset: e.target.value })}><option value="">Select an option</option>{ASSETS.map((x) => <option key={x}>{x}</option>)}</select></label>
          <label>4. Money investing<input value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: e.target.value })} placeholder="e.g. ₹50,000" /></label>
          <button className="sv-primary" disabled={!draft.name.trim() || !/^\S+@\S+\.\S+$/.test(draft.email.trim())} onClick={start}>Start conversation</button>
          <small className="sv-note">Your email is used to find an existing website contact. If none exists, a new contact record is created.</small>
        </section> : <>
          <main ref={scrollRef} className="sv-messages">
            {messages.map((m, i) => <div key={`${sessionId}-${i}`} className={`sv-row ${m.role}`}><div className="sv-meta">{m.role === 'assistant' ? <><img className="sv-msg-logo" src="/brand/logo-mark.jpeg" alt="" /> Sree Vriddhi AI</> : <><UserRound /> {profile?.name || 'You'}</>}</div><div className="sv-bubble"><MessageContent content={m.content} /></div>{m.role === 'assistant' && <Sources sources={m.sources} />}</div>)}
            {loading && <div className="sv-row assistant"><div className="sv-meta"><img className="sv-msg-logo" src="/brand/logo-mark.jpeg" alt="" /> Sree Vriddhi AI</div><div className="sv-bubble ai">Thinking…</div></div>}
            {error && <div className="sv-error">{error}<div className="sv-support"><a href="tel:+919640352929"><Phone /> {PHONE}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp</a></div></div>}
            {fileError && <div className="sv-error">{fileError}</div>}
            {attachments.length > 0 && <div className="sv-attachments"><b>Customer attachments · {attachments.length}</b>{attachments.map((a) => <div key={a.id}><FileUp /><span>{a.name}</span><small>{(a.size / 1024 / 1024).toFixed(2)} MB</small><button type="button" title="Download attachment" onClick={() => downloadAttachment(a)}><Download /></button></div>)}</div>}
          </main>

          <section className="sv-booking"><button className="sv-booking-head" onClick={() => setBooking((v) => !v)}><span><CalendarDays /> 5. Schedule a call</span><b>{booking ? '−' : '+'}</b></button>{booking && <div className="sv-booking-body"><CalendarPicker value={date} onChange={(d) => { setDate(d); setHour(''); }} /><ClockPicker hour={hour} minute={minute} ampm={ampm} onChange={(h, m, a) => { setHour(h); setMinute(m); setAmpm(a); }} /><button className="sv-primary" disabled={!date || !hour} onClick={schedule}>Request call at selected date &amp; time</button></div>}</section>

          <section className="sv-composer"><div className="sv-input"><button type="button" title="Upload attachment (max 10 MB per file)" onClick={() => fileRef.current?.click()}><Paperclip /></button><input ref={fileRef} type="file" multiple onChange={upload} /><textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={key} placeholder="Type your message… Press Enter to send" rows={1} /><button type="button" title={listening ? 'Listening…' : 'Voice input'} onClick={voice}><Mic /></button><button className="send" type="button" title="Send" disabled={!input.trim() || loading} onClick={send}><Send /></button></div><div className="sv-hint">Any file format · max 10 MB per file · Enter sends · Shift+Enter adds a new line</div></section>
          <footer className="sv-footer"><a href="tel:+919640352929"><Phone /> {PHONE}</a><span>{EMAIL}</span><button type="button" onClick={end} disabled={!currentSession || currentSession.status === 'ended'}>{currentSession?.status === 'ended' ? 'Conversation ended' : 'End conversation'}</button></footer>
        </>}
      </>}
      {open && !min && <div className="sv-resize-handle" title="Drag to resize" onPointerDown={beginResize}><Maximize2 /></div>}
    </div>}
  </div>;
}
