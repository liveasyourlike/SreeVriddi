import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown, ArrowRight, Building2, CarFront, CheckCircle2,
  ChevronRight, CircleDollarSign, Gem, Landmark, Leaf, Search,
  ShieldCheck, Sprout, Store, Users, Wrench, Fuel, BriefcaseBusiness,
  AlertTriangle, FileCheck2, HandCoins
} from 'lucide-react';

const sectors = [
  { id: 1, title: 'Daily Finance', description: 'Short term lending and daily finance activities.', detail: 'Review lending purpose, repayment capacity, documentation and applicable requirements before any proposal is considered.', icon: HandCoins, visual: 'coins', group: 'Finance & tangible assets', status: 'Evaluation required' },
  { id: 2, title: 'Physical Gold', description: 'Investment in physical gold for value security.', detail: 'Any gold-related proposal requires ownership checks, independent purity and weight verification, valuation and documented custody terms.', icon: Gem, visual: 'gold', group: 'Finance & tangible assets', status: 'Verification required' },
  { id: 3, title: 'Fixed Deposits', description: 'Safe investment in bank fixed deposits.', detail: 'Bank deposits are subject to the issuing bank’s terms, tenure, eligibility and applicable protections. Sree Vriddhi is not a bank.', icon: Landmark, visual: 'bank', group: 'Finance & tangible assets', status: 'Product-specific review' },
  { id: 4, title: 'Housing Rentals', description: 'Earning through residential property rentals.', detail: 'Property proposals need ownership and title checks, occupancy and rental review, maintenance costs and applicable legal checks.', icon: Building2, visual: 'home', group: 'Property & mobility', status: 'Property review required' },
  { id: 5, title: 'Vehicle Rentals', description: 'Income from cars and other vehicle rentals.', detail: 'Assessment may include vehicle ownership, registration, insurance, operating costs, demand and rental or fleet agreements.', icon: CarFront, visual: 'car', group: 'Property & mobility', status: 'Asset review required' },
  { id: 6, title: 'Oil & Gas Purchase', description: 'Investment in oil and gas purchase.', detail: 'Any commodity-related proposal needs supplier and transaction verification, price-risk disclosure and review of applicable licences and rules.', icon: Fuel, visual: 'energy', group: 'Business & enterprise', status: 'Due diligence required' },
  { id: 7, title: 'Retail Businesses', description: 'Street foods, saree stalls, fruits and juice centers, and kirana stores.', detail: 'Small-business proposals may be assessed using operating plans, location, inventory, cash flow, permissions and records.', icon: Store, visual: 'retail', group: 'Business & enterprise', status: 'Business review required' },
  { id: 8, title: 'EV & Automobiles Workshops', description: 'Workshops and services for EVs and automobiles.', detail: 'Review can cover workshop equipment, trained staff, service demand, safety procedures, premises and business records.', icon: Wrench, visual: 'workshop', group: 'Business & enterprise', status: 'Business review required' },
  { id: 9, title: 'Staff Recruitment Agency', description: 'Recruitment services and placement solutions.', detail: 'Assessment may include recruitment specialisation, client agreements, placement workflow, data handling and operating costs.', icon: Users, visual: 'people', group: 'Business & enterprise', status: 'Business review required' },
  { id: 10, title: 'Virtual Stocks', description: 'Investments in virtual stock-based opportunities.', detail: 'The exact product, platform, custody, risks and regulatory status must be independently verified. No returns are guaranteed.', icon: CircleDollarSign, visual: 'stocks', group: 'Finance & tangible assets', status: 'Product and risk review required' }
];

const visualSymbols = {
  coins: ['₹', '◉', '₹'], gold: ['◆', '⬟', '◆'], bank: ['▰', '▰', '▰'],
  home: ['⌂', '▱', '⌂'], car: ['●', '▰', '●'], energy: ['⌁', '⚡', '⌁'],
  retail: ['▤', '▥', '▤'], workshop: ['⚙', '✦', '⚙'], people: ['●', '●', '●'],
  stocks: ['↗', '▥', '↗']
};

