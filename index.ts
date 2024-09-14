import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Request, Response } from 'express';

import authorController from './routes/authorRouter'
import bookController from './routes/bookRouter'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authorController)
app.use('/api/book', bookController)

app.use((err:any, req:Request, res:Response) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500 
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, 
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
