import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, CalendarDays, ChevronLeft, ChevronRight, Download, FileUp, Mic, Minus, Phone, Plus, Send, UserRound, X } from 'lucide-react';

const STORE = 'sv_ai_workspace_v3';
const PHONE = '+91 9640352929';
const EMAIL = 'sreevriddhiforwealth@gmail.com';
const ASSETS = ['Daily finance', 'Physical gold', 'Fixed Deposits', 'Housing Rentals', 'Vehicle Rentals', 'Oil & Gas Purchase', 'Retail Businesses', 'EV and automobiles workshops', 'Staff Recruitment Agency', 'Virtual Stocks'];
const TIMES = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'];

const readStore = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE) || '{}');
  } catch {
    return {};
  }
};

const writeStore = (value) => localStorage.setItem(STORE, JSON.stringify(value));

const downloadBlob = (name, text, type = 'text/plain') => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
};

function CalendarPicker({ value, onChange }) {
  const initial = value ? new Date(value + 'T00:00:00') : new Date();
  const [cursor, setCursor] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));
  const days = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();
    const count = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    return [...Array(first).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];
  }, [cursor]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="sv-cal">
      <div className="sv-cal-head">
        <button type="button" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}><ChevronLeft /></button>
        <strong>{cursor.toLocaleString('en-IN', { month: 'long', year: 'numeric' })}</strong>
        <button type="button" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}><ChevronRight /></button>
      </div>
      <div className="sv-week">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((x, i) => <span key={`${x}-${i}`}>{x}</span>)}</div>
      <div className="sv-days">
        {days.map((day, i) => {
          if (!day) return <span key={`empty-${i}`} />;
          const dt = new Date(cursor.getFullYear(), cursor.getMonth(), day);
          const iso = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const disabled = dt < today;
          return <button type="button" key={iso} disabled={disabled} className={value === iso ? 'selected' : ''} onClick={() => onChange(iso)}>{day}</button>;
        })}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [draft, setDraft] = useState({ name: '', email: '', asset: '', amount: '' });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileError, setFileError] = useState('');
  const [active, setActive] = useState(1);
  const [sessions, setSessions] = useState([]);
  const [booking, setBooking] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [listening, setListening] = useState(false);
  const scrollRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    const s = readStore();
    setSessions(s.sessions || []);
    setActive((s.sessions || []).filter((x) => x.status === 'active').length || 1);
    if (s.profile) setProfile(s.profile);
    if (s.messages) setMessages(s.messages);
    if (s.attachments) setAttachments(s.attachments);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  }, [messages, loading, error]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('sreevriddhi:open-ai', handler);
    return () => window.removeEventListener('sreevriddhi:open-ai', handler);
  }, []);

  const persist = (next = {}) => {
    const s = {
      ...readStore(),
      profile: next.profile ?? profile,
      messages: next.messages ?? messages,
      attachments: next.attachments ?? attachments,
      sessions: next.sessions ?? sessions,
    };
    writeStore(s);
  };

  const start = () => {
    if (!draft.name.trim() || !draft.email.includes('@')) return;
    const s = readStore();
    const existing = (s.contacts || []).find((c) => c.email.toLowerCase() === draft.email.toLowerCase());
    const p = existing || {
      id: crypto.randomUUID?.() || String(Date.now()),
      name: draft.name,
      email: draft.email,
      asset: draft.asset,
      amount: draft.amount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const contacts = [
      ...(s.contacts || []).filter((c) => c.email.toLowerCase() !== draft.email.toLowerCase()),
      { ...p, name: draft.name || p.name, asset: draft.asset || p.asset, amount: draft.amount || p.amount, updatedAt: new Date().toISOString() },
    ];
    const greeting = `Hello ${draft.name.split(' ')[0]}! Welcome to Sree Vriddhi. I’m your AI assistant. I can explain our services, guide you through the preliminary evaluation, help schedule a call, or answer general questions.`;
    const next = [{ role: 'assistant', content: greeting }];
    const ns = [...(s.sessions || []), { id: Date.now(), email: p.email, status: 'active', startedAt: new Date().toISOString() }];
    writeStore({ ...s, contacts, profile: p, messages: next, sessions: ns });
    setProfile(p);
    setMessages(next);
    setSessions(ns);
    setActive(ns.filter((x) => x.status === 'active').length);
  };

  const send = async () => {
    const clean = input.trim();
    if (!clean || loading) return;
    const history = messages.map(({ role, content }) => ({ role, content }));
    const next = [...messages, { role: 'user', content: clean }];
    setMessages(next);
    setInput('');
    setError('');
    setLoading(true);
    persist({ messages: next });
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: clean, history, channel: 'website', profile }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Assistant unavailable');
      const all = [...next, { role: 'assistant', content: data.answer, risk: data.risk, requiresHuman: data.requiresHuman }];
      setMessages(all);
      persist({ messages: all });
    } catch (e) {
      setError(e.message || 'AI service unavailable');
    } finally {
      setLoading(false);
    }
  };

  const key = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const upload = (e) => {
    const files = [...e.target.files];
    const bad = files.find((f) => f.size > 10 * 1024 * 1024);
    if (bad) {
      setFileError(`${bad.name} exceeds the 10 MB per-file limit.`);
      return;
    }
    setFileError('');
    const out = files.map((f) => ({
      id: crypto.randomUUID?.() || String(Date.now() + Math.random()),
      name: f.name,
      size: f.size,
      type: f.type || 'application/octet-stream',
      email: profile?.email || '',
      data: null,
      uploadedAt: new Date().toISOString(),
    }));
    const next = [...attachments, ...out];
    setAttachments(next);
    persist({ attachments: next });
    e.target.value = '';
  };

  const downloadConversation = () => downloadBlob(
    `sree-vriddhi-conversation-${Date.now()}.txt`,
    messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n'),
  );

  const schedule = () => {
    if (!date || !time || !profile) return;

    const bookingItem = {
      id: crypto.randomUUID?.() || String(Date.now()),
      date,
      time,
      email: profile.email,
      name: profile.name,
      createdAt: new Date().toISOString(),
      status: 'requested',
    };

    const store = readStore();
    const bookings = [...(store.bookings || []), bookingItem];
    writeStore({ ...store, bookings });

    setBooking(false);
    setMessages((current) => [
      ...current,
      {
        role: 'assistant',
        content: `Call request saved for ${date} at ${time} (IST). Sree Vriddhi will confirm the appointment. Please note this is a request, not a confirmed calendar booking.`,
      },
    ]);
    setDate('');
    setTime('');
  };

  const end = () => {
    const ns = sessions.map((x) => (
      x.email === profile?.email && x.status === 'active'
        ? { ...x, status: 'ended', endedAt: new Date().toISOString() }
        : x
    ));
    setSessions(ns);
    setActive(ns.filter((x) => x.status === 'active').length);
    persist({ sessions: ns });
  };

  const newChat = () => {
    setProfile(null);
    setDraft({ name: '', email: '', asset: '', amount: '' });
    setMessages([]);
    setAttachments([]);
    setInput('');
    setBooking(false);
    setDate('');
    setTime('');
    setError('');
    setFileError('');
  };

  const voice = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setError('Voice input is not supported by this browser.');
      return;
    }
    const recognition = new Recognition();
    recognition.lang = 'en-IN';
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setError('Voice input could not be started.');
    recognition.onresult = (e) => setInput(e.results?.[0]?.[0]?.transcript || '');
    recognition.start();
  };

  return (
    <div className="sv-chat-wrap">
      {!open && <button className="sv-launch" onClick={() => setOpen(true)}><Bot /> AI Assistant</button>}
      {open && (
        <div className={`sv-chat ${min ? 'collapsed' : ''}`}>
          <header className="sv-header">
            <div className="sv-brand">
              <div className="sv-logo"><img src="/brand/logo-mark.jpeg" alt="Sree Vriddhi" /></div>
              <div><b>Sree Vriddhi AI</b><small>AI Assistant · {active} active</small></div>
            </div>
            <div className="sv-actions">
              <button title="Download conversation" onClick={downloadConversation}><Download /></button>
              <button title="Start new conversation" onClick={newChat}><Plus /></button>
              <button title="Collapse" onClick={() => setMin(!min)}><Minus /></button>
              <button title="Close" onClick={() => setOpen(false)}><X /></button>
            </div>
          </header>

          {!min && (
            <>
              {!profile ? (
                <section className="sv-prechat">
                  <div className="sv-welcome"><h3>Before we begin</h3><p>Tell us a few details so I can personalize your conversation.</p></div>
                  <label>Full name<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Your full name" /></label>
                  <label>Email<input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="you@example.com" /></label>
                  <label>Asset / interest<select value={draft.asset} onChange={(e) => setDraft({ ...draft, asset: e.target.value })}><option value="">Select an option</option>{ASSETS.map((x) => <option key={x}>{x}</option>)}</select></label>
                  <label>Money investing<input value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: e.target.value })} placeholder="e.g. ₹50,000" /></label>
                  <button className="sv-primary" disabled={!draft.name.trim() || !draft.email.includes('@')} onClick={start}>Start conversation</button>
                  <small className="sv-note">Your email is used to find an existing customer record or create a new website contact.</small>
                </section>
              ) : (
                <>
                  <main ref={scrollRef} className="sv-messages">
                    {messages.map((m, i) => (
                      <div key={i} className={`sv-row ${m.role}`}>
                        <div className="sv-meta">{m.role === 'assistant' ? <><Bot /> Sree Vriddhi AI</> : <><UserRound /> You</>}</div>
                        <div className="sv-bubble">{m.content}</div>
                      </div>
                    ))}
                    {loading && <div className="sv-bubble ai">AI is preparing a response…</div>}
                    {error && <div className="sv-error">{error}<br /><span>Support: {PHONE} · {EMAIL}</span></div>}
                    {fileError && <div className="sv-error">{fileError}</div>}
                    {attachments.length > 0 && <div className="sv-attachments"><b>Customer attachments</b>{attachments.map((a) => <div key={a.id}><FileUp /> <span>{a.name}</span><small>{(a.size / 1024 / 1024).toFixed(2)} MB</small></div>)}</div>}
                  </main>

                  <section className="sv-booking">
                    <button className="sv-booking-head" onClick={() => setBooking(!booking)}><span><CalendarDays /> Schedule a call</span><b>{booking ? '−' : '+'}</b></button>
                    {booking && <div className="sv-booking-body">
                      <CalendarPicker value={date} onChange={(selectedDate) => { setDate(selectedDate); setTime(''); }} />
                      <div className="sv-times"><b>{date ? 'Choose a time' : 'Select a date first'}</b><div>{date && TIMES.map((t) => <button type="button" className={time === t ? 'selected' : ''} key={t} onClick={() => setTime(t)}>{t}</button>)}</div></div>
                      <div className="sv-selected">{date && time ? `${date} · ${time} IST` : 'Choose a date and time'}</div>
                      <button className="sv-primary" disabled={!date || !time} onClick={schedule}>Request call</button>
                    </div>}
                  </section>

                  <footer className="sv-composer">
                    <div className="sv-input">
                      <button title="Attach file" onClick={() => fileRef.current?.click()}><FileUp /></button>
                      <input type="file" ref={fileRef} hidden multiple onChange={upload} />
                      <textarea rows={1} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={key} placeholder="Type your message…" />
                      <button title="Voice input" onClick={voice}><Mic className={listening ? 'on' : ''} /></button>
                      <button className="send" disabled={!input.trim() || loading} onClick={send}><Send /></button>
                    </div>
                    <div className="sv-hint">Any file format · max 10 MB per file · Enter sends · Shift+Enter new line</div>
                    <div className="sv-links"><button onClick={end}>End conversation</button><a href="https://wa.me/919640352929" target="_blank" rel="noreferrer"><Phone /> Human support</a></div>
                  </footer>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
