import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = 3000

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/doorbellclicker')

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Backend funcionando' })
})

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`)
})
