const jwt = require('jsonwebtoken')

function authMiddleware (req, res, next) {
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.status(401).json({ error: 'No token provided' })

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1] // extract actual token
    : authHeader

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' })
    req.user = decoded
    next()
  })
}

module.exports = authMiddleware
