import crypto from 'node:crypto'

const sign = (value) => {
  const secret = process.env.CRM_AUTH_SECRET
  if (!secret) return null
  return crypto.createHmac('sha256', secret).update(value).digest('hex')
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { token = '' } = req.body || {}
  const secret = process.env.CRM_AUTH_SECRET
  if (!secret) return res.status(503).json({ error: 'CRM authentication is not configured.' })

  const parts = String(token).split('.')
  if (parts.length !== 2) return res.status(401).json({ error: 'Invalid CRM session.' })

  const [payload, signature] = parts
  const expected = sign(payload)
  if (!expected || signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return res.status(401).json({ error: 'Invalid CRM session.' })
  }

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (!session?.role || !session?.username || !session?.exp || Date.now() > Number(session.exp)) {
      return res.status(401).json({ error: 'CRM session expired.' })
    }
    if (!['admin', 'user'].includes(session.role)) return res.status(401).json({ error: 'Invalid CRM role.' })
    return res.status(200).json({ valid: true, role: session.role, username: session.username, expiresAt: session.exp })
  } catch {
    return res.status(401).json({ error: 'Invalid CRM session.' })
  }
}
