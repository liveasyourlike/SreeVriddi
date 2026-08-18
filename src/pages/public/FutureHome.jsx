import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowRight, Bot, Building2, Check, Coins, Gem, Globe2, Landmark, LockKeyhole, MessageCircle, MousePointer2, Play, Rotate3D, ShieldCheck, Sparkles, WalletCards, Waves, Zap } from 'lucide-react'
import { useSreeVriddhi } from '../../context/SreeVriddhiContext'
import './future-home.css'

function WebGLField() {
  const canvasRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true })
    if (!gl) return undefined

    const vertexSource = `attribute vec2 a; void main(){gl_Position=vec4(a,0.0,1.0);}`
    const fragmentSource = `precision highp float; uniform vec2 r; uniform float t; uniform vec2 p; void main(){ vec2 uv=gl_FragCoord.xy/r.xy; vec2 q=uv-.5; q.x*=r.x/r.y; float d=length(q); float a=atan(q.y,q.x); float wave=sin(d*18.0-t*0.55+a*5.0)*0.5+0.5; float glow=exp(-d*3.4); vec3 gold=vec3(0.86,0.66,0.18); vec3 blue=vec3(0.05,0.18,0.42); vec3 ink=vec3(0.01,0.03,0.08); float shift=sin((uv.x+p.x)*5.0+t*.15)*.08; vec3 c=mix(ink,blue,glow*.9); c=mix(c,gold,wave*glow*.34); c+=gold*pow(max(0.0,1.0-d*1.8),4.0)*.10; gl_FragColor=vec4(c,0.88); }`
    const compile = (type, source) => { const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); return shader }
    const program = gl.createProgram(); gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource)); gl.linkProgram(program); gl.useProgram(program)
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const timeLoc = gl.getUniformLocation(program, 't'); const resLoc = gl.getUniformLocation(program, 'r'); const pointerLoc = gl.getUniformLocation(program, 'p')
    let raf = 0
    const resize = () => { const dpr = Math.min(window.devicePixelRatio || 1, 1.75); const w = canvas.clientWidth * dpr; const h = canvas.clientHeight * dpr; if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0,0,w,h) } }
    const render = (time) => { resize(); gl.uniform1f(timeLoc, time * 0.001); gl.uniform2f(resLoc, canvas.width, canvas.height); gl.uniform2f(pointerLoc, pointer.current.x, pointer.current.y); gl.drawArrays(gl.TRIANGLE_STRIP,0,4); raf=requestAnimationFrame(render) }
    const onMove = (event) => { pointer.current.x = event.clientX / window.innerWidth; pointer.current.y = 1 - event.clientY / window.innerHeight }
    window.addEventListener('pointermove', onMove, { passive: true }); raf=requestAnimationFrame(render)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); gl.deleteProgram(program) }
  }, [])

  return <canvas ref={canvasRef} className="sv-webgl" aria-hidden="true" />
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => { const node = ref.current; if (!node) return undefined; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.classList.add('is-visible'); observer.disconnect() } }, { threshold: 0.14 }); observer.observe(node); return () => observer.disconnect() }, [])
  return <div ref={ref} className={`sv-reveal ${className}`}>{children}</div>
}

function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const onMove = (event) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); const x = (event.clientX-r.left)/r.width-.5; const y = (event.clientY-r.top)/r.height-.5; el.style.setProperty('--rx', `${y*-8}deg`); el.style.setProperty('--ry', `${x*10}deg`) }
  const reset = () => { const el=ref.current; if(el){el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')} }
  return <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`sv-tilt ${className}`}>{children}</div>
}

function MagneticButton({ children, to, href, primary = false }) {
  const ref = useRef(null)
  const onMove = (event) => { const el=ref.current; if(!el) return; const r=el.getBoundingClientRect(); el.style.transform=`translate(${(event.clientX-r.left-r.width/2)*.10}px, ${(event.clientY-r.top-r.height/2)*.10}px)` }
  const reset=()=>{if(ref.current)ref.current.style.transform=''}
  const props={ref,onPointerMove:onMove,onPointerLeave:reset,className:`sv-magnetic ${primary?'sv-magnetic-primary':''}`}
  return to ? <Link {...props} to={to}>{children}</Link> : <a {...props} href={href}>{children}</a>
}

