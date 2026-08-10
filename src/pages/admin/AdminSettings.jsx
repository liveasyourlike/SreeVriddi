import React, { useState } from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Settings, Save, Phone, Mail, MessageSquare, Image, CheckCircle2 } from 'lucide-react';

const AdminSettings = () => {
  const { brandSettings, updateBrandSettings } = useSreeVriddhi();
  const [form, setForm] = useState({ ...brandSettings });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBrandSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex justify-between items-center bg-slate-900 border border-amber-500/20 p-6 rounded-2xl">
        <div>
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Global Administration</span>
          <h1 className="text-2xl font-bold font-serif-brand text-white">Brand & Contact Settings</h1>
          <p className="text-xs text-slate-400 mt-1">Manage brand slogans, official contact details, logo SVGs, and WhatsApp routing links.</p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Brand Settings Updated Successfully! Changes are now live across all pages.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 space-y-6 border-amber-500/30 text-xs">
        <h2 className="text-lg font-bold text-white font-serif-brand border-b border-slate-800 pb-3">1. Contact & Communication Info</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Official Support Phone *</label>
            <input
              type="text"
              required
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-mono"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Official Support Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-slate-300 font-semibold block mb-1">WhatsApp Direct Routing URL *</label>
            <input
              type="url"
              required
              value={form.whatsappUrl}
              onChange={e => setForm({ ...form, whatsappUrl: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-amber-300 font-mono"
            />
          </div>
        </div>

        <h2 className="text-lg font-bold text-white font-serif-brand border-b border-slate-800 pb-3 pt-4">2. Brand Philosophy & Disclaimers</h2>

        <div className="space-y-4">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Primary Philosophy Tagline *</label>
            <input
              type="text"
              required
              value={form.philosophy}
              onChange={e => setForm({ ...form, philosophy: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-amber-300 font-bold"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Footer Commercial Disclaimer Text *</label>
            <textarea
              rows="3"
              required
              value={form.commercialDisclaimer}
              onChange={e => setForm({ ...form, commercialDisclaimer: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-300 leading-relaxed"
            />
          </div>
        </div>

        <h2 className="text-lg font-bold text-white font-serif-brand border-b border-slate-800 pb-3 pt-4">3. Brand Logo System Upload / Replace</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Primary Logo SVG Path</label>
            <input
              type="text"
              value={form.primaryLogo}
              onChange={e => setForm({ ...form, primaryLogo: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-300 font-mono"
            />
          </div>
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Logo Mark Symbol Path</label>
            <input
              type="text"
              value={form.logoMark}
              onChange={e => setForm({ ...form, logoMark: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-300 font-mono"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Brand Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
