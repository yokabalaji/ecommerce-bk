const express = require('express')
const dotenv = require('dotenv')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const purchaseRoutes = require('./routes/purchaseRoutes')
const pool = require('./config/db')

dotenv.config()
const app = express()
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/purchases', purchaseRoutes)

pool
  .connect()
  .then(client => {
    console.log('Database connected successfully')
    client.release()
  })
  .catch(err => {
    console.error('Database connection error:', err.message)
  })


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


