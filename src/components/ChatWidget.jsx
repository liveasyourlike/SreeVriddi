import React, { useState, useRef, useEffect } from 'react';
import { Bot, CheckCircle2, Send, X } from 'lucide-react';

const API_BASE = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE ? import.meta.env.VITE_API_BASE.replace(/\/$/, '') : '';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [width, setWidth] = useState(360);
  const [height, setHeight] = useState(480);
  const [status, setStatus] = useState('Ready');
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setWidth(Math.max(280, Math.min(720, dragStart.current.w + dx)));
      setHeight(Math.max(220, Math.min(720, dragStart.current.h + dy)));
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  const startDrag = (e) => { dragging.current = true; dragStart.current = { x: e.clientX, y: e.clientY, w: width, h: height }; };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    const newMsg = { id: Date.now(), from: 'user', text };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setStatus('Sending…');
    try {
      const res = await fetch(`${API_BASE}/api/chat/send`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, customerNumber: 'web-user' }) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('Delivered to support');
    } catch (e) {
      console.warn('Failed to forward message', e);
      setStatus('Offline — message kept in this chat');
    }
  };

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 60 }}>
      {!open && <button onClick={() => setOpen(true)} aria-label="Open Sree Vriddhi chat" className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-500"><Bot className="h-4 w-4" /> Chat with us</button>}
      {open && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden" style={{ width, height }}>
          <div className="flex items-center justify-between p-3 bg-slate-950 border-b border-slate-800 cursor-grab" onMouseDown={startDrag}>
            <div className="flex items-center gap-2"><div className="rounded-full bg-emerald-500/15 p-2"><Bot className="h-4 w-4 text-emerald-400" /></div><div><strong className="text-sm text-white">Sree Vriddhi Live Agent</strong><div className="flex items-center gap-1 text-[10px] text-emerald-400"><CheckCircle2 className="h-3 w-3" /> {status}</div></div></div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-3 overflow-auto" style={{ height: height - 130 }}>
            {messages.length === 0 && <div className="rounded-xl bg-slate-800/70 p-3 text-xs leading-5 text-slate-300">Hello! I’m the live support channel. I can receive your message and guide you to the right section. Use the <b>Live Site Agent</b> button at the bottom-left for page reading, voice assistance and optional screen sharing.</div>}
            {messages.map((m) => <div key={m.id} className={`mb-3 ${m.from === 'user' ? 'text-right' : 'text-left'}`}><div className={`inline-block px-3 py-2 rounded-lg ${m.from === 'user' ? 'bg-amber-500/20 text-amber-200' : 'bg-slate-800 text-slate-200'}`}>{m.text}</div></div>)}
          </div>
          <div className="p-3 border-t border-slate-800 bg-slate-950"><div className="flex gap-2 items-center"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." aria-label="Chat message" className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-100 placeholder:text-slate-500" /><button onClick={sendMessage} aria-label="Send message" className="px-3 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold"><Send className="h-4 w-4" /></button></div><div className="text-[11px] text-slate-400 pt-2">Drag the header to resize. Messages use the configured support API.</div></div>
        </div>
      )}
    </div>
  );
}
