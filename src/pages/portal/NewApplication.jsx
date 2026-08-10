import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, FileCheck2 } from 'lucide-react';

const NewApplication = () => {
  const { submitApplication } = useSreeVriddhi();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal
    customerName: 'Ramesh Varma',
    email: 'ramesh.varma@example.com',
    mobile: '+91 98480 12345',
    address: 'Plot 42, Jubilee Hills, Hyderabad',
    // Step 2: KYC
    panNumber: 'ABCDE1234F',
    aadhaarNumber: '987654321012',
    // Step 3: Asset Details
    assetType: 'Physical Gold',
    assetDescription: '300 grams 24K Certified Gold Coins / Bars',
    estimatedValue: 1500000,
    // Step 4: Ownership Documents
    purchaseInvoiceNo: 'INV-2025-9871',
    // Step 5: Valuation
    preferredValuationDate: '2026-08-15',
    // Step 6: Bank Details
    bankName: 'HDFC Bank',
    ifscCode: 'HDFC0001234',
    accountNumber: '50100123456789',
    // Step 7: Nominee
    nomineeName: 'Sunita Varma',
    nomineeRelation: 'Spouse',
    // Step 8: Declarations
    declarationAccepted: true
  });

  const [submittedApp, setSubmittedApp] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const stepTitles = [
    'Personal Info',
    'KYC Verification',
    'Asset Information',
    'Ownership Proof',
    'Valuation Request',
    'Bank Account',
    'Nominee Details',
    'Declarations',
    'Review Application',
    'Final Submission'
  ];

  const handleNext = () => {
    if (currentStep === 8 && !formData.declarationAccepted) {
      setFeedback({ type: 'error', message: 'Please confirm the declaration to continue.' });
      return;
    }

    setFeedback({ type: '', message: '' });

    if (currentStep === 9) {
      // Final Submit
      const app = submitApplication({
        customerId: 'SV-CUST-2026-089',
        customerName: formData.customerName,
        mobile: formData.mobile,
        assetType: formData.assetType,
        assetDescription: formData.assetDescription,
        estimatedValue: Number(formData.estimatedValue),
        verifiedValue: Number(formData.estimatedValue),
        tenure: '12 Months',
        settlementFrequency: 'Monthly',
        nomineeName: formData.nomineeName,
        bankDetails: { bank: formData.bankName, ifsc: formData.ifscCode, accNo: formData.accountNumber }
      });
      setSubmittedApp(app);
      setFeedback({ type: 'success', message: `Application ${app.id} was saved to the customer portal and valuation queue.` });
      setCurrentStep(10);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">10-Step Customer Application Wizard</span>
        <h1 className="text-3xl font-bold font-serif-brand text-white">New Asset Value Application</h1>
      </div>

      {/* Step Progress Bar */}
      <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 text-[11px] overflow-x-auto gap-2">
        {stepTitles.map((title, idx) => {
          const stepNum = idx + 1;
          const isActive = currentStep === stepNum;
          const isDone = currentStep > stepNum;
          return (
            <div key={idx} className="flex items-center gap-1.5 flex-shrink-0">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                isDone ? 'bg-emerald-500 text-slate-950' :
                isActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
              }`}>
                {isDone ? '✓' : stepNum}
              </div>
              <span className={`hidden md:inline font-medium ${isActive ? 'text-amber-300 font-bold' : 'text-slate-400'}`}>{title}</span>
            </div>
          );
        })}
      </div>

      {/* Step Form Container */}
      {currentStep < 10 ? (
        <div className="glass-card p-8 sm:p-10 space-y-6 border-amber-500/30">
          <h2 className="text-xl font-bold text-white font-serif-brand border-b border-slate-800 pb-3">
            Step {currentStep} of 10: {stepTitles[currentStep - 1]}
          </h2>

          {feedback.message && (
            <div className={`rounded-xl border px-4 py-3 text-sm ${feedback.type === 'error' ? 'border-rose-500/40 bg-rose-500/10 text-rose-200' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'}`}>
              {feedback.message}
            </div>
          )}

          <div className="space-y-4 text-xs">
            {currentStep === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Full Legal Name</label>
                  <input type="text" value={formData.customerName} onChange={e => setFormData({ ...formData, customerName: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none" />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Mobile Number</label>
                  <input type="text" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-300 font-semibold block mb-1">Residential Address</label>
                  <input type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">PAN Card Number</label>
                  <input type="text" value={formData.panNumber} onChange={e => setFormData({ ...formData, panNumber: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none font-mono uppercase" />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Aadhaar Number (12 Digits)</label>
                  <input type="text" value={formData.aadhaarNumber} onChange={e => setFormData({ ...formData, aadhaarNumber: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none font-mono" />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Select Asset Category</label>
                  <select value={formData.assetType} onChange={e => setFormData({ ...formData, assetType: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none">
                    <option value="Physical Gold">Physical Gold / Jewellery</option>
                    <option value="Capital / Money">Capital / Money Deposit</option>
                    <option value="Land & Property">Commercial Real Estate / Land</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Detailed Description of Asset</label>
                  <textarea rows="3" value={formData.assetDescription} onChange={e => setFormData({ ...formData, assetDescription: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none" />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Estimated Asset Value (₹)</label>
                  <input type="number" value={formData.estimatedValue} onChange={e => setFormData({ ...formData, estimatedValue: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none font-mono" />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <p className="text-slate-300">Upload ownership proof invoices, title deeds, or bank certificates.</p>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Invoice / Title Document Reference Number</label>
                  <input type="text" value={formData.purchaseInvoiceNo} onChange={e => setFormData({ ...formData, purchaseInvoiceNo: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none" />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Preferred Independent Inspection Date</label>
                <input type="date" value={formData.preferredValuationDate} onChange={e => setFormData({ ...formData, preferredValuationDate: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none" />
              </div>
            )}

            {currentStep === 6 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Bank Name</label>
                  <input type="text" value={formData.bankName} onChange={e => setFormData({ ...formData, bankName: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none" />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">IFSC Code</label>
                  <input type="text" value={formData.ifscCode} onChange={e => setFormData({ ...formData, ifscCode: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none font-mono uppercase" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-300 font-semibold block mb-1">Account Number</label>
                  <input type="text" value={formData.accountNumber} onChange={e => setFormData({ ...formData, accountNumber: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none font-mono" />
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Nominee Full Name</label>
                  <input type="text" value={formData.nomineeName} onChange={e => setFormData({ ...formData, nomineeName: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none" />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Relationship with Nominee</label>
                  <input type="text" value={formData.nomineeRelation} onChange={e => setFormData({ ...formData, nomineeRelation: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 outline-none" />
                </div>
              </div>
            )}

            {currentStep === 8 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  I hereby declare that the asset submitted is unencumbered and possessed with clean legal title. I acknowledge that product eligibility, return structures, and final contractual agreements are subject to legal verification and formal executed contract terms.
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.declarationAccepted} onChange={e => setFormData({ ...formData, declarationAccepted: e.target.checked })} className="accent-amber-400 w-4 h-4" />
                  <span>I agree to the above terms and legal declarations.</span>
                </label>
              </div>
            )}

            {currentStep === 9 && (
              <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-amber-300">Summary Review Before Final Submission</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <span>Applicant: <strong>{formData.customerName}</strong></span>
                  <span>Asset Type: <strong>{formData.assetType}</strong></span>
                  <span>Estimated Value: <strong>₹{Number(formData.estimatedValue).toLocaleString()}</strong></span>
                  <span>Bank: <strong>{formData.bankName} ({formData.ifscCode})</strong></span>
                  <span>Nominee: <strong>{formData.nomineeName}</strong></span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-between">
            <button disabled={currentStep === 1} onClick={handlePrev} className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 disabled:opacity-40">
              Back
            </button>
            <button onClick={handleNext} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1">
              <span>{currentStep === 9 ? 'Submit Application' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Step 10: Confirmation */
        <div className="glass-card p-10 text-center space-y-6 border-amber-500/40">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white font-serif-brand">Application Submitted Successfully</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Your application has been assigned tracking ID <strong className="text-amber-400 font-mono">{submittedApp?.id}</strong> and is currently under valuation inspection review.
          </p>
          {feedback.message && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {feedback.message}
            </div>
          )}
          <div className="flex justify-center gap-4">
            <button onClick={() => navigate('/portal/applications')} className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
              View Application Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewApplication;
