import React, { useState } from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Scale, AlertCircle, CheckCircle2, Send, ShieldAlert } from 'lucide-react';

const Grievances = () => {
  const { addTicket } = useSreeVriddhi();

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    category: 'Grievance',
    priority: 'High',
    subject: '',
    message: ''
  });

  const [ticketId, setTicketId] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    const t = addTicket(formData);
    setTicketId(t.id);
    setFeedback({ type: 'success', message: `Your grievance ticket has been logged and assigned reference ${t.id}.` });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Formal Redressal Mechanism</span>
        <h1 className="text-3xl font-bold font-serif-brand text-white">Customer Grievance Portal</h1>
        <p className="text-xs text-slate-300 leading-relaxed">
          At Sree Vriddhi, customer trust is paramount. Submit formal complaints or operational grievances directly to our Senior Compliance Officer.
        </p>
      </div>

      {!ticketId ? (
        <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 space-y-6 border-amber-500/30">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <Scale className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white font-serif-brand">Lodge Official Complaint / Grievance Ticket</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Complainant Name *</label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Full Legal Name"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Mobile Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98480 12345"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Grievance Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
              >
                <option value="Grievance">Grievance / Dispute</option>
                <option value="Settlement">Settlement Payout Issue</option>
                <option value="Valuation">Valuation Query</option>
                <option value="Contract">Contractual Term Query</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="text-slate-300 font-semibold block mb-1">Complaint Subject *</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief summary of issue"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
            />
          </div>

          {feedback.message && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {feedback.message}
            </div>
          )}

          <div className="text-xs">
            <label className="text-slate-300 font-semibold block mb-1">Detailed Description of Complaint *</label>
            <textarea
              rows="5"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Provide exact contract ID, date, or specific details..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 hover:from-amber-300 hover:to-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Generate Official Grievance Ticket</span>
          </button>
        </form>
      ) : (
        <div className="glass-card p-10 text-center space-y-4 border-amber-500/40">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white font-serif-brand">Grievance Ticket Generated</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Your complaint has been assigned ticket ID <strong className="text-amber-400 font-mono">{ticketId}</strong>. Our Legal & Grievance Desk will respond within 48 business hours.
          </p>
          <button
            onClick={() => {
              setTicketId(null);
              setFeedback({ type: '', message: '' });
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300"
          >
            Lodge Another Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default Grievances;
