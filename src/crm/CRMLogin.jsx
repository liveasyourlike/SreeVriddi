import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockKeyhole, ShieldCheck, UserRound } from 'lucide-react'

export default function CRMLogin() {
  const navigate = useNavigate()
  const [role, setRole] = useState('admin')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await fetch('/api/crm/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, username, password }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Invalid credentials')
      localStorage.setItem('sv_crm_token_v3', data.token)
      navigate('/crm')
    } catch (err) {
      setError(err.message || 'Unable to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[78vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-amber-500/25 bg-slate-950 p-7 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10">
            <ShieldCheck className="h-7 w-7 text-amber-400" />
          </div>
          <h1 className="mt-4 text-2xl font-black text-white">Sree Vriddhi CRM</h1>
          <p className="mt-1 text-xs text-slate-400">Private customer-management workspace</p>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-2 rounded-xl bg-slate-900 p-1">
          {['admin', 'user'].map((item) => (
            <button key={item} type="button" onClick={() => setRole(item)} className={`rounded-lg py-2.5 text-xs font-bold ${role === item ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>
              {item === 'admin' ? 'Admin' : 'CRM User'}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-xs font-bold text-slate-300">Username
            <span className="relative mt-1 block"><UserRound className="absolute left-3 top-3 h-4 w-4 text-slate-500" /><input required value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-3 text-sm text-white outline-none focus:border-amber-400" placeholder="Enter your CRM username" /></span>
          </label>
          <label className="block text-xs font-bold text-slate-300">Password
            <span className="relative mt-1 block"><LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-slate-500" /><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-3 text-sm text-white outline-none focus:border-amber-400" placeholder="Enter your CRM password" /></span>
          </label>
          {error && <div role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">{error}</div>}
          <button disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 disabled:opacity-60">{loading ? 'Checking…' : `Sign in as ${role === 'admin' ? 'Admin' : 'CRM User'}`}</button>
        </form>
        <p className="mt-6 text-[10px] leading-5 text-slate-500">No demo credentials or default users are included. Access is controlled only by the CRM credentials configured in Vercel.</p>
      </div>
    </div>
  )
}
