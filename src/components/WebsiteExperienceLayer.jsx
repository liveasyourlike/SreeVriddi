import { useEffect, useRef } from 'react'

export default function WebsiteExperienceLayer() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame = 0
    let raf = 0
    const pointer = { x: 0.5, y: 0.5 }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const move = (event) => {
      pointer.x = event.clientX / window.innerWidth
      pointer.y = event.clientY / window.innerHeight
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }
    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      const count = reduced.matches ? 14 : 28
      for (let i = 0; i < count; i += 1) {
        const seed = i * 47.17
        const x = ((seed * 17 + frame * (0.08 + i % 3 * 0.02)) % (w + 120)) - 60
        const y = (Math.sin(frame * 0.004 + seed) * h * 0.08) + ((seed * 13) % h)
        const px = x + (pointer.x - 0.5) * 24
        const py = y + (pointer.y - 0.5) * 18
        const r = 1 + (i % 3) * 0.55
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = i % 4 === 0 ? 'rgba(245,158,11,.42)' : 'rgba(148,163,184,.16)'
        ctx.fill()
      }
      frame += 1
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    if (reduced.matches) draw()
    else raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
    }
  }, [])

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      document.documentElement.style.setProperty('--scroll-progress', progress)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <>
      <div className="future-progress" aria-hidden="true" />
      <div className="future-cursor-glow" aria-hidden="true" />
      <div className="future-atmosphere" aria-hidden="true" />
      <canvas ref={canvasRef} className="future-particle-canvas" aria-hidden="true" />
    </>
  )
}
