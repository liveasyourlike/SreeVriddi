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

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const response = await fetch('/api/crm/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role, username, password }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('sv_crm_token', data.token)
      localStorage.setItem('sv_crm_role', data.role)
      navigate('/crm')
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  return <div className="min-h-[75vh] flex items-center justify-center px-4 py-12"><div className="w-full max-w-md rounded-3xl border border-amber-500/25 bg-slate-950/95 shadow-2xl p-7 sm:p-9"><div className="text-center"><div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center"><ShieldCheck className="w-7 h-7 text-amber-400"/></div><h1 className="mt-4 text-2xl font-black text-white">Sree Vriddhi CRM</h1><p className="text-xs text-slate-400 mt-1">Basic CRM subproject · controlled access</p></div>
    <div className="grid grid-cols-2 gap-2 mt-7 bg-slate-900 p-1 rounded-xl"><button type="button" onClick={() => setRole('admin')} className={`py-2.5 rounded-lg text-xs font-bold ${role === 'admin' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Admin</button><button type="button" onClick={() => setRole('user')} className={`py-2.5 rounded-lg text-xs font-bold ${role === 'user' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>CRM User</button></div>
    <form onSubmit={submit} className="space-y-4 mt-6"><div><label className="block text-xs font-bold text-slate-300 mb-1">Username</label><div className="relative"><UserRound className="absolute left-3 top-3 w-4 h-4 text-slate-500"/><input value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" required className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-amber-400" placeholder="Enter username"/></div></div><div><label className="block text-xs font-bold text-slate-300 mb-1">Password</label><div className="relative"><LockKeyhole className="absolute left-3 top-3 w-4 h-4 text-slate-500"/><input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-amber-400" placeholder="Enter password"/></div></div>{error && <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs p-3">{error}</div>}<button disabled={loading} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider disabled:opacity-60">{loading ? 'Signing in…' : `Sign in as ${role === 'admin' ? 'Admin' : 'CRM User'}`}</button></form>
    <p className="text-[10px] leading-5 text-slate-500 mt-6">Credentials are intentionally not hard-coded in the website. You control the temporary Admin and CRM User username/password through Vercel Environment Variables.</p>
  </div></div>
}
