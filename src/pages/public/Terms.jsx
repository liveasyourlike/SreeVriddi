import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

const sections = [
  ['Nature of the opportunity', 'Information shown on this website describes business and commercial opportunities. Participation is voluntary and should be considered only after you understand the applicable written agreement and your own financial circumstances.'],
  ['Returns and payouts', 'Any interest, return, payout or settlement mentioned in connection with an opportunity is governed by the applicable written terms. Illustrations or promotional examples must not be treated as a guarantee of future payment unless expressly provided in a valid written agreement and permitted by applicable law.'],
  ['Capital and financial risk', 'Providing money to a business arrangement can involve loss of principal, business performance risk, liquidity risk, counterparty risk, operational risk and other unforeseen risks. Do not commit money required for essential expenses or obligations.'],
  ['Contract period and withdrawal', 'Where an agreement specifies a minimum term, lock-in or other withdrawal conditions, those conditions apply. Early withdrawal, cancellation or settlement is not automatically available and must be handled according to the applicable written agreement.'],
  ['No pressure to participate', 'Sree Vriddhi encourages customers to take time, ask questions and make an independent decision. Limited availability, promotional messages or expected returns should never be the sole reason for committing funds.'],
  ['Information and verification', 'Customers are responsible for providing accurate information and verifying payment details before transferring funds. Never share OTPs, PINs, CVVs, passwords or other confidential banking credentials with anyone claiming to represent Sree Vriddhi.'],
  ['Regulatory status', 'Customers should independently verify the legal, regulatory, registration and licensing status applicable to the particular arrangement before committing funds. A website statement or disclaimer does not itself establish regulatory authorization or legal compliance.'],
  ['Website and AI information', 'Website content and the AI assistant are intended to provide general information and guidance. They do not replace legal, tax, accounting or financial advice, and sensitive or consequential matters may require human review.'],
  ['Application and approval', 'Submitting the preliminary evaluation form is an enquiry/evaluation step. It does not by itself create a contract, guarantee approval, guarantee a return, or establish an obligation to accept funds. Any final arrangement is subject to applicable review and written terms.'],
  ['Policy acknowledgement', 'Before proceeding, customers should confirm that they have read and understood the relevant risk disclosures, terms and conditions and that they are making an informed, voluntary decision.'],
]

export default function Terms() {
  return (
    <div className="ux2-page-shell">
      <div className="ux2-page-card">
        <Link to="/" className="ux2-back"><ArrowLeft size={15} /> Back to Sree Vriddhi</Link>
        <div className="ux2-page-heading"><ShieldAlert /><div><span>Customer Clarity</span><h1>Terms &amp; Conditions</h1></div></div>
        <p className="ux2-page-lead">Please read these customer-facing terms and risk disclosures before submitting an enquiry or preliminary evaluation. They are intended to make the important points easy to understand and should be read together with any applicable written agreement.</p>

        <div className="space-y-4">
          {sections.map(([title, text], index) => (
            <section key={title} className="rounded-2xl border border-slate-800 bg-slate-950/45 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 text-[10px] font-extrabold text-amber-300">{index + 1}</div>
                <div><h2 className="text-sm sm:text-base font-bold text-white">{title}</h2><p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-300">{text}</p></div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs leading-relaxed text-slate-300">
          <div className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /><p><strong className="text-white">Customer acknowledgement:</strong> I have read and understood the relevant risks and terms, have had an opportunity to ask questions, and will proceed only after making an informed and voluntary decision.</p></div>
        </div>

        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-[10px] leading-relaxed text-slate-500">
          These website terms are a customer-information layer and do not replace a formal contract, statutory notice or professional legal/compliance review. Please obtain appropriate professional advice before using this text as a contractual or regulatory document.
        </div>

        <div className="mt-5 text-xs text-slate-400">Questions about these terms? <a className="font-bold text-amber-300 hover:text-amber-200" href="mailto:sreevriddhiforwealth@gmail.com">sreevriddhiforwealth@gmail.com</a> · <a className="font-bold text-amber-300 hover:text-amber-200" href="tel:+919640352929">+91 9640352929</a></div>
      </div>
    </div>
  )
}
