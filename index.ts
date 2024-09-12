import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authorController from "./routes/authorRouter"
import bookController from "./routes/bookRouter"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth" , authorController)
app.use("/api/book" , bookController)

// app.use((err, req, res, next) => {
//     res.status(500).json({ error: err.message })
//   })

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})




