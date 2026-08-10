import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, UserCheck, Calculator, Scale, FileSignature, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: 'STEP 01',
      title: 'Tell Us About Your Value',
      subtitle: 'Initial Asset & Needs Declaration',
      icon: FileText,
      short: 'Submit preliminary information regarding your capital, gold, land, or eligible asset.',
      detailed: 'Complete our confidential online enquiry or eligibility checker. Provide basic details about your asset category, estimated market value, location, and your preferred settlement frequency.',
      documents: ['Asset Type Declaration', 'Estimated Value Estimate', 'Contact Details'],
      status: 'Initial Lead Creation'
    },
    {
      number: 'STEP 02',
      title: 'Verify Ownership',
      subtitle: 'Legal Title & Encumbrance Verification',
      icon: ShieldCheck,
      short: 'Establish clear legal title and unencumbered ownership rights over submitted assets.',
      detailed: 'Our legal desk verifies that the submitted asset possesses clean, legal, and unencumbered title deeds or bank ownership credentials. No third-party or encumbered assets are accepted.',
      documents: ['Original Invoices (Gold)', '30-Yr Encumbrance Cert (Land)', 'Bank Statements (Capital)'],
      status: 'Legal Search Pending'
    },
    {
      number: 'STEP 03',
      title: 'Eligibility & KYC',
      subtitle: 'Customer Identity & Compliance Matching',
      icon: UserCheck,
      short: 'Perform mandatory identity verification, PAN/Aadhaar KYC, and regulatory screening.',
      detailed: 'Under strict anti-money laundering and regulatory standards, customer identities are verified. Customer risk profiling and eligibility matching ensure regulatory approval.',
      documents: ['PAN Card', 'Aadhaar Card / Passport', 'Address Proof', 'Bank Account Verification'],
      status: 'KYC Verification'
    },
    {
      number: 'STEP 04',
      title: 'Professional Valuation',
      subtitle: 'Certified Independent Asset Assessment',
      icon: Calculator,
      short: 'Independent certified valuers inspect and determine the official eligible market value.',
      detailed: 'Gold undergoes XRF spectrometer assaying; land is surveyed by Govt-approved valuers; capital is reconciled via banking channels. Valuation report fixes the official exposure cap.',
      documents: ['Assay Certificate (Gold)', 'Valuation Inspection Report', 'Bank Statement Audit'],
      status: 'Certified Valuation'
    },
    {
      number: 'STEP 05',
      title: 'Risk & Product Assessment',
      subtitle: 'Custom Legal Product Matching',
      icon: Scale,
      short: 'Risk assessment committee matches the asset with an active compliance-approved product.',
      detailed: 'The internal risk matrix calculates exposure caps, notice period requirements (e.g. 60 days), contract tenure (e.g. 12 months), and proposed monthly/fortnightly settlement structures.',
      documents: ['Risk Matrix Evaluation Sheet', 'Product Matching Approval', 'Indicative Proposal Sheet'],
      status: 'Proposal Generation'
    },
    {
      number: 'STEP 06',
      title: 'Agreement & Activation',
      subtitle: 'Bipartite Legal Contract Execution',
      icon: FileSignature,
      short: 'Customer signs the legal agreement detailing terms, obligations, and payout schedules.',
      detailed: 'Upon customer acceptance of the indicative proposal, formal legal contracts (SV-CON-2026-XXXXXX) are executed with full legal enforceability, custody terms, and clear exit clauses.',
      documents: ['Executed Legal Agreement', 'Custody Receipt', 'Settlement Schedule Sheet'],
      status: 'Contract Activation'
    },
    {
      number: 'STEP 07',
      title: 'Periodic Settlement & Maturity',
      subtitle: 'Structured Returns & Contract Exit',
      icon: CheckCircle,
      short: 'Receive scheduled periodic contractual payouts directly into your registered bank account.',
      detailed: 'Throughout the 12-month tenure, agreed monthly (e.g. 5%) or fortnightly payouts are processed via direct banking channels. At contract maturity, final settlement or renewal occurs smoothly.',
      documents: ['NEFT / RTGS Payout Receipts', 'Maturity Settlement Notice', 'No Dues Certificate'],
      status: 'Active Settlement & Exit'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Step-by-Step Governance</span>
        <h1 className="text-4xl font-extrabold font-serif-brand text-white">How Sree Vriddhi Works</h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Our structured 7-step process ensures maximum transparency, title protection, certified valuation, and legally binding contractual settlements.
        </p>
      </div>

      {/* Interactive Horizontal / Vertical Progress Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Step Selector Column */}
        <div className="lg:col-span-4 space-y-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between border ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-500/50 text-white shadow-lg'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isCurrent ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-amber-400'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">{s.number}</span>
                    <h4 className="text-xs font-bold text-white">{s.title}</h4>
                  </div>
                </div>
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-amber-300' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Step Detail Card */}
        <div className="lg:col-span-8">
          <div className="glass-card p-8 sm:p-10 space-y-6 border-amber-500/40 relative overflow-hidden">
            <div className="flex justify-between items-start border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">{steps[activeStep].number}</span>
                <h2 className="text-2xl font-bold text-white font-serif-brand mt-1">{steps[activeStep].title}</h2>
                <p className="text-xs text-amber-200/80 font-medium mt-0.5">{steps[activeStep].subtitle}</p>
              </div>
              <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full badge-review">
                {steps[activeStep].status}
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-200">Process Overview</h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                {steps[activeStep].detailed}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">Required Documentation & Deliverables</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {steps[activeStep].documents.map((doc, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 disabled:opacity-40"
              >
                ← Previous Step
              </button>
              
              <Link
                to="/eligibility"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
              >
                <span>Start Step 1 Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 disabled:opacity-40"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HowItWorks;