function SectorArtwork({ sector }) {
  const Icon = sector.icon;
  const symbols = visualSymbols[sector.visual] || ['✦', '◆', '✦'];
  return (
    <div className={`sector-art sector-art--${sector.visual}`} aria-hidden="true">
      <span className="sector-orbit sector-orbit--one" />
      <span className="sector-orbit sector-orbit--two" />
      <span className="sector-symbol sector-symbol--left">{symbols[0]}</span>
      <span className="sector-symbol sector-symbol--right">{symbols[2]}</span>
      <div className="sector-object"><Icon size={46} strokeWidth={1.45} /></div>
      <span className="sector-symbol sector-symbol--base">{symbols[1]}</span>
      <span className="sector-glow" />
    </div>
  );
}

export default function Assets() {
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('All sectors');
  const groups = ['All sectors', 'Finance & tangible assets', 'Property & mobility', 'Business & enterprise'];
  const visibleSectors = useMemo(() => sectors.filter((sector) => {
    const matchesGroup = group === 'All sectors' || sector.group === group;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [sector.title, sector.description, sector.detail, sector.group].some((value) => value.toLowerCase().includes(query));
    return matchesGroup && matchesSearch;
  }), [group, search]);

  return (
    <main className="sector-page">
      <style>{`
        .sector-page{--sv-navy:#06172d;--sv-gold:#d7a642;--sv-cream:#fff8e9;--sv-green:#1e6538;color:var(--text-primary,#f8fafc);max-width:1440px;margin:0 auto;padding:clamp(18px,4vw,48px) clamp(14px,3vw,36px) 64px}
        .sector-hero{position:relative;isolation:isolate;overflow:hidden;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(230px,.85fr);gap:24px;align-items:center;padding:clamp(24px,5vw,58px);border:1px solid rgba(215,166,66,.45);border-radius:28px;background:radial-gradient(ellipse at 78% 30%,rgba(215,166,66,.18),transparent 40%),linear-gradient(125deg,#06172d 0%,#0a2740 64%,#103d2d 100%);box-shadow:0 24px 70px rgba(0,0,0,.24)}
        .sector-hero:after{content:"";position:absolute;inset:auto -10% -70% 25%;height:100%;border:1px solid rgba(215,166,66,.25);border-radius:50%;z-index:-1}
        .sector-kicker{font-size:11px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#edc96f}
        .sector-hero h1{font-family:Georgia,serif;font-size:clamp(32px,5vw,60px);line-height:1.04;letter-spacing:-.03em;color:#fff8e9;margin:14px 0}
        .sector-hero p{max-width:650px;line-height:1.75;color:#d7e0e8;font-size:14px}
        .sector-hero-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
        .sector-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 16px;border-radius:12px;font-size:12px;font-weight:800;text-decoration:none;transition:transform .2s,background .2s}
        .sector-btn:hover{transform:translateY(-2px)}.sector-btn--gold{background:linear-gradient(120deg,#f5d989,#d7a642);color:#07172b}.sector-btn--outline{border:1px solid rgba(255,255,255,.24);color:#fff;background:rgba(255,255,255,.04)}
        .hero-orb{height:240px;display:grid;place-items:center;position:relative;perspective:800px}
        .hero-orb-core{width:142px;height:142px;border-radius:38px;display:grid;place-items:center;color:#f6d77f;background:linear-gradient(145deg,#123c50,#06172d 65%);border:1px solid rgba(239,201,111,.7);box-shadow:inset 8px 8px 20px rgba(255,255,255,.08),inset -10px -10px 22px rgba(0,0,0,.5),0 22px 45px rgba(0,0,0,.35);transform:rotateX(12deg) rotateY(-14deg);animation:svFloat 5s ease-in-out infinite}
        .hero-orb-core span{font:52px Georgia,serif;text-shadow:0 3px 18px rgba(215,166,66,.4)}
        .hero-orb-ring{position:absolute;width:205px;height:205px;border:1px solid rgba(237,201,111,.7);border-radius:50%;transform:rotateX(67deg) rotateZ(-18deg);box-shadow:0 0 26px rgba(215,166,66,.12)}
        .hero-orb-ring--two{width:224px;height:224px;transform:rotateX(67deg) rotateZ(45deg);border-color:rgba(119,187,131,.45)}
        .hero-orb-caption{position:absolute;bottom:0;font-size:10px;letter-spacing:.18em;color:#f3d68c;text-transform:uppercase}
        .sector-values{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:22px 0 44px}
        .sector-value{display:flex;gap:12px;align-items:flex-start;padding:16px;border-radius:16px;border:1px solid rgba(215,166,66,.22);background:linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.018))}
        .sector-value-icon{width:38px;height:38px;flex:none;display:grid;place-items:center;border-radius:12px;color:#f2d17d;background:rgba(215,166,66,.12);border:1px solid rgba(215,166,66,.3)}
        .sector-value strong{display:block;font-size:12px;color:#f7d98d;margin:1px 0 5px}.sector-value span{display:block;font-size:11px;line-height:1.55;color:#cbd5e1}
        .sector-section-heading{display:flex;justify-content:space-between;align-items:end;gap:18px;margin:0 0 20px}
        .sector-section-heading h2{font:clamp(26px,3vw,38px)/1.1 Georgia,serif;color:#f9e7b8;margin:8px 0}
        .sector-section-heading p{font-size:12px;line-height:1.7;color:#aebccc;max-width:620px}
        .sector-toolbar{display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin:20px 0}
        .sector-search{display:flex;align-items:center;gap:9px;min-width:min(100%,280px);padding:10px 13px;border-radius:12px;border:1px solid rgba(215,166,66,.25);background:rgba(255,255,255,.045);color:#f4d78c}
        .sector-search input{width:100%;background:transparent;border:0;outline:0;color:inherit;font-size:12px}.sector-search input::placeholder{color:#98a7b8}
        .sector-filters{display:flex;gap:7px;flex-wrap:wrap}.sector-filter{border:1px solid rgba(215,166,66,.24);background:transparent;color:#cbd5e1;border-radius:999px;padding:9px 12px;font-size:10px;font-weight:800;cursor:pointer}.sector-filter[aria-pressed="true"]{background:#d7a642;color:#06172d;border-color:#d7a642}
        .sector-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
        .sector-card{position:relative;overflow:hidden;display:flex;flex-direction:column;min-width:0;border-radius:20px;border:1px solid rgba(215,166,66,.25);background:linear-gradient(160deg,rgba(255,255,255,.065),rgba(255,255,255,.018));box-shadow:0 12px 30px rgba(0,0,0,.12);transition:transform .25s,border-color .25s,box-shadow .25s}
        .sector-card:hover{transform:translateY(-5px);border-color:rgba(239,201,111,.7);box-shadow:0 20px 40px rgba(0,0,0,.2)}
        .sector-card-top{padding:18px 18px 0;display:flex;align-items:center;justify-content:space-between;gap:10px}
        .sector-number{display:grid;place-items:center;width:29px;height:29px;border-radius:50%;background:linear-gradient(145deg,#3c8a42,#145128);border:1px solid rgba(181,232,135,.65);color:white;font-size:12px;font-weight:900;box-shadow:0 4px 10px rgba(0,0,0,.2)}
        .sector-status{font-size:9px;line-height:1.4;font-weight:800;color:#d8e8c8;background:rgba(35,105,56,.22);border:1px solid rgba(111,182,112,.24);border-radius:999px;padding:6px 8px;text-align:right}
        .sector-art{position:relative;display:grid;place-items:center;height:155px;margin:2px 14px 0;overflow:hidden;isolation:isolate;perspective:700px}
        .sector-art:before{content:"";position:absolute;bottom:15px;width:130px;height:28px;border-radius:50%;background:radial-gradient(ellipse,rgba(215,166,66,.24),transparent 70%);filter:blur(4px)}
        .sector-object{z-index:2;width:94px;height:94px;display:grid;place-items:center;color:#f6d77f;border:1px solid rgba(245,213,126,.5);border-radius:27px;background:linear-gradient(145deg,rgba(215,166,66,.23),rgba(6,23,45,.85) 62%);box-shadow:inset 6px 6px 14px rgba(255,255,255,.1),inset -7px -8px 15px rgba(0,0,0,.45),0 15px 24px rgba(0,0,0,.28);transform:rotateX(13deg) rotateY(-15deg);animation:svFloat 5.5s ease-in-out infinite}
        .sector-orbit{position:absolute;width:138px;height:138px;border:1px solid rgba(215,166,66,.38);border-radius:50%;transform:rotateX(68deg) rotateZ(-22deg)}
        .sector-orbit--two{width:160px;height:160px;border-color:rgba(106,176,115,.25);transform:rotateX(68deg) rotateZ(35deg)}
        .sector-symbol{position:absolute;z-index:3;color:#f4d27a;text-shadow:0 3px 10px rgba(215,166,66,.4);font-size:23px;font-weight:900}
        .sector-symbol--left{left:calc(50% - 68px);top:40px;transform:translateZ(22px) rotate(-12deg)}.sector-symbol--right{right:calc(50% - 69px);top:54px;transform:translateZ(25px) rotate(12deg)}.sector-symbol--base{bottom:15px;font-size:15px;opacity:.7}
        .sector-glow{position:absolute;width:70px;height:70px;border-radius:50%;background:rgba(215,166,66,.15);filter:blur(22px);z-index:-1}
        .sector-art--gold .sector-object{color:#f4c64e;background:linear-gradient(145deg,#f9e5a0,#b97a0d 42%,#39280c 100%)}
        .sector-art--bank .sector-object,.sector-art--home .sector-object{color:#b7d9ff}
        .sector-art--car .sector-object,.sector-art--workshop .sector-object{color:#d9e8f3}
        .sector-art--energy .sector-object{color:#a5e6b2}.sector-art--retail .sector-object{color:#f0d5a2}.sector-art--people .sector-object{color:#b9d8ff}.sector-art--stocks .sector-object{color:#a8edb5}
        .sector-card-body{padding:0 20px 20px;display:flex;flex-direction:column;flex:1}
        .sector-card h3{font:700 21px/1.2 Georgia,serif;color:#fff5db;margin:8px 0 9px}.sector-card p{font-size:12px;line-height:1.7;color:#c5d0dc;margin:0 0 13px}
        .sector-detail{font-size:11px!important;color:#9fb0c1!important;border-top:1px solid rgba(255,255,255,.09);padding-top:12px;margin-top:auto!important}
        .sector-card-link{display:inline-flex;align-items:center;gap:7px;color:#f2d27b;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.07em;text-decoration:none;margin-top:5px}
        .sector-card-link:hover{color:#fff1b8}
        .sector-process{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:9px;margin-top:20px}
        .sector-step{padding:15px 10px;border-radius:14px;border:1px solid rgba(215,166,66,.22);background:rgba(255,255,255,.035);text-align:center}
        .sector-step b{display:block;color:#f4d27b;font-size:11px;margin:8px 0 5px}.sector-step span{font-size:10px;line-height:1.5;color:#c1ccd8;display:block}
        .sector-why{display:grid;grid-template-columns:.9fr 1.1fr;gap:18px;margin-top:40px}
        .sector-panel{border-radius:20px;border:1px solid rgba(215,166,66,.28);padding:clamp(18px,3vw,28px);background:linear-gradient(145deg,rgba(18,77,45,.55),rgba(6,23,45,.85))}
        .sector-panel h2{font:24px Georgia,serif;color:#f7dfa0;margin:0 0 16px}.sector-benefits{display:grid;gap:12px}.sector-benefit{display:flex;gap:9px;align-items:flex-start;font-size:12px;line-height:1.6;color:#e0e7df}
        .sector-trust-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
        .sector-trust{padding:13px;border-radius:13px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09)}
        .sector-trust svg{color:#e9c76f}.sector-trust strong{display:block;color:#f4dda1;font-size:11px;margin:8px 0 5px}.sector-trust span{display:block;color:#c5d0dc;font-size:10px;line-height:1.6}
        .sector-risk{display:flex;gap:12px;margin-top:22px;padding:17px;border-radius:15px;border:1px solid rgba(236,184,73,.38);background:rgba(139,92,18,.13);color:#e8d6a7;font-size:11px;line-height:1.7}
        .sector-risk svg{flex:none;color:#f0c85f}
        .sector-cta{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:22px;padding:22px 24px;border-radius:18px;background:linear-gradient(105deg,#0a2840,#123f2b);border:1px solid rgba(215,166,66,.4)}
        .sector-cta h2{font:24px Georgia,serif;color:#fff0c8;margin:0 0 6px}.sector-cta p{font-size:12px;line-height:1.6;color:#c8d5dc;margin:0}
        @keyframes svFloat{0%,100%{transform:translateY(0) rotateX(13deg) rotateY(-15deg)}50%{transform:translateY(-7px) rotateX(9deg) rotateY(-8deg)}}
        @media(prefers-reduced-motion:reduce){.sector-object,.hero-orb-core{animation:none}.sector-card,.sector-btn{transition:none}}
        @media(max-width:900px){.sector-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.sector-values{grid-template-columns:repeat(2,minmax(0,1fr))}.sector-process{grid-template-columns:repeat(4,minmax(0,1fr))}.sector-hero{grid-template-columns:1fr}.hero-orb{height:210px}.sector-why{grid-template-columns:1fr}}
        @media(max-width:560px){.sector-grid{grid-template-columns:1fr}.sector-values{grid-template-columns:1fr 1fr;gap:8px}.sector-value{padding:11px;gap:8px}.sector-value-icon{width:31px;height:31px}.sector-section-heading{align-items:flex-start;flex-direction:column}.sector-process{grid-template-columns:repeat(2,minmax(0,1fr))}.sector-trust-grid{grid-template-columns:1fr}.sector-cta{align-items:flex-start;flex-direction:column}.sector-art{height:135px}.sector-card h3{font-size:20px}.sector-hero{padding:24px 19px}.hero-orb{height:185px}}
      `}</style>

      <section className="sector-hero">
        <div>
          <div className="sector-kicker">Sree Vriddhi · Value & Opportunity</div>
          <h1>Your Value.<br />Our Responsibility.</h1>
          <p>We explore opportunities across tangible assets and real-world businesses. Every proposal is considered on its own merits, with transparent evaluation, documented terms and clear risk information.</p>
          <div className="sector-hero-actions">
            <a href="#investment-sectors" className="sector-btn sector-btn--gold">Explore all 10 sectors <ArrowDown size={15} /></a>
            <Link to="/eligibility" className="sector-btn sector-btn--outline">Start an evaluation <ArrowRight size={15} /></Link>
          </div>
        </div>
        <div className="hero-orb" aria-label="Decorative three-dimensional value-growth illustration">
          <span className="hero-orb-ring" /><span className="hero-orb-ring hero-orb-ring--two" />
          <div className="hero-orb-core"><span>₹</span></div>
          <div className="hero-orb-caption">Value · Trust · Growth</div>
        </div>
      </section>

      <section className="sector-values" aria-label="Our principles">
        {[
          { icon: ShieldCheck, title: 'Safe & considered', text: 'Risk checks and verification before any proposal proceeds.' },
          { icon: Sprout, title: 'Growth mindset', text: 'Explore opportunities with a long-term, responsible view.' },
          { icon: HandCoins, title: 'Trust & transparency', text: 'Understand the process, documents, costs and risks.' },
          { icon: FileCheck2, title: 'Proper documentation', text: 'Written terms and independent review where appropriate.' }
        ].map(({ icon: Icon, title, text }) => <div className="sector-value" key={title}><div className="sector-value-icon"><Icon size={19} /></div><div><strong>{title}</strong><span>{text}</span></div></div>)}
      </section>

      <section id="investment-sectors" className="scroll-mt-8">
        <div className="sector-section-heading">
          <div><div className="sector-kicker">Explore opportunities</div><h2>Our Investment Sectors</h2><p>Browse the ten sectors shown in the Sree Vriddhi reference poster. The illustrations are conceptual 3D-style visuals, not photographs of specific assets or proof of an active investment.</p></div>
        </div>
        <div className="sector-toolbar">
          <label className="sector-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search sectors or activities…" aria-label="Search sectors" /></label>
          <div className="sector-filters" aria-label="Filter sectors">{groups.map((name) => <button key={name} type="button" className="sector-filter" aria-pressed={group === name} onClick={() => setGroup(name)}>{name}</button>)}</div>
        </div>
        <p className="text-xs text-slate-400 mb-4" aria-live="polite">Showing {visibleSectors.length} of 10 sectors</p>
        {visibleSectors.length ? <div className="sector-grid">{visibleSectors.map((sector) => {
          return <article className="sector-card" key={sector.id}>
            <div className="sector-card-top"><span className="sector-number">{sector.id}</span><span className="sector-status">{sector.status}</span></div>
            <SectorArtwork sector={sector} />
            <div className="sector-card-body">
              <h3>{sector.title}</h3><p>{sector.description}</p><p className="sector-detail">{sector.detail}</p>
              {sector.id === 2 ? <Link className="sector-card-link" to="/assets/physical-gold">Gold category guidelines <ChevronRight size={14} /></Link> : sector.id === 4 ? <Link className="sector-card-link" to="/assets/property">Property guidelines <ChevronRight size={14} /></Link> : <Link className="sector-card-link" to="/eligibility">Ask about this sector <ChevronRight size={14} /></Link>}
            </div>
          </article>;
        })}</div> : <div className="rounded-xl border border-white/10 p-8 text-center text-sm text-slate-300">No sectors match that search. Try a different keyword or choose “All sectors”.</div>}
      </section>

      <section className="sector-why">
        <div className="sector-panel">
          <h2>Why consider Sree Vriddhi?</h2>
          <div className="sector-benefits">{[
            'Opportunities across real-world sectors and assets',
            'Diversified ideas for consideration—not a promise of balanced or positive returns',
            'A documented evaluation process and clear communication',
            'Risk information and terms to review before deciding',
            'Your value deserves careful, responsible consideration'
          ].map((item) => <div className="sector-benefit" key={item}><CheckCircle2 size={16} className="text-amber-300 shrink-0 mt-0.5" />{item}</div>)}</div>
        </div>
        <div className="sector-panel">
          <h2>How it works</h2>
          <div className="sector-process">{[
            { n: '01', title: 'Enquiry', text: 'Share your question or proposal.' },
            { n: '02', title: 'Verify & KYC', text: 'Identity and documents are checked.' },
            { n: '03', title: 'Evaluation', text: 'Review asset, business and risks.' },
            { n: '04', title: 'Agreement', text: 'Read and agree written terms.' },
            { n: '05', title: 'Allocation', text: 'Only if approved and documented.' },
            { n: '06', title: 'Updates', text: 'Receive applicable status reports.' },
            { n: '07', title: 'Settlement', text: 'Follow the executed agreement.' }
          ].map((step) => <div className="sector-step" key={step.n}><span>{step.n}</span><b>{step.title}</b><span>{step.text}</span></div>)}</div>
        </div>
      </section>

      <section className="sector-panel mt-5">
        <h2>Our commitments</h2>
        <div className="sector-trust-grid">
          {[
            { icon: ShieldCheck, title: 'Transparent process', text: 'A clear explanation of steps, eligibility and documentation.' },
            { icon: Building2, title: 'Secure & confidential', text: 'Personal information should be handled with appropriate safeguards.' },
            { icon: Users, title: 'Experienced team', text: 'Ask for relevant experience and credentials during evaluation.' },
            { icon: BriefcaseBusiness, title: 'Diversified allocation', text: 'Sector variety does not remove risk or guarantee returns.' },
            { icon: FileCheck2, title: 'Proper documentation', text: 'Review signed agreements, fees, risks and settlement conditions.' },
            { icon: Leaf, title: 'Responsible growth', text: 'Make informed decisions without pressure or unrealistic promises.' }
          ].map(({ icon: Icon, title, text }) => <div className="sector-trust" key={title}><Icon size={22} /><strong>{title}</strong><span>{text}</span></div>)}
        </div>
      </section>

      <div className="sector-risk"><AlertTriangle size={20} /><div><strong>Important risk and eligibility notice</strong><br />The sectors above describe areas of interest, not confirmation that every activity or product is currently available, authorised or accepting funds. All proposals are subject to due diligence, legal and regulatory review, eligibility, risk assessment and signed terms. Market-linked or business returns can be variable; capital can be at risk and returns are not guaranteed. Do not rely on illustrative return figures without independently reviewing the exact product, provider, documentation and applicable requirements.</div></div>

      <section className="sector-cta">
        <div><h2>Have an asset or sector question?</h2><p>Start with an enquiry. An evaluation request is not an approval or an investment commitment.</p></div>
        <Link to="/eligibility" className="sector-btn sector-btn--gold">Start evaluation <ArrowRight size={15} /></Link>
      </section>
    </main>
  );
}