const assets = [
  { icon: Coins, title: 'Physical Gold', tag: 'VALUED', text: 'Purity, ownership and custody move through a transparent verification layer.', orbit: 'gold' },
  { icon: Landmark, title: 'Capital', tag: 'ELIGIBLE', text: 'Verifiable banking trails and source-of-funds checks create structured clarity.', orbit: 'blue' },
  { icon: Building2, title: 'Land & Property', tag: 'CONDITIONAL', text: 'Title, encumbrance and independent valuation shape the eligibility path.', orbit: 'violet' },
  { icon: WalletCards, title: 'Financial Assets', tag: 'REVIEW', text: 'Eligible securities can be evaluated separately under applicable requirements.', orbit: 'green' },
]

const journey = [
  ['01','Tell Us','Enquiry & value details'], ['02','Verify','Ownership & identity'], ['03','Qualify','KYC & eligibility'], ['04','Value','Certified inspection'], ['05','Assess','Risk & structure'], ['06','Agree','Legal contract'], ['07','Settle','Periodic settlement & exit']
]

export default function FutureHome() {
  const { brandSettings, products } = useSreeVriddhi()
  const [activeAsset, setActiveAsset] = useState(0)
  const [tenure, setTenure] = useState('12 Months')
  const [amount, setAmount] = useState(250000)
  const [rot, setRot] = useState(0)
  const active = assets[activeAsset]
  const product = products?.[0]
  const estimate = Math.round(amount * ((product?.proposedMonthlyReturn || 5) / 100))
  const formatINR = useMemo(() => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }), [])

  return (
    <div className="sv-future-home">
      <section className="sv-future-hero">
        <WebGLField />
        <div className="sv-aurora sv-aurora-a" /><div className="sv-aurora sv-aurora-b" />
        <div className="sv-hero-noise" />
        <div className="sv-hero-grid" />
        <div className="sv-hero-inner">
          <div className="sv-hero-copy">
            <div className="sv-eyebrow"><span className="sv-live-dot" /> THE VALUE OPERATING SYSTEM <span>2026</span></div>
            <h1 className="sv-kinetic-title"><span>YOUR VALUE.</span><span className="sv-title-glow">OUR RESPONSIBILITY.</span><span>YOUR RETURNS.</span></h1>
            <p className="sv-hero-sub">A cinematic, transparent journey for eligible assets — built around verification, valuation, governance and responsible contractual outcomes.</p>
            <div className="sv-hero-actions"><MagneticButton to="/eligibility" primary><Sparkles size={17}/> Check Eligibility <ArrowRight size={16}/></MagneticButton><MagneticButton to="/how-it-works"><Play size={16}/> Explore the journey</MagneticButton></div>
            <div className="sv-hero-proof"><span><ShieldCheck size={15}/> Verification first</span><span><LockKeyhole size={15}/> Governance led</span><span><Zap size={15}/> Digital journey</span></div>
          </div>
          <div className="sv-hero-object" onPointerMove={(e)=>{const r=e.currentTarget.getBoundingClientRect(); setRot(((e.clientX-r.left)/r.width-.5)*24)}} onPointerLeave={()=>setRot(0)}>
            <div className="sv-orbit orbit-1"/><div className="sv-orbit orbit-2"/><div className="sv-orbit orbit-3"/>
            <div className="sv-3d-core" style={{transform:`rotateX(${rot*.4}deg) rotateY(${rot}deg)`}}><div className="sv-core-face"><span>S</span></div><div className="sv-core-ring ring-a"/><div className="sv-core-ring ring-b"/></div>
            <div className="sv-float-card card-top"><span>STRUCTURED</span><strong>VALUE</strong></div><div className="sv-float-card card-bottom"><span>7 STEP</span><strong>JOURNEY</strong></div>
          </div>
        </div>
        <div className="sv-scroll-cue"><MousePointer2 size={14}/> Scroll to enter <ArrowDownRight size={14}/></div>
      </section>

      <section className="sv-section sv-snapshot-section">
        <Reveal className="sv-section-head"><div><span className="sv-kicker">LIVE / VISUAL / CONTEXT</span><h2>Make the value journey <em>visible.</em></h2></div><p>Instead of static pages, Sree Vriddhi becomes an interactive story: every layer answers a real customer question.</p></Reveal>
        <div className="sv-bento">
          <TiltCard className="sv-bento-large"><div className="sv-bento-orbit"><div className="sv-bento-glow"/><div className="sv-bento-ring r1"/><div className="sv-bento-ring r2"/><div className="sv-bento-ring r3"/></div><div className="sv-bento-content"><span className="sv-kicker">01 / VALUE MAP</span><h3>From asset to<br/><strong>structured outcome.</strong></h3><p>Interactive layers replace walls of explanation.</p><Link to="/how-it-works">See the architecture <ArrowRight size={15}/></Link></div></TiltCard>
          <TiltCard className="sv-bento-stat"><span className="sv-kicker">PARTICIPANT CAPACITY</span><strong className="sv-counter">{brandSettings?.participantLimit ?? 10}</strong><span>selected participants / month</span><div className="sv-mini-bars"><i/><i/><i/><i/><i/></div></TiltCard>
          <TiltCard className="sv-bento-ai"><Bot size={28}/><span className="sv-kicker">AI GUIDE</span><h3>Ask anything.<br/><em>Navigate naturally.</em></h3><p>Business questions stay grounded in Sree Vriddhi knowledge, with human escalation when required.</p><button type="button" onClick={()=>window.dispatchEvent(new CustomEvent('sv-open-chat'))}>Open AI guide <ArrowRight size={14}/></button></TiltCard>
          <TiltCard className="sv-bento-market"><span className="sv-kicker">MARKET LAYER</span><div className="sv-market-line"><span>VALUE SIGNAL</span><strong>+5.00%</strong></div><div className="sv-sparkline"><span/><span/><span/><span/><span/><span/><span/><span/><span/></div><small>Indicative commercial figures only. Review applicable terms.</small></TiltCard>
        </div>
      </section>

      <section className="sv-section sv-assets-section">
        <Reveal className="sv-section-head"><div><span className="sv-kicker">INTERACTIVE ASSET UNIVERSE</span><h2>Touch the <em>value.</em></h2></div><p>Hover, tilt and switch categories. The visual system changes with the asset class.</p></Reveal>
        <div className="sv-asset-layout">
          <div className="sv-asset-nav">{assets.map((item, i)=>{const Icon=item.icon; return <button type="button" key={item.title} className={i===activeAsset?'active':''} onClick={()=>setActiveAsset(i)}><Icon size={18}/><span><strong>{item.title}</strong><small>{item.tag}</small></span><ArrowRight size={15}/></button>})}</div>
          <TiltCard className={`sv-asset-stage ${active.orbit}`}><div className="sv-particle-field">{Array.from({length:26}).map((_,i)=><i key={i} style={{'--i':i}}/>)}</div><div className="sv-liquid-object"><div className="sv-object-core"><active.icon size={54}/></div></div><div className="sv-asset-info"><span className="sv-kicker">SELECTED / {active.tag}</span><h3>{active.title}</h3><p>{active.text}</p><Link to="/assets">Explore eligibility rules <ArrowRight size={15}/></Link></div></TiltCard>
        </div>
      </section>

      <section className="sv-section sv-story-section">
        <Reveal className="sv-story-intro"><span className="sv-kicker">SCROLL-SCRUBBED JOURNEY</span><h2>Seven moments.<br/><em>One clear path.</em></h2><p>Scroll-driven cards, progress physics and motion cues turn the existing workflow into a cinematic explainer.</p></Reveal>
        <div className="sv-journey-rail">{journey.map(([num,title,desc],i)=><div className="sv-journey-card" key={num}><span>{num}</span><div className="sv-journey-icon">{i===0?<MessageCircle/>:i===1?<ShieldCheck/>:i===2?<LockKeyhole/>:i===3?<Gem/>:i===4?<Waves/>:i===5?<Check/>:<ArrowRight/>}</div><h3>{title}</h3><p>{desc}</p><div className="sv-card-line"/></div>)}</div>
      </section>

      <section className="sv-section sv-config-section">
        <Reveal className="sv-section-head"><div><span className="sv-kicker">INTERACTIVE PRODUCT CONFIGURATOR</span><h2>See the structure <em>before the paperwork.</em></h2></div><p>Use the same product data already powering the catalogue, presented as an interactive decision surface.</p></Reveal>
        <div className="sv-configurator">
          <div className="sv-config-visual"><div className="sv-config-orb" style={{transform:`rotateY(${rot*2}deg) rotateX(${rot*.3}deg)`}}><div/><span>SV</span></div><div className="sv-config-caption"><span>360° VIEW / DRAG OR MOVE</span><Rotate3D size={16}/></div></div>
          <div className="sv-config-panel"><span className="sv-kicker">{product?.status || 'PRODUCT'}</span><h3>{product?.name || 'Sree Vriddhi Value Prime'}</h3><p>{product?.description || 'Structured value-management framework.'}</p><div className="sv-config-row"><span>Asset value</span><strong>₹{formatINR.format(amount)}</strong></div><input aria-label="Asset value" type="range" min="25000" max="5000000" step="25000" value={amount} onChange={(e)=>setAmount(Number(e.target.value))}/><div className="sv-range-labels"><span>₹25K</span><span>₹50L</span></div><div className="sv-config-row"><span>Tenure</span><div className="sv-pills">{['12 Months','24 Months'].map(v=><button type="button" className={tenure===v?'active':''} key={v} onClick={()=>setTenure(v)}>{v}</button>)}</div></div><div className="sv-estimate"><span>Indicative monthly figure</span><strong>₹{formatINR.format(estimate)}</strong><small>Illustrative only — not a guaranteed return.</small></div><MagneticButton to="/eligibility" primary>Start eligibility <ArrowRight size={16}/></MagneticButton></div>
        </div>
      </section>

      <section className="sv-section sv-ai-section"><Reveal className="sv-ai-panel"><div className="sv-ai-visual"><div className="sv-ai-ripple r1"/><div className="sv-ai-ripple r2"/><div className="sv-ai-ripple r3"/><div className="sv-ai-core"><Bot size={34}/></div></div><div><span className="sv-kicker">CONVERSATIONAL UI / AI AGENT</span><h2>Your website can <em>talk.</em></h2><p>The existing Sree Vriddhi AI assistant remains the support layer. This visual treatment turns it into a visible product feature instead of a floating afterthought.</p><div className="sv-ai-chips"><span>“What assets are eligible?”</span><span>“Explain the 7 steps.”</span><span>“How do I contact you?”</span></div><button type="button" className="sv-magnetic sv-ai-open" onClick={()=>window.dispatchEvent(new CustomEvent('sv-open-chat'))}><Bot size={16}/> Open Sree Vriddhi AI</button></div></Reveal></section>

      <section className="sv-final-cta"><div className="sv-final-glow"/><span className="sv-kicker">THE NEXT VERSION OF SREE VRIDDHI</span><h2>Less scrolling.<br/><em>More understanding.</em></h2><p>Premium motion is used to explain, orient and build confidence — not to distract from the business.</p><div className="sv-hero-actions"><MagneticButton to="/eligibility" primary>Begin your journey <ArrowRight size={16}/></MagneticButton><MagneticButton to="/contact">Talk to Sree Vriddhi <MessageCircle size={16}/></MagneticButton></div><div className="sv-final-badges"><span><Globe2 size={14}/> Responsive 3D</span><span><Sparkles size={14}/> Adaptive motion</span><span><LockKeyhole size={14}/> Reduced-motion ready</span></div></section>
    </div>
  )
}
