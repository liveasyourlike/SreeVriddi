import crypto from 'node:crypto'

const credentialFor = (role) => role === 'admin'
  ? { username: process.env.CRM_ADMIN_USERNAME, password: process.env.CRM_ADMIN_PASSWORD }
  : { username: process.env.CRM_USER_USERNAME, password: process.env.CRM_USER_PASSWORD }

const sign = (payload) => crypto.createHmac('sha256', process.env.CRM_AUTH_SECRET).update(payload).digest('hex')

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { role, username, password } = req.body || {}
  if (!['admin', 'user'].includes(role)) return res.status(400).json({ error: 'Invalid role' })
  if (!process.env.CRM_AUTH_SECRET) return res.status(503).json({ error: 'CRM authentication is not configured.' })
  const expected = credentialFor(role)
  if (!expected.username || !expected.password) return res.status(503).json({ error: 'CRM credentials are not configured for this role.' })
  const suppliedUser = String(username || '')
  const suppliedPass = String(password || '')
  if (!suppliedUser || !suppliedPass) return res.status(401).json({ error: 'Username and password are required.' })
  if (suppliedUser.trim().toLowerCase() === 'test' && suppliedPass === 'test') return res.status(401).json({ error: 'Demo credentials are disabled.' })
  if (suppliedUser !== String(expected.username) || suppliedPass !== String(expected.password)) return res.status(401).json({ error: 'Invalid username or password.' })
  const payload = Buffer.from(JSON.stringify({ role, username: suppliedUser, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString('base64url')
  return res.status(200).json({ token: `${payload}.${sign(payload)}`, role, username: suppliedUser })
}
