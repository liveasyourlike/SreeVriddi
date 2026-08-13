import crypto from 'node:crypto'

const getCredentials = (role) => ({
  username: role === 'admin' ? process.env.CRM_ADMIN_USERNAME : process.env.CRM_USER_USERNAME,
  password: role === 'admin' ? process.env.CRM_ADMIN_PASSWORD : process.env.CRM_USER_PASSWORD,
})

const sign = (value) => {
  const secret = process.env.CRM_AUTH_SECRET
  if (!secret) return null
  return crypto.createHmac('sha256', secret).update(value).digest('hex')
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { role = 'user', username = '', password = '' } = req.body || {}
  if (!['admin', 'user'].includes(role)) return res.status(400).json({ error: 'Invalid role' })

  const credentials = getCredentials(role)
  if (!credentials.username || !credentials.password || !process.env.CRM_AUTH_SECRET) {
    return res.status(503).json({ error: 'CRM credentials are not configured yet.' })
  }

  // Never allow obvious demo credentials, even if someone accidentally puts them in Vercel.
  if (String(username).trim().toLowerCase() === 'test' && String(password) === 'test') {
    return res.status(401).json({ error: 'Demo credentials are disabled. Use the credentials configured by the CRM owner.' })
  }

  if (username !== credentials.username || password !== credentials.password) {
    return res.status(401).json({ error: 'Invalid username or password.' })
  }

  const payload = Buffer.from(JSON.stringify({
    role,
    username,
    exp: Date.now() + 8 * 60 * 60 * 1000,
  })).toString('base64url')
  const signature = sign(payload)
  if (!signature) return res.status(503).json({ error: 'CRM authentication is not configured.' })

  const token = `${payload}.${signature}`
  return res.status(200).json({ token, role, username, expiresIn: 8 * 60 * 60 * 1000 })
}
