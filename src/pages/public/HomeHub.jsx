import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bot, Building2, CircleHelp, FileCheck2, Gem, Globe2, Landmark, MessageCircle, ShieldCheck, Sparkles, WalletCards } from 'lucide-react'
import { useSreeVriddhi } from '../../context/SreeVriddhiContext'
import './home-hub.css'

const destinations = [
  { path: '/about', label: 'About Sree Vriddhi', eyebrow: '01 / FOUNDATION', text: 'Who we are, what we stand for and how responsible value management works.', icon: Globe2, kind: 'orbit' },
  { path: '/how-it-works', label: 'How It Works', eyebrow: '02 / JOURNEY', text: 'Explore the seven-step path from enquiry and verification to agreement and settlement.', icon: Sparkles, kind: 'steps' },
  { path: '/assets', label: 'Value & Assets', eyebrow: '03 / ASSETS', text: 'Explore eligible physical gold, capital, land & property and financial assets.', icon: Gem, kind: 'asset' },
  { path: '/products', label: 'Products', eyebrow: '04 / STRUCTURES', text: 'Understand available structured value-management options before applying.', icon: WalletCards, kind: 'product' },
  { path: '/eligibility', label: 'Eligibility', eyebrow: '05 / EVALUATION', text: 'Preview the actual evaluation journey and open the official eligibility form.', icon: FileCheck2, kind: 'form' },
  { path: '/why-us', label: 'Why Sree Vriddhi', eyebrow: '06 / DIFFERENCE', text: 'See the principles, governance and service approach behind the experience.', icon: ShieldCheck, kind: 'shield' },
  { path: '/protection', label: 'Protection', eyebrow: '07 / GOVERNANCE', text: 'Understand verification, valuation, documentation, controls and responsible handling.', icon: Landmark, kind: 'shield' },
  { path: '/gallery', label: 'Gallery', eyebrow: '08 / VISUALS', text: 'Explore the visual story, environments, people and business journey.', icon: Building2, kind: 'gallery' },
  { path: '/insights', label: 'Insights', eyebrow: '09 / KNOWLEDGE', text: 'Read concise educational content around value, verification and structured outcomes.', icon: CircleHelp, kind: 'insight' },
  { path: '/faq', label: 'FAQ', eyebrow: '10 / ANSWERS', text: 'Get direct answers to common customer questions without unnecessary reading.', icon: MessageCircle, kind: 'faq' },
  { path: '/contact', label: 'Contact', eyebrow: '11 / CONNECT', text: 'Reach Sree Vriddhi through the available support and enquiry channels.', icon: MessageCircle, kind: 'contact' },
  { path: '/grievances', label: 'Customer Grievance', eyebrow: '12 / SUPPORT', text: 'Raise a concern and follow the customer grievance process clearly.', icon: ShieldCheck, kind: 'support' },
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
      <span className="hub-card-link">Enter section <ArrowRight size={15} /></span>
    </Link>
  )
}

export default function HomeHub() {
  const { brandSettings } = useSreeVriddhi()
  return (
    <div className="home-hub">
      <section className="hub-hero">
        <div className="hub-hero-ambient" /><div className="hub-hero-grid" />
        <div className="hub-hero-inner">
          <div className="hub-copy">
            <div className="hub-kicker"><span /> THE SREE VRIDDHI EXPERIENCE <b>2026</b></div>
            <h1>Your value.<br /><em>Our responsibility.</em><br />Your returns.</h1>
            <p>One concise home screen. Every major Sree Vriddhi section is a direct interactive destination — no unnecessary wall of scrolling.</p>
            <div className="hub-actions">
              <Link to="/eligibility" className="hub-primary"><FileCheck2 size={17} /> Check Eligibility <ArrowRight size={16} /></Link>
              <button type="button" className="hub-secondary" onClick={() => window.dispatchEvent(new CustomEvent('sv-open-chat'))}><Bot size={17} /> Ask Sree Vriddhi AI</button>
            </div>
            <div className="hub-proof"><span><ShieldCheck size={14} /> Verification first</span><span><Sparkles size={14} /> Interactive guidance</span><span><Gem size={14} /> Asset-led experience</span></div>
          </div>
          <InteractiveMark />
        </div>
      </section>

      <section className="hub-directory" aria-labelledby="hub-directory-title">
        <div className="hub-directory-head">
          <div><span className="hub-kicker">EXPLORE THE WEBSITE</span><h2 id="hub-directory-title">Choose where you want to go.</h2></div>
          <p>Each card is a visual doorway. The deeper pages carry the detailed interaction appropriate to that subject.</p>
        </div>
        <div className="hub-grid">{destinations.map((item, index) => <DestinationCard key={item.path} item={item} index={index} />)}</div>
      </section>

      <section className="hub-final">
        <div className="hub-final-mark"><img src="/brand/logo-primary.jpeg" alt="Sree Vriddhi logo" /></div>
        <div><span className="hub-kicker">NEED A HUMAN?</span><h2>Talk to Sree Vriddhi.</h2><p>{brandSettings?.phone ? `Call ${brandSettings.phone} or use the available support channel.` : 'Use the available support channels for a direct conversation.'}</p></div>
        <Link to="/contact" className="hub-primary">Contact Sree Vriddhi <ArrowRight size={16} /></Link>
      </section>
    </div>
  )
}
