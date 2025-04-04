import dotenv from 'dotenv'
dotenv.config()

const verifyApiKey = (req, res, next) => {
  const key = req.headers['x-api-key']
  if (!key || key !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Invalid or missing API key' })
  }
  next()
}

// ✅ FIX: Use export default
export default verifyApiKey
