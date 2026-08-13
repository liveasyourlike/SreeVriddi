import React, { useEffect, useState } from 'react';
import { Bot, CheckCircle2, ClipboardCheck, HelpCircle, Mail, MessageCircle, Mic, Phone, Send, Sparkles, Trash2, UserRound, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUPPORT_EMAIL = 'sreevriddhiforwealth@gmail.com';
const SUPPORT_PHONE = '+91 9640352929';

const QUICK_PROMPTS = [
  { label: 'Business: How it works', text: 'How does Sree Vriddhi work?' },
  { label: 'Business: Services', text: 'What services or opportunities are described on this website?' },
  { label: 'Business: Eligibility', text: 'What is the eligibility process?' },
  { label: 'General: Explain AI', text: 'Explain artificial intelligence in simple words.' },
  { label: 'General: Write email', text: 'Write a short professional email asking for a meeting.' },
  { label: 'General: Python', text: 'What is Python and what is it used for?' },
];

const CATEGORY_LABELS = {
  BUSINESS: 'Business information',
  GENERAL: 'General AI'
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener('sreevriddhi:open-ai', openHandler);
    return () => window.removeEventListener('sreevriddhi:open-ai', openHandler);
  }, []);

  const sendText = async (text) => {
    const clean = text.trim();
    if (!clean || loading) return;

    const history = messages.map(({ role, content }) => ({ role, content }));
    setMessages((items) => [...items, { role: 'user', content: clean }]);
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: clean, history, channel: 'website' })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Assistant unavailable');

      setMessages((items) => [
        ...items,
        {
          role: 'assistant',
          content: data.answer,
          category: data.category,
          risk: data.risk,
          requiresHuman: data.requiresHuman
        }
      ]);
    } catch (err) {
      setError(err.message || 'Assistant unavailable');
    } finally {
      setLoading(false);
    }
  };

  const send = (event) => {
    event?.preventDefault();
    sendText(message);
  };

  const clearChat = () => {
    if (loading) return;
    setMessages([]);
    setError('');
  };

  const startVoice = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setError('Voice input is not supported by this browser. You can type your request instead.');
      return;
    }

    const recognition = new Recognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => {
      setListening(false);
      setError('Voice input could not be started. Please try again or type your request.');
    };
    recognition.onresult = (event) => setMessage(event.results?.[0]?.[0]?.transcript || '');
    recognition.start();
  };

  return (
    <div className="fixed bottom-3 right-3 z-[60] max-w-[calc(100vw-24px)]">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Sree Vriddhi AI Assistant"
          className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-white shadow-lg transition hover:bg-emerald-500"
        >
          <Bot className="h-4 w-4" />
          AI Assistant
        </button>
      )}

      {open && (
        <div className="w-[min(440px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 p-3">
            <div className="flex min-w-0 items-center gap-2">
              <div className="rounded-full bg-emerald-500/15 p-2">
                <Bot className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="min-w-0">
                <strong className="block truncate text-sm text-white">Sree Vriddhi AI Assistant</strong>
                <div className="flex items-center gap-1 text-[10px] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Business + General AI
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={clearChat} disabled={loading || messages.length === 0} aria-label="Clear chat" title="Clear chat" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 disabled:opacity-30">
                <Trash2 className="h-4 w-4" />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-[58vh] space-y-3 overflow-y-auto p-3 sm:p-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-amber-300">
                    <Sparkles className="h-5 w-5" />
                    <h3 className="text-sm font-semibold text-white">Ask me anything</h3>
                  </div>
                  <p className="text-xs leading-5 text-slate-400">
                    I can answer questions about Sree Vriddhi using its public website information, or help with unrelated general questions.
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {QUICK_PROMPTS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => sendText(item.text)}
                      className="flex items-start gap-2 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-left text-[10px] font-semibold text-slate-200 transition hover:border-amber-500/30 hover:bg-slate-950"
                    >
                      <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`flex gap-2 ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] rounded-xl p-3 text-xs leading-5 ${item.role === 'user' ? 'bg-emerald-600/20 text-emerald-50' : 'border border-slate-800 bg-slate-950/80 text-slate-200'}`}>
                  <div className="mb-1 flex items-center justify-between gap-3 text-[9px] font-semibold uppercase tracking-wider">
                    <span className={item.role === 'user' ? 'text-slate-400' : 'text-amber-300'}>
                      {item.role === 'assistant' ? <><Bot className="mr-1 inline h-3 w-3" /> AI</> : <><UserRound className="mr-1 inline h-3 w-3" /> You</>}
                    </span>
                    {item.role === 'assistant' && item.category && (
                      <span className="rounded-full border border-slate-700 px-1.5 py-0.5 text-[8px] normal-case tracking-normal text-slate-400">
                        {CATEGORY_LABELS[item.category] || item.category}
                      </span>
                    )}
                  </div>
                  <div className="whitespace-pre-wrap">{item.content}</div>
                  {item.requiresHuman && (
                    <div className="mt-2 border-t border-amber-500/20 pt-2 text-[9px] text-amber-300">
                      Human review may be required for this request.
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="flex gap-1"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500" /><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500 [animation-delay:150ms]" /><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500 [animation-delay:300ms]" /></span>
                AI is preparing a response…
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-2 text-[10px] text-red-300">
                {error}
              </div>
            )}
          </div>

          <form onSubmit={send} className="border-t border-slate-800 bg-slate-950 p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                maxLength={4000}
                placeholder="Ask about Sree Vriddhi or ask a general question…"
                className="min-w-0 flex-1 resize-none rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
              />
              <button type="button" onClick={startVoice} disabled={listening} aria-label="Voice input" title="Voice input" className={`rounded-lg border p-2 ${listening ? 'border-red-400 text-red-300' : 'border-slate-700 text-slate-300'}`}>
                <Mic className="h-4 w-4" />
              </button>
              <button type="submit" disabled={!message.trim() || loading} aria-label="Send message" title="Send message" className="rounded-lg bg-amber-500 p-2 text-slate-950 disabled:opacity-40">
                <Send className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-[9px] text-slate-600">
              <span>Business facts use approved public knowledge</span>
              <span>{message.length}/4000</span>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link to="/eligibility" onClick={() => setOpen(false)} className="flex items-center justify-center gap-1 rounded-lg border border-amber-500/20 bg-amber-500/5 px-2 py-2 text-[10px] font-semibold text-amber-300">
                <ClipboardCheck className="h-3 w-3" /> Evaluate
              </Link>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center justify-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-[10px] font-semibold text-slate-300">
                <Mail className="h-3 w-3" /> Email support
              </a>
            </div>

            <div className="mt-2 flex items-center justify-center gap-3 text-[9px] text-slate-600">
              <span><CheckCircle2 className="mr-1 inline h-3 w-3" /> Public information</span>
              <span><Phone className="mr-1 inline h-3 w-3" /> {SUPPORT_PHONE}</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
