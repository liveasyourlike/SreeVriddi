import React, { useState } from 'react';
import { Bot, Clock3, MessageCircle, Mic, Send, X } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/919640352929';
const FEATURES = [
  { icon: MessageCircle, title: 'AI text chat', detail: 'Ask questions and get guided assistance' },
  { icon: Mic, title: 'Voice assistance', detail: 'Speak your request using your microphone' },
  { icon: MessageCircle, title: 'Human support', detail: 'Connect with our support team when available' },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'fixed', right: 12, bottom: 12, zIndex: 60, maxWidth: 'calc(100vw - 24px)' }}>
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="Open Sree Vriddhi AI Assistant" className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-500">
          <Bot className="h-4 w-4" /> AI Assistant
        </button>
      )}
      {open && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden max-w-full" style={{ width: 'min(380px, calc(100vw - 24px))' }}>
          <div className="flex items-center justify-between p-3 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-emerald-500/15 p-2"><Bot className="h-4 w-4 text-emerald-400" /></div>
              <div>
                <strong className="text-sm text-white">Sree Vriddhi AI Assistant</strong>
                <div className="flex items-center gap-1 text-[10px] text-amber-300"><Clock3 className="h-3 w-3" /> Coming Soon</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800"><X className="h-4 w-4" /></button>
          </div>

          <div className="p-4 space-y-4">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-center">
              <Bot className="mx-auto mb-2 h-8 w-8 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">AI assistance is coming soon</h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">We’re preparing the Sree Vriddhi AI Assistant to provide reliable website guidance, voice assistance and human-support handoff. These features will be enabled after final testing.</p>
            </div>

            <div className="space-y-2">
              {FEATURES.map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <div><div className="text-xs font-semibold text-slate-200">{title}</div><div className="mt-1 text-[11px] leading-4 text-slate-500">{detail}</div></div>
                  <span className="ml-auto shrink-0 rounded-full border border-amber-500/20 px-2 py-0.5 text-[9px] font-semibold text-amber-300">Soon</span>
                </div>
              ))}
            </div>

            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/20">
              <MessageCircle className="h-3.5 w-3.5" /> Contact support via WhatsApp
            </a>
            <div className="text-[10px] text-center text-slate-500">AI chat, voice input and automated assistance are currently disabled.</div>
          </div>
        </div>
      )}
    </div>
  );
}
