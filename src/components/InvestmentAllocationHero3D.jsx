import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, BarChart3, Building2, Car, Coins, Factory, Fuel, HandCoins, Landmark, ShoppingBag, Store, Users, Wrench, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../styles/investment-allocation-3d.css'

const sectors = [
  { id: 'daily-finance', title: 'Daily Finance', telugu: 'రోజువారీ ఫైనాన్స్', icon: HandCoins, to: '/assets', visual: '💳', accent: 'Finance', detail: 'Daily finance allocation category within the Sree Vriddhi framework.' },
  { id: 'physical-gold', title: 'Physical Gold', telugu: 'భౌతిక బంగారం', icon: Coins, to: '/assets', visual: '🪙', accent: 'Physical Asset', detail: 'Physical gold allocation category within the Sree Vriddhi framework.' },
  { id: 'fixed-deposits', title: 'Fixed Deposits', telugu: 'ఫిక్స్‌డ్ డిపాజిట్లు', icon: Landmark, to: '/products', visual: '🏦', accent: 'Structured Product', detail: 'Fixed-deposit category presented as part of the product framework.' },
  { id: 'housing-rentals', title: 'Housing Rentals', telugu: 'హౌసింగ్ అద్దెలు', icon: Building2, to: '/assets', visual: '🏠', accent: 'Rental', detail: 'Housing rental category within the real-sector allocation view.' },
  { id: 'vehicle-rentals', title: 'Vehicle Rentals', telugu: 'వాహన అద్దెలు', icon: Car, to: '/assets', visual: '🚗', accent: 'Rental', detail: 'Vehicle rental category within the real-sector allocation view.' },
  { id: 'oil-gas', title: 'Oil & Gas Purchase', telugu: 'ఆయిల్ & గ్యాస్ కొనుగోలు', icon: Fuel, to: '/assets', visual: '⛽', accent: 'Real Sector', detail: 'Oil and gas purchase category within the allocation framework.' },
  { id: 'retail-businesses', title: 'Retail Businesses', telugu: 'రిటైల్ వ్యాపారాలు', icon: Store, to: '/assets', visual: '🛍️', accent: 'Business', detail: 'Retail business category covering street foods, saree stalls, fruits & juice centers, and kirana stores.', subcategories: ['Street Foods', 'Saree Stalls', 'Fruits & Juice Centers', 'Kirana Stores'] },
  { id: 'ev-auto-workshops', title: 'EV and automobiles workshops', telugu: 'EV & ఆటోమొబైల్ వర్క్‌షాప్స్', icon: Wrench, to: '/assets', visual: '🔧', accent: 'Business', detail: 'EV and automobile workshop category within the real-sector allocation view.' },
  { id: 'staff-recruitment', title: 'Staff Recruitment Agency', telugu: 'స్టాఫ్ రిక్రూట్‌మెంట్ ఏజెన్సీ', icon: Users, to: '/assets', visual: '👥', accent: 'Services', detail: 'Staff recruitment agency category within the service-sector allocation view.' },
  { id: 'virtual-stocks', title: 'Virtual Stocks', telugu: 'వర్చువల్ స్టాక్స్', icon: BarChart3, to: '/products', visual: '📈', accent: 'Virtual', detail: 'Virtual stocks category shown as an allocation topic. No live market value is claimed here.' },
]

