import React, { useState } from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { HelpCircle, Plus, Send, CheckCircle2 } from 'lucide-react';

const SupportTickets = () => {
  const { tickets, addTicket } = useSreeVriddhi();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: 'Ramesh Varma',
    email: 'ramesh.varma@example.com',
    phone: '+91 98480 12345',
    category: 'General Query',
    priority: 'Medium',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTicket(formData);
    setShowModal(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-serif-brand text-white">Support & Service Desk</h1>
          <p className="text-xs text-slate-400 mt-1">Raise support requests or track response SLAs.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
          <Plus className="w-4 h-4" />
          <span>New Support Ticket</span>
        </button>
      </div>

      <div className="glass-card p-6 border-amber-500/20">
        <div className="space-y-3">
          {tickets.map(t => (
            <div key={t.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-amber-400 font-bold">{t.id}</span>
                  <h3 className="text-white font-bold">{t.subject}</h3>
                </div>
                <span className="badge-review px-2.5 py-0.5 rounded-full uppercase text-[10px]">{t.status}</span>
              </div>
              <p className="text-slate-400">{t.message}</p>
              <span className="text-[10px] text-slate-500 block pt-1">Assigned: {t.assignedEmployee} | Created: {new Date(t.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="text-lg font-bold text-white font-serif-brand">Raise New Support Ticket</h3>
            <div>
              <label className="text-slate-300 block mb-1">Category</label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100">
                <option value="Settlement Query">Settlement Query</option>
                <option value="Valuation Request">Valuation Request</option>
                <option value="General Query">General Query</option>
              </select>
            </div>
            <div>
              <label className="text-slate-300 block mb-1">Subject</label>
              <input type="text" required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100" />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">Message</label>
              <textarea rows="3" required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold">Submit Ticket</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SupportTickets;
