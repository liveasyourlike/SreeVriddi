import crypto from 'node:crypto'

const sign = (payload) => crypto.createHmac('sha256', process.env.CRM_AUTH_SECRET).update(payload).digest('hex')
const safeEqual = (a, b) => {
  const aa = Buffer.from(a || '')
  const bb = Buffer.from(b || '')
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb)
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!process.env.CRM_AUTH_SECRET) return res.status(503).json({ error: 'CRM authentication is not configured.' })
  const { token } = req.body || {}
  if (!token || !token.includes('.')) return res.status(401).json({ error: 'Authentication required.' })
  const [payload, signature] = token.split('.')
  if (!safeEqual(signature, sign(payload))) return res.status(401).json({ error: 'Invalid session.' })
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (!data.exp || Date.now() > data.exp || !['admin', 'user'].includes(data.role)) return res.status(401).json({ error: 'Session expired.' })
    return res.status(200).json({ role: data.role, username: data.username, expiresAt: data.exp })
  } catch {
    return res.status(401).json({ error: 'Invalid session.' })
  }
}
