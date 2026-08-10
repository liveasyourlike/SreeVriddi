import React, { useState } from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Phone, Mail, MessageSquare, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

const Contact = () => {
  const { brandSettings, addLead } = useSreeVriddhi();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    assetType: 'Physical Gold',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    addLead({
      name: formData.name,
      mobile: formData.phone,
      email: formData.email,
      location: formData.location,
      assetType: formData.assetType,
      approxValue: 1000000,
      notes: `Direct Contact Form Message: ${formData.message}`,
      source: 'Contact Page'
    });
    setSubmitted(true);
    setFeedback({ type: 'success', message: 'Your enquiry was logged in the CRM and our team will reach out shortly.' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Direct Consultation</span>
        <h1 className="text-4xl font-extrabold font-serif-brand text-white">Talk to Sree Vriddhi</h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Connect directly with our valuation officers and legal compliance advisors for confidential asset evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* WhatsApp Direct Banner */}
          <a
            href={brandSettings.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 transition-all shadow-xl group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-emerald-300 tracking-wider block">Instant WhatsApp Chat</span>
                <h3 className="text-base font-bold text-white">Click to Chat on WhatsApp</h3>
                <p className="text-xs text-emerald-200/80 font-mono mt-0.5">+91 9640352929</p>
              </div>
            </div>
          </a>

          {/* Phone Card */}
          <div className="glass-card p-6 flex items-center gap-4 border-amber-500/30">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider block">Direct Phone</span>
              <a href={`tel:${brandSettings.phone}`} className="text-base font-bold text-white hover:text-amber-300 transition-colors font-mono">
                {brandSettings.phone}
              </a>
              <p className="text-[11px] text-slate-400">Mon - Sat: 9:30 AM to 6:30 PM IST</p>
            </div>
          </div>

          {/* Email Card */}
          <div className="glass-card p-6 flex items-center gap-4 border-amber-500/30">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider block">Official Email</span>
              <a href={`mailto:${brandSettings.email}`} className="text-sm font-bold text-white hover:text-amber-300 transition-colors font-mono">
                {brandSettings.email}
              </a>
              <p className="text-[11px] text-slate-400">Legal & Valuation Desks</p>
            </div>
          </div>

          {/* Location / HQ */}
          <div className="glass-card p-6 flex items-center gap-4 border-amber-500/30">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider block">Administrative HQ</span>
              <h4 className="text-sm font-bold text-white">Sree Vriddhi Value Management</h4>
              <p className="text-[11px] text-slate-400">Hyderabad & Vijayawada Operations</p>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 space-y-6 border-amber-500/30">
              <h2 className="text-xl font-bold text-white font-serif-brand border-b border-slate-800 pb-4">
                Submit Confidential Enquiry
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Phone Number *</label>
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
                  <label className="text-slate-300 font-semibold block mb-1">Location / City *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-slate-300 font-semibold block mb-1">Asset Category to Evaluate *</label>
                <select
                  value={formData.assetType}
                  onChange={(e) => setFormData({ ...formData, assetType: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
                >
                  <option value="Physical Gold">Physical Gold / Jewellery</option>
                  <option value="Capital / Money">Capital / Money Deposit</option>
                  <option value="Land & Property">Land & Commercial Real Estate</option>
                  <option value="Securities">Securities / Financial Assets</option>
                </select>
              </div>

              <div className="text-xs">
                <label className="text-slate-300 font-semibold block mb-1">Specific Message or Enquiry Details</label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your asset or preferred timeline..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 hover:from-amber-300 hover:to-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Confidential Enquiry</span>
              </button>
            </form>
          ) : (
            <div className="glass-card p-10 text-center space-y-4 border-amber-500/40">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-serif-brand">Enquiry Received</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                Thank you for contacting Sree Vriddhi. A senior valuation officer has been assigned to your request and will reach out via phone or WhatsApp.
              </p>
              {feedback.message && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {feedback.message}
                </div>
              )}
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFeedback({ type: '', message: '' });
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact;
