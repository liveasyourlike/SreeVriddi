import React, { useState } from 'react';
import { Bot, Clock3, MessageCircle, Mic, Send, X, UserRound } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/919640352929';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);

  const send = async (event) => {
    event?.preventDefault();
    const text = message.trim();
    if (!text || loading) return;
    const history = messages.map(({ role, content }) => ({ role, content }));
    setMessages((items) => [...items, { role: 'user', content: text }]);
    setMessage('');
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/ai/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, history, channel: 'website' }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Assistant unavailable');
      setMessages((items) => [...items, { role: 'assistant', content: data.answer, risk: data.risk, requiresHuman: data.requiresHuman }]);
    } catch (err) {
      setError(err.message || 'Assistant unavailable');
    } finally {
      setLoading(false);
    }
  };

  const startVoice = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { setError('Voice input is not supported by this browser. You can type your request instead.'); return; }
    const recognition = new Recognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => { setListening(false); setError('Voice input could not be started. Please try again or type your request.'); };
    recognition.onresult = (event) => setMessage(event.results?.[0]?.[0]?.transcript || '');
    recognition.start();
  };

  return <div className="fixed right-3 bottom-3 z-[60] max-w-[calc(100vw-24px)]">
    {!open && <button onClick={() => setOpen(true)} aria-label="Open Sree Vriddhi AI Assistant" className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-white shadow-lg hover:bg-emerald-500"><Bot className="h-4 w-4" /> AI Assistant</button>}
    {open && <div className="w-[min(420px,calc(100vw-24px))] overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 p-3">
        <div className="flex items-center gap-2"><div className="rounded-full bg-emerald-500/15 p-2"><Bot className="h-4 w-4 text-emerald-400" /></div><div><strong className="text-sm text-white">Sree Vriddhi AI Assistant</strong><div className="flex items-center gap-1 text-[10px] text-emerald-300"><Clock3 className="h-3 w-3" /> AI online · human handoff available</div></div></div>
        <button onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800"><X className="h-4 w-4" /></button>
      </div>
      <div className="max-h-[55vh] space-y-3 overflow-y-auto p-3 sm:p-4">
        {messages.length === 0 && <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-center"><Bot className="mx-auto mb-2 h-7 w-7 text-amber-400" /><h3 className="text-sm font-semibold text-white">How can we help?</h3><p className="mt-2 text-xs leading-5 text-slate-400">Ask about Sree Vriddhi, published services, eligibility, documents, website guidance or the listed allocation sectors. Sensitive questions may be routed for human review.</p></div>}
        {messages.map((item, index) => <div key={`${item.role}-${index}`} className={`flex gap-2 ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[88%] rounded-xl p-3 text-xs leading-5 ${item.role === 'user' ? 'bg-emerald-600/20 text-emerald-50' : 'bg-slate-950/80 text-slate-200 border border-slate-800'}`}>{item.role === 'assistant' ? <div className="mb-1 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-amber-300"><Bot className="h-3 w-3" /> AI</div> : <div className="mb-1 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400"><UserRound className="h-3 w-3" /> You</div>}{item.content}{item.requiresHuman && <div className="mt-2 border-t border-amber-500/20 pt-2 text-[9px] text-amber-300">Human review may be required for this request.</div>}</div></div>)}
        {loading && <div className="text-xs text-slate-500">AI is preparing a response…</div>}
        {error && <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-2 text-[10px] text-red-300">{error}</div>}
      </div>
      <form onSubmit={send} className="border-t border-slate-800 bg-slate-950 p-3">
        <div className="flex items-end gap-2"><textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={2} maxLength={4000} placeholder="Ask about our services…" className="min-w-0 flex-1 resize-none rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-amber-500" />
          <button type="button" onClick={startVoice} disabled={listening} aria-label="Voice input" className={`rounded-lg border p-2 ${listening ? 'border-red-400 text-red-300' : 'border-slate-700 text-slate-300'}`}><Mic className="h-4 w-4" /></button>
          <button type="submit" disabled={!message.trim() || loading} aria-label="Send message" className="rounded-lg bg-amber-500 p-2 text-slate-950 disabled:opacity-40"><Send className="h-4 w-4" /></button>
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] text-slate-600"><span>Public information only · sensitive requests may require human review</span><span>{message.length}/4000</span></div>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-[10px] font-semibold text-emerald-300"><MessageCircle className="h-3 w-3" /> Contact human support via WhatsApp</a>
      </form>
    </div>}
  </div>;
}
