import React, { useState, useRef, useEffect } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [width, setWidth] = useState(360);
  const [height, setHeight] = useState(480);
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

  const startDrag = (e) => {
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, w: width, h: height };
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), from: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    try {
      await fetch('/api/chat/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: newMsg.text, customerNumber: 'web-user' }) });
    } catch (e) {
      console.warn('Failed to forward message', e);
    }
  };

  const clearChat = () => setMessages([]);
  const newChat = () => { setMessages([]); setOpen(true); setWidth(360); setHeight(480); };

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 60 }}>
      {!open && (
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 text-white shadow-lg">
          <span>Chat</span>
        </button>
      )}

      {open && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden" style={{ width, height }}>
          <div className="flex items-center justify-between p-3 bg-slate-950 border-b border-slate-800 cursor-grab" onMouseDown={startDrag}>
            <div className="flex items-center gap-2">
              <strong className="text-sm text-white">Sree Vriddhi Chat</strong>
              <span className="text-xs text-slate-400">Support</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearChat} className="text-xs text-slate-300 px-2 py-1 rounded hover:bg-slate-800">Clear</button>
              <button onClick={newChat} className="text-xs text-amber-400 px-2 py-1 rounded hover:bg-slate-800">New</button>
              <button onClick={() => setOpen(false)} className="text-xs text-slate-300 px-2 py-1 rounded hover:bg-slate-800">Close</button>
            </div>
          </div>
          <div className="p-3 overflow-auto" style={{ height: height - 130 }}>
            {messages.length === 0 && <div className="text-xs text-slate-400">Start a conversation — messages are forwarded to WhatsApp.</div>}
            {messages.map(m => (
              <div key={m.id} className={`mb-3 ${m.from === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-3 py-2 rounded-lg ${m.from === 'user' ? 'bg-amber-500/20 text-amber-200' : 'bg-slate-800 text-slate-200'}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-slate-800 bg-slate-950">
            <div className="flex gap-2 items-center">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-100" />
              <button onClick={sendMessage} className="px-3 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold">Send</button>
            </div>
            <div className="text-[11px] text-slate-400 pt-2">Resize by dragging the header. Collapse to hide.</div>
          </div>
        </div>
      )}
    </div>
  );
}