export default function InvestmentAllocationHero3D() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const active = sectors[activeIndex]
  const ActiveIcon = active.icon
  const orbitItems = useMemo(() => sectors, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex(value => (value + 1) % sectors.length)
      setFlipped(false)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [])

  const selectSector = index => {
    setActiveIndex(index)
    setFlipped(false)
  }

  return (
    <section className="allocation-hero-3d relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-slate-950/90 px-4 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12 shadow-2xl" aria-labelledby="priority-allocation-title">
      <div className="allocation-light allocation-light-one" />
      <div className="allocation-light allocation-light-two" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-7 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.2em] text-amber-300">Priority 01 · Investment Allocation</span>
          <h2 id="priority-allocation-title" className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-5xl font-serif-brand">Explore the allocation universe</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">Tap any sector to bring it forward. Flip the focused card to explore its English + తెలుగు context, then open the existing detailed section.</p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div className="order-2 lg:order-1">
            <div className="allocation-sector-card-wrap" style={{ perspective: '1400px' }}>
              <div className={`allocation-sector-card ${flipped ? 'is-flipped' : ''}`}>
                <div className="allocation-sector-face allocation-sector-front">
                  <div className="allocation-image-stage" aria-hidden="true">
                    <div className="allocation-image-orbit allocation-image-orbit-a" />
                    <div className="allocation-image-orbit allocation-image-orbit-b" />
                    <div className="allocation-visual-symbol">{active.visual}</div>
                    <div className="allocation-icon-ring"><ActiveIcon className="h-7 w-7" /></div>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-amber-300">{active.accent}</span>
                    <span className="text-[10px] text-slate-500">01 / {String(sectors.length).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-extrabold text-white">{active.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-amber-200">{active.telugu}</p>
                  <p className="mt-4 text-xs leading-5 text-slate-400">{active.detail}</p>
                  <button type="button" onClick={() => setFlipped(true)} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2.5 text-xs font-extrabold text-amber-200 transition hover:-translate-y-0.5 hover:bg-amber-400/20">Flip to explore <ArrowRight className="h-4 w-4" /></button>
                </div>
                <div className="allocation-sector-face allocation-sector-back">
                  <div className="flex items-center justify-between"><span className="text-[9px] font-extrabold uppercase tracking-[.2em] text-amber-400">Sector Explorer · రంగం అన్వేషణ</span><button type="button" onClick={() => setFlipped(false)} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Return to sector card"><X className="h-4 w-4" /></button></div>
                  <div className="mt-5 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-400/10 text-amber-300"><ActiveIcon className="h-6 w-6" /></div><div><h3 className="text-lg font-extrabold text-white">{active.title}</h3><p className="text-xs font-semibold text-amber-200">{active.telugu}</p></div></div>
                  <p className="mt-5 text-xs leading-6 text-slate-300">{active.detail}</p>
                  {active.subcategories && <div className="mt-4"><p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500">Retail categories · రిటైల్ విభాగాలు</p><div className="mt-2 grid grid-cols-2 gap-2">{active.subcategories.map(value => <span key={value} className="rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-2 text-[10px] font-semibold text-slate-300">{value}</span>)}</div></div>}
                  <Link to={active.to} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/20">Open detailed section <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </div>

          <div className="allocation-stage order-1 mx-auto flex min-h-[390px] w-full max-w-[560px] items-center justify-center lg:order-2">
            <div className="allocation-orbit allocation-orbit-enhanced relative h-72 w-72 sm:h-[370px] sm:w-[370px]">
              <div className="allocation-orbit-plane allocation-orbit-plane-one" />
              <div className="allocation-orbit-plane allocation-orbit-plane-two" />
              {orbitItems.map((sector, index) => {
                const angle = (index / orbitItems.length) * 360
                const isActive = activeIndex === index
                const SectorIcon = sector.icon
                return <button key={sector.id} type="button" className={`allocation-orbit-item ${isActive ? 'is-active' : ''}`} style={{ '--angle': `${angle}deg` }} onClick={() => selectSector(index)} aria-label={`Explore ${sector.title} — ${sector.telugu}`} title={`${sector.title} — ${sector.telugu}`}><span className="allocation-orbit-number">{index + 1}</span><SectorIcon className="h-4 w-4" /></button>
              })}
              <button type="button" onClick={() => setFlipped(value => !value)} className="allocation-core absolute inset-[21%] flex flex-col items-center justify-center rounded-full border border-amber-300/50 bg-slate-950/95 text-center shadow-[0_0_90px_rgba(212,175,55,.24)]" aria-label={`Flip ${active.title} explorer`}>
                <ActiveIcon className="h-9 w-9 text-amber-300" />
                <span className="mt-3 px-5 text-sm font-extrabold text-white">{active.title}</span>
                <span className="mt-1 px-4 text-[10px] font-semibold text-amber-200">{active.telugu}</span>
                <span className="mt-3 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[9px] font-bold text-amber-200">Tap to flip · ఫ్లిప్ చేయండి</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-5" role="tablist" aria-label="Investment allocation sectors">
          {sectors.map((sector, index) => { const SectorIcon = sector.icon; return <button key={sector.id} type="button" onClick={() => selectSector(index)} role="tab" aria-selected={activeIndex === index} className={`allocation-sector-pill ${activeIndex === index ? 'is-active' : ''}`}><SectorIcon className="h-3.5 w-3.5" /><span>{sector.title}</span></button> })}
        </div>
        <p className="mt-4 text-center text-[10px] text-slate-500">All sector labels are presented as the Sree Vriddhi allocation framework. No live market value or return claim is displayed in this showcase.</p>
      </div>
    </section>
  )
}
