import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, ShieldCheck } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Is Sree Vriddhi a stock trading platform or brokerage?',
      a: 'No. Sree Vriddhi is NOT a stock trading platform, stock brokerage, or crypto platform. We provide structured value-management solutions for eligible physical gold, capital, and real estate assets under bipartite legal agreements.'
    },
    {
      q: 'Does Sree Vriddhi guarantee fixed or risk-free returns?',
      a: 'No. We do not claim "guaranteed risk-free income" or "assured profit". All return structures and settlement terms represent proposed commercial assumptions that are subject to legal review, valuation, risk assessment, and executed contractual terms.'
    },
    {
      q: 'What asset categories can be evaluated for Sree Vriddhi products?',
      a: 'Primary eligible categories include liquid capital deposited through banking channels, hallmarked physical gold (coins, bars, jewellery), and clear-title commercial or residential real estate land holdings. Securities are accepted only under separate regulatory eligibility.'
    },
    {
      q: 'Are all submitted assets automatically accepted?',
      a: 'No. All submitted assets undergo mandatory 30-year legal searches (for land), XRF assay testing (for gold), and independent certified valuation before product matching and legal proposal approval.'
    },
    {
      q: 'What is the standard contract tenure and notice period?',
      a: 'Standard proposed contracts run for a 12-month tenure with a 60-day notice period for contract maturity, renewal, or asset return.'
    },
    {
      q: 'How are periodic payouts delivered to customers?',
      a: 'Agreed monthly or fortnightly contractual payouts are disbursed directly into the customer’s verified bank account via direct bank transfer (NEFT/RTGS).'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Clear Answers</span>
        <h1 className="text-3xl font-bold font-serif-brand text-white">Frequently Asked Questions</h1>
        <p className="text-xs text-slate-300">
          Find transparent answers regarding our legal structure, valuation process, eligible assets, and contractual settlements.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search questions or topics..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-100 focus:border-amber-400 outline-none"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="glass-card border-amber-500/20 overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-900/60 transition-colors"
              >
                <span className="text-sm font-bold text-white font-serif-brand">{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
              </button>
              {isOpen && (
                <div className="p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
