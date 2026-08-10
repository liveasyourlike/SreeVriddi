import React, { useEffect, useRef, useState } from 'react';
import { Eye, Mic, MicOff, MonitorUp, Volume2, VolumeX, X } from 'lucide-react';

function getReadableText() {
  const root = document.querySelector('main') || document.body;
  return (root.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 6000);
}

export default function LiveSiteAgent() {
  const [open, setOpen] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('I can read this page, explain visible content, and guide you through the site.');
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    window.speechSynthesis?.cancel();
  }, []);

  const readPage = () => {
    const text = getReadableText();
    if (!text) return;
    setMessage(`I found ${text.split(/\s+/).length} words on this page. I can help you understand the visible sections and controls.`);
  };

  const speakPage = () => {
    const text = getReadableText();
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 3500));
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setMessage('Voice input is not supported by this browser. You can still use the page reader and chat.');
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new Recognition();
    recognition.lang = document.documentElement.lang || 'en-IN';
    recognition.interimResults = false;
    recognition.onresult = (event) => setMessage(`I heard: “${event.results[0][0].transcript}”. You can now ask me about the page.`);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const toggleShare = async () => {
    if (sharing) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setSharing(false);
      setMessage('Screen sharing stopped.');
      return;
    }
    if (!navigator.mediaDevices?.getDisplayMedia) {
      setMessage('Screen sharing is not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      streamRef.current = stream;
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.addEventListener('ended', () => {
        streamRef.current = null;
        setSharing(false);
      });
      setSharing(true);
      setMessage('Screen shared with this browser tab. For privacy, sharing starts only after your explicit browser permission.');
    } catch {
      setMessage('Screen sharing was cancelled or blocked.');
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-[70]">
      {!open ? (
        <button onClick={() => setOpen(true)} aria-label="Open live site agent" className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-slate-950 px-4 py-3 text-sm font-bold text-amber-300 shadow-2xl hover:bg-slate-900">
          <Eye className="h-4 w-4" /> Live Site Agent
        </button>
      ) : (
        <div className="w-[min(360px,calc(100vw-40px))] overflow-hidden rounded-2xl border border-amber-400/20 bg-slate-950 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
            <div><div className="text-sm font-bold text-white">Live Site Agent</div><div className="text-[10px] text-emerald-400">Available on every tab</div></div>
            <button onClick={() => setOpen(false)} aria-label="Close live site agent" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-4">
            <p className="rounded-xl bg-slate-900 p-3 text-xs leading-5 text-slate-300">{message}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={readPage} className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:border-amber-400"><Eye className="h-4 w-4" /> Read page</button>
              <button onClick={speakPage} className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:border-amber-400">{speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />} {speaking ? 'Stop voice' : 'Read aloud'}</button>
              <button onClick={toggleListening} className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:border-amber-400">{listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />} {listening ? 'Stop listening' : 'Voice ask'}</button>
              <button onClick={toggleShare} className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ${sharing ? 'bg-emerald-600 text-white' : 'border border-slate-700 bg-slate-900 text-white hover:border-amber-400'}`}><MonitorUp className="h-4 w-4" /> {sharing ? 'Sharing on' : 'Share screen'}</button>
            </div>
            <p className="mt-3 text-[10px] leading-4 text-slate-500">Screen sharing never starts silently. Your browser controls what is shared. The reader uses visible page text and does not capture passwords or private screen content.</p>
          </div>
        </div>
      )}
    </div>
  );
}
