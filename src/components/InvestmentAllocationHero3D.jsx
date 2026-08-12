import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Building2, Car, Coins, Factory, Fuel, HandCoins, Leaf, ShoppingBag, Store, Users, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'

const groups = [
  {
    id: 'core', label: 'Core Sectors', telugu: 'ప్రధాన రంగాలు',
    items: [
      ['Daily Finance', 'రోజువారీ ఫైనాన్స్', HandCoins],
      ['Physical Gold', 'భౌతిక బంగారం', Coins],
      ['Fixed Deposits', 'ఫిక్స్‌డ్ డిపాజిట్లు', Building2],
      ['Housing Rentals', 'హౌసింగ్ అద్దెలు', Building2],
      ['Vehicle Rentals', 'వాహన అద్దెలు', Car],
      ['Oil & Gas Purchase', 'ఆయిల్ & గ్యాస్ కొనుగోలు', Fuel],
    ],
  },
  {
    id: 'business', label: 'Business Sectors', telugu: 'వ్యాపార రంగాలు',
    items: [
      ['Street Foods', 'స్ట్రీట్ ఫుడ్స్', Store],
      ['Saree Stalls', 'చీరల స్టాల్స్', ShoppingBag],
      ['Fruits & Juice Centers', 'పండ్లు & జ్యూస్ సెంటర్లు', Leaf],
      ['Kirana Stores', 'కిరాణా దుకాణాలు', ShoppingBag],
      ['EV & Automobile Workshops', 'EV & ఆటోమొబైల్ వర్క్‌షాప్స్', Wrench],
      ['Staff Recruitment Agency', 'స్టాఫ్ రిక్రూట్‌మెంట్ ఏజెన్సీ', Users],
      ['Virtual Stocks', 'వర్చువల్ స్టాక్స్', Factory],
    ],
  },
]

const allItems = groups.flatMap(group => group.items)

export default function InvestmentAllocationHero3D() {
  const [groupId, setGroupId] = useState('core')
  const [active, setActive] = useState(0)
  const currentGroup = groups.find(group => group.id === groupId) || groups[0]
  const items = currentGroup.items
  const item = items[active % items.length]
  const Icon = item[2]

  useEffect(() => {
    const timer = window.setInterval(() => setActive(value => (value + 1) % items.length), 4200)
    return () => window.clearInterval(timer)
  }, [items.length, groupId])

  const orbitItems = useMemo(() => {
    const source = allItems
    return source.slice(0, 7)
  }, [])

  return (
    <section className="allocation-hero-3d relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-slate-950/80 px-4 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12 shadow-2xl">
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.2em] text-amber-300">
            Priority 01 · Investment Allocation
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-5xl font-serif-brand">
            One vision. <span className="gold-gradient-text">Multiple real sectors.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Explore the sectors that form the Sree Vriddhi allocation vision. Each category is presented clearly without duplicated information, live-value claims, or unnecessary classifications.
          </p>

          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Investment allocation categories">
            {groups.map(group => (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={group.id === groupId}
                onClick={() => { setGroupId(group.id); setActive(0) }}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition ${group.id === groupId ? 'border-amber-400/60 bg-amber-400/15 text-amber-200' : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-amber-400/30'}`}
              >
                {group.label} · {group.telugu}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {items.map(([name, telugu, ItemIcon], index) => (
              <button
                key={name}
                type="button"
                onClick={() => setActive(index)}
                className={`group rounded-xl border p-3 text-left transition ${index === active % items.length ? 'border-amber-400/50 bg-amber-400/10' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'}`}
              >
                <ItemIcon className="mb-2 h-4 w-4 text-amber-300" />
                <span className="block text-xs font-bold text-white">{name}</span>
                <span className="mt-0.5 block text-[10px] text-slate-400">{telugu}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/assets" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/20">
              Explore sectors <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-[11px] text-slate-500">Status: information showcase · స్థితి: సమాచారం ప్రదర్శన</span>
          </div>
        </div>

        <div className="allocation-stage mx-auto flex min-h-[350px] w-full max-w-[520px] items-center justify-center">
          <div className="allocation-orbit relative h-72 w-72 sm:h-80 sm:w-80">
            {orbitItems.map(([name, , ItemIcon], index) => {
              const angle = (index / orbitItems.length) * 360
              return (
                <div key={name} className="allocation-orbit-item" style={{ '--angle': `${angle}deg` }} title={name}>
                  <ItemIcon className="h-4 w-4" />
                </div>
              )
            })}
            <div className="allocation-core absolute inset-[19%] flex flex-col items-center justify-center rounded-full border border-amber-300/50 bg-slate-950/90 text-center shadow-[0_0_70px_rgba(212,175,55,.2)]">
              <Icon className="h-10 w-10 text-amber-300" />
              <span className="mt-3 px-4 text-sm font-extrabold text-white">{item[0]}</span>
              <span className="mt-1 px-4 text-[10px] text-amber-200/80">{item[1]}</span>
              <span className="mt-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold text-emerald-300">Category · వర్గం</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
