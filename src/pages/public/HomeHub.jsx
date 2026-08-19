import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bot, Building2, CircleHelp, FileCheck2, Gem, Globe2, Landmark, MessageCircle, ShieldCheck, Sparkles, WalletCards } from 'lucide-react'
import './home-hub.css'

const destinations = [
  { path: '/about', label: 'About Sree Vriddhi', eyebrow: '01 / FOUNDATION', text: 'Understand the purpose, principles and responsible value-management approach behind Sree Vriddhi.', icon: Globe2, kind: 'orbit', objective: 'Understand us' },
  { path: '/how-it-works', label: 'How It Works', eyebrow: '02 / JOURNEY', text: 'Follow the seven operational stages from enquiry and verification through agreement and settlement.', icon: Sparkles, kind: 'steps', objective: 'Understand the process' },
  { path: '/assets', label: 'Value & Assets', eyebrow: '03 / ASSETS', text: 'Discover which gold, capital, land & property and financial assets may be considered and how they are evaluated.', icon: Gem, kind: 'asset', objective: 'Check asset fit' },
  { path: '/products', label: 'Products', eyebrow: '04 / STRUCTURES', text: 'Compare the available structured value-management arrangements, key terms and suitability considerations.', icon: WalletCards, kind: 'product', objective: 'Compare structures' },
  { path: '/eligibility', label: 'Eligibility', eyebrow: '05 / EVALUATION', text: 'Review the evaluation requirements and continue to the official eligibility submission when ready.', icon: FileCheck2, kind: 'form', objective: 'Start evaluation' },
  { path: '/why-us', label: 'Why Sree Vriddhi', eyebrow: '06 / DIFFERENCE', text: 'See the service principles, governance mindset and customer experience that distinguish the business.', icon: ShieldCheck, kind: 'shield', objective: 'Assess the approach' },
  { path: '/protection', label: 'Protection', eyebrow: '07 / GOVERNANCE', text: 'Understand verification, valuation, documentation, controls and risk-awareness measures.', icon: Landmark, kind: 'shield', objective: 'Review safeguards' },
  { path: '/gallery', label: 'Gallery', eyebrow: '08 / VISUAL STORY', text: 'Explore the visual identity, environments and documented moments that represent the Sree Vriddhi journey.', icon: Building2, kind: 'gallery', objective: 'Explore visually' },
  { path: '/insights', label: 'Insights', eyebrow: '09 / KNOWLEDGE', text: 'Read focused educational material that helps you understand value, verification and structured outcomes.', icon: CircleHelp, kind: 'insight', objective: 'Learn something' },
  { path: '/faq', label: 'FAQ', eyebrow: '10 / ANSWERS', text: 'Get concise answers to common questions before contacting the team or submitting information.', icon: MessageCircle, kind: 'faq', objective: 'Get an answer' },
  { path: '/contact', label: 'Contact', eyebrow: '11 / CONNECT', text: 'Choose the most suitable enquiry or support channel and speak directly with Sree Vriddhi.', icon: MessageCircle, kind: 'contact', objective: 'Talk to us' },
  { path: '/grievances', label: 'Customer Grievance', eyebrow: '12 / SUPPORT', text: 'Raise a customer concern through the dedicated grievance route and understand the response process.', icon: ShieldCheck, kind: 'support', objective: 'Raise a concern' },
]

function InteractiveMark() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const move = (event) => {
      const r = el.getBoundingClientRect()
      const x = (event.clientX - r.left) / r.width - 0.5
      const y = (event.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--mx', `${x * 16}deg`)
      el.style.setProperty('--my', `${y * -16}deg`)
    }
    const leave = () => { el.style.setProperty('--mx', '0deg'); el.style.setProperty('--my', '0deg') }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [])
  return (
    <div ref={ref} className="hub-mark" aria-label="Sree Vriddhi interactive brand visual">
      <div className="hub-orbit hub-orbit-one" /><div className="hub-orbit hub-orbit-two" /><div className="hub-orbit hub-orbit-three" />
      <div className="hub-logo-3d"><img src="/brand/logo-primary.jpeg" alt="Sree Vriddhi logo" /></div>
      <div className="hub-float hub-float-top">SREE VRIDDHI<span>VALUE • RESPONSIBILITY</span></div>
      <div className="hub-float hub-float-bottom">INTERACTIVE EXPERIENCE<span>MOVE YOUR POINTER</span></div>
    </div>
  )
}

function DestinationCard({ item, index }) {
  const Icon = item.icon
  return (
    <Link to={item.path} className={`hub-destination hub-${item.kind}`} style={{ '--delay': `${index * 45}ms` }}>
      <div className="hub-card-art" aria-hidden="true"><span /><span /><span /></div>
      <div className="hub-card-top"><span>{item.eyebrow}</span><Icon size={18} /></div>
      <h2>{item.label}</h2>
      <p>{item.text}</p>
      <span className="hub-card-link"><strong>{item.objective}</strong> <ArrowRight size={15} /></span>
    </Link>
  )
}

export default function HomeHub() {
  return (
    <div className="home-hub">
      <section className="hub-hero">
        <div className="hub-hero-ambient" /><div className="hub-hero-grid" />
        <div className="hub-hero-inner">
          <div className="hub-copy">
            <div className="hub-kicker"><span /> THE SREE VRIDDHI EXPERIENCE <b>2026</b></div>
            <h1>Your value.<br /><em>Our responsibility.</em><br />Your returns.</h1>
            <p>One focused home screen. Each destination has one clear customer objective, while the deeper page owns the detailed interaction for that subject.</p>
            <div className="hub-actions">
              <Link to="/eligibility" className="hub-primary"><FileCheck2 size={17} /> Start evaluation <ArrowRight size={16} /></Link>
              <button type="button" className="hub-secondary" onClick={() => window.dispatchEvent(new CustomEvent('sv-open-chat'))}><Bot size={17} /> Ask Sree Vriddhi AI</button>
            </div>
            <div className="hub-proof"><span><ShieldCheck size={14} /> Verification first</span><span><Sparkles size={14} /> Guided experience</span><span><Gem size={14} /> Asset-led decisions</span></div>
          </div>
          <InteractiveMark />
        </div>
      </section>

      <section className="hub-directory" aria-labelledby="hub-directory-title">
        <div className="hub-directory-head">
          <div><span className="hub-kicker">OBJECTIVE-LED NAVIGATION</span><h2 id="hub-directory-title">Choose what you need to accomplish.</h2></div>
          <p>These are the primary website destinations. The footer is intentionally reserved for actions, support, customer access and policy—not a second copy of this menu.</p>
        </div>
        <div className="hub-grid">{destinations.map((item, index) => <DestinationCard key={item.path} item={item} index={index} />)}</div>
      </section>
    </div>
  )
}
