import { useEffect, useState } from 'react'
import { Building2, Coins, Landmark, WalletCards } from 'lucide-react'

const choices = [
  { id: 'gold', title: 'Physical Gold', te: 'భౌతిక బంగారం', icon: Coins, tone: 'Asset' },
  { id: 'capital', title: 'Capital / Money', te: 'మూలధనం / డబ్బు', icon: WalletCards, tone: 'Capital' },
  { id: 'land', title: 'Land & Property', te: 'భూమి & ఆస్తి', icon: Building2, tone: 'Property' },
  { id: 'financial', title: 'Financial Assets', te: 'ఆర్థిక ఆస్తులు', icon: Landmark, tone: 'Financial' },
]

export default function EligibilityChoice3D({ value, onChange }) {
  const [rotation, setRotation] = useState(0)
  const active = choices.find((item) => item.id === value) || choices[0]

  useEffect(() => {
    const timer = window.setInterval(() => setRotation((current) => current + 1), 70)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="eligibility-choice-3d" aria-label="Interactive evaluation category selector">
      <div className="eligibility-choice-3d-stage" style={{ '--sv-rotation': `${rotation}deg` }}>
        <div className="eligibility-choice-3d-ring ring-one" />
        <div className="eligibility-choice-3d-ring ring-two" />
        <div className="eligibility-choice-3d-core">
          <active.icon className="h-7 w-7 text-amber-300" aria-hidden="true" />
          <span>{active.tone}</span>
          <small>Tap a category</small>
        </div>
      </div>
      <div className="eligibility-choice-3d-options">
        {choices.map((item) => {
          const Icon = item.icon
          const selected = item.id === active.id
          return (
            <button key={item.id} type="button" onClick={() => onChange(item.id)} aria-pressed={selected} className={`eligibility-choice-3d-option ${selected ? 'is-selected' : ''}`}>
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span><strong>{item.title}</strong><small>{item.te}</small></span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
