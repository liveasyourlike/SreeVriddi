import { useEffect, useState } from 'react'
import { Download, X, Smartphone, CheckCircle2 } from 'lucide-react'

const DISMISS_KEY = 'sv-pwa-install-dismissed'

export default function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [visible, setVisible] = useState(false)
  const [installed, setInstalled] = useState(false)
  const [iosHelp, setIosHelp] = useState(false)

  useEffect(() => {
    const standalone = window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true
    setInstalled(standalone)

    const onBeforeInstall = (event) => {
      event.preventDefault()
      setInstallPrompt(event)
      if (!sessionStorage.getItem(DISMISS_KEY)) setVisible(true)
    }
    const onInstalled = () => {
      setInstalled(true)
      setVisible(false)
      setInstallPrompt(null)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)

    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.warn('Sree Vriddhi offline support could not be registered:', error)
      })
    }

    const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent)
    if (isIOS && !standalone && !sessionStorage.getItem(DISMISS_KEY)) {
      setIosHelp(true)
      setVisible(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const install = async () => {
    if (!installPrompt) {
      setIosHelp(true)
      return
    }
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
    setVisible(false)
  }

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem(DISMISS_KEY, '1')
  }

  if (installed || !visible) return null

  return (
    <aside className="sv-install-card" aria-label="Install Sree Vriddhi app">
      <div className="sv-install-brand">
        <img src="/brand/logo-mark.jpeg" alt="" />
        <div><strong>Take Sree Vriddhi with you</strong><span>Install for a smoother, app-like experience.</span></div>
      </div>
      {iosHelp ? (
        <div className="sv-install-ios-help">
          <Smartphone size={16} />
          <span>On iPhone or iPad, tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.</span>
        </div>
      ) : (
        <button className="sv-install-action" type="button" onClick={install}><Download size={16} /> Install app</button>
      )}
      <button className="sv-install-dismiss" type="button" aria-label="Dismiss install message" onClick={dismiss}><X size={16} /></button>
      <style>{`
        .sv-install-card{position:fixed;z-index:1000;right:18px;bottom:calc(18px + env(safe-area-inset-bottom));width:min(365px,calc(100vw - 28px));padding:15px;border:1px solid rgba(215,166,66,.48);border-radius:18px;background:linear-gradient(135deg,#071b32,#0b2a3b 70%,#12402d);color:#fff8e9;box-shadow:0 18px 50px rgba(0,0,0,.32);animation:svInstallIn .28s ease-out}
        .sv-install-brand{display:flex;align-items:center;gap:11px;padding-right:24px}.sv-install-brand img{width:42px;height:42px;object-fit:cover;border-radius:12px;border:1px solid rgba(215,166,66,.55)}.sv-install-brand strong{display:block;font-size:13px;line-height:1.4}.sv-install-brand span{display:block;margin-top:3px;color:#c4d2df;font-size:11px;line-height:1.5}
        .sv-install-action{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:13px;padding:10px 13px;border:0;border-radius:11px;background:linear-gradient(120deg,#f4d98b,#d7a642);color:#07172b;font-size:12px;font-weight:800;cursor:pointer}
        .sv-install-dismiss{position:absolute;right:9px;top:9px;display:grid;place-items:center;width:28px;height:28px;border:0;border-radius:8px;background:rgba(255,255,255,.08);color:#fff;cursor:pointer}
        .sv-install-ios-help{display:flex;gap:9px;align-items:flex-start;margin-top:13px;padding:10px;border-radius:10px;background:rgba(255,255,255,.06);font-size:11px;line-height:1.6;color:#e4eaf0}.sv-install-ios-help svg{flex:none;color:#f4d98b}
        @keyframes svInstallIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @media(prefers-reduced-motion:reduce){.sv-install-card{animation:none}}
      `}</style>
    </aside>
  )
}