import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import useTranslator from '../../hooks/useTranslator';
import { ShieldCheck, CheckCircle2, AlertTriangle, XCircle, ArrowRight, UserCheck } from 'lucide-react';

const EligibilityChecker = () => {
  const { addLead, brandSettings } = useSreeVriddhi();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    assetType: 'Physical Gold',
    approxValue: 1500000,
    ownershipStatus: 'Sole Owner',
    hasLoan: 'No',
    preferredTenure: '12 Months',
    preferredFrequency: 'Monthly',
    purpose: 'Asset Value Growth & Preservation',
    consent: false
  });

  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const { translate } = useTranslator();
  const [tNote, setTNote] = useState(`Note: We can take only ${brandSettings?.participantLimit ?? 10} participants per month`);
  const [tSubmit, setTSubmit] = useState('Submit & Calculate Preliminary Result');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const n = await translate(`Note: We can take only ${brandSettings?.participantLimit ?? 10} participants per month`);
        const s = await translate('Submit & Calculate Preliminary Result');
        if (!mounted) return;
        setTNote(n || tNote);
        setTSubmit(s || tSubmit);
      } catch (e) {}
    })();
    return () => { mounted = false; };
  }, [translate, brandSettings?.participantLimit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consent) {
      setFeedback({ type: 'error', message: 'Please check the consent box to continue.' });
      return;
    }

    setFeedback({ type: '', message: '' });
    setIsSubmitting(true);

    setTimeout(() => {
      // Calculate Preliminary Result Score
      let status = 'GREEN';
      let title = 'Potentially Eligible — Continue Application';
      let message = 'Your asset profile meets our preliminary criteria. A valuation officer will contact you within 24 hours to schedule document verification.';

      if (formData.hasLoan === 'Yes' || formData.ownershipStatus === 'Encumbered') {
        status = 'RED';
        title = 'Currently Not Eligible';
        message = 'Sree Vriddhi only evaluates clear-title, unencumbered assets. Assets with active bank liens or mortgages cannot be processed.';
      } else if (formData.approxValue < 25000 || formData.ownershipStatus === 'Joint Owner') {
        status = 'YELLOW';
        title = 'Additional Verification Required';
        message = 'Your application requires joint-owner consent or specific minimum threshold review before proceeding.';
      }

      // Save to CRM Leads
      const newLead = addLead({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        location: formData.location,
        assetType: formData.assetType,
        approxValue: Number(formData.approxValue),
        notes: `Eligibility Check Result: ${status}. Preferred Tenure: ${formData.preferredTenure}, Frequency: ${formData.preferredFrequency}`
      });

      setResult({ status, title, message, leadId: newLead.id });
      setFeedback({ type: 'success', message: 'Your eligibility assessment has been captured in the CRM and our team will follow up shortly.' });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Interactive Evaluation</span>
        <h1 className="text-3xl font-bold font-serif-brand text-white">Asset Eligibility Checker</h1>
        <p className="text-xs text-slate-300">
          This preliminary assessment checks basic asset parameters. All results indicate potential eligibility and do not constitute final approval.
        </p>
      </div>

      {/* Monthly Participant Note */}
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-semibold">
          {tNote}
        </div>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 space-y-6 border-amber-500/30">
          {feedback.message && (
            <div className={`rounded-xl border px-4 py-3 text-sm ${feedback.type === 'error' ? 'border-rose-500/40 bg-rose-500/10 text-rose-200' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'}`}>
              {feedback.message}
            </div>
          )}
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white font-serif-brand flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-400" />
              <span>10-Point Preliminary Evaluation Form</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* 1. Name */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">1. Full Name *</label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Varma"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 focus:border-amber-400 outline-none"
              />
            </div>

            {/* 2. Mobile */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">2. Mobile Number *</label>
              <input
                type="tel"
                required
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="e.g. +91 98480 12345"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 focus:border-amber-400 outline-none"
              />
            </div>

            {/* 3. Email */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">3. Email Address *</label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. ramesh@example.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 focus:border-amber-400 outline-none"
              />
            </div>

            {/* 4. Location */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">4. City / Location *</label>
              <input
                type="text"
                required
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Hyderabad, AP/Telangana"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 focus:border-amber-400 outline-none"
              />
            </div>

            {/* 5. Asset Type */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">5. Asset Category *</label>
              <select
                name="assetType"
                value={formData.assetType}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 focus:border-amber-400 outline-none"
              >
                <option value="Physical Gold">Physical Gold / Jewellery</option>
                <option value="Capital / Money">Capital / Money Deposit</option>
                <option value="Land & Property">Land & Commercial Real Estate</option>
                <option value="Securities">Securities / Financial Assets</option>
              </select>
            </div>

            {/* 6. Approx Value */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">
                6. Estimated Asset Value: <span className="text-amber-400 font-bold">₹{(formData.approxValue / 100000).toFixed(1)} Lakhs</span>
              </label>
              <input
                type="range"
                min="25000"
                max="5000000"
                step="1000"
                name="approxValue"
                value={formData.approxValue}
                onChange={handleChange}
                className="w-full accent-amber-400 mt-2"
              />
            </div>

            {/* 7. Ownership Status */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">7. Ownership Title Status *</label>
              <select
                name="ownershipStatus"
                value={formData.ownershipStatus}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 focus:border-amber-400 outline-none"
              >
                <option value="Sole Owner">Sole Registered Owner</option>
                <option value="Joint Owner">Joint Registered Owner</option>
                <option value="Encumbered">Pledged / Encumbered</option>
              </select>
            </div>

            {/* 8. Loan / Encumbrance */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">8. Existing Loan or Mortgage on Asset? *</label>
              <select
                name="hasLoan"
                value={formData.hasLoan}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 focus:border-amber-400 outline-none"
              >
                <option value="No">No (Clear Title)</option>
                <option value="Yes">Yes (Bank Mortgage / Loan)</option>
              </select>
            </div>

            {/* 9. Preferred Tenure */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">9. Preferred Contract Tenure *</label>
              <select
                name="preferredTenure"
                value={formData.preferredTenure}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 focus:border-amber-400 outline-none"
              >
                <option value="12 Months">12 Months</option>
                <option value="24 Months">24 Months</option>
              </select>
            </div>

            {/* 10. Settlement Frequency */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">10. Preferred Settlement Frequency *</label>
              <select
                name="preferredFrequency"
                value={formData.preferredFrequency}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 focus:border-amber-400 outline-none"
              >
                <option value="Monthly">Monthly</option>
                <option value="Fortnightly">Fortnightly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mt-0.5 accent-amber-400 w-4 h-4"
              />
              <span>
                I hereby declare that the provided information is true to the best of my knowledge. I understand that eligible assets are subject to verification, valuation, risk assessment, and applicable legal requirements.
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 hover:from-amber-300 hover:to-amber-600 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Evaluating Submission...' : tSubmit}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      ) : (
        /* Preliminary Result Card */
        <div className="glass-card p-8 sm:p-12 space-y-6 text-center border-amber-500/40">
          <div className="flex justify-center">
            {result.status === 'GREEN' && (
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            )}
            {result.status === 'YELLOW' && (
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <AlertTriangle className="w-8 h-8" />
              </div>
            )}
            {result.status === 'RED' && (
              <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <XCircle className="w-8 h-8" />
              </div>
            )}
          </div>

          <span className={`text-xs font-extrabold uppercase px-4 py-1.5 rounded-full inline-block ${
            result.status === 'GREEN' ? 'badge-approved' :
            result.status === 'YELLOW' ? 'badge-review' : 'badge-suspended'
          }`}>
            Preliminary Evaluation: {result.status}
          </span>

          <h2 className="text-2xl font-bold text-white font-serif-brand">{result.title}</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">{result.message}</p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 max-w-md mx-auto">
            <span>CRM Reference Lead ID: </span>
            <strong className="text-amber-400 font-mono">{result.leadId}</strong>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setResult(null);
                setFeedback({ type: '', message: '' });
              }}
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300"
            >
              Test Another Asset
            </button>
            <button
              onClick={() => navigate('/portal/applications/new')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg"
            >
              Proceed to Customer Application →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EligibilityChecker;
