import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { verifyRoute } from './middleware/verifyRoute.js'
import { router as userRoute } from './routes/userRoute.js'
import { router as expenseRoute } from './routes/expenseRoute.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())

//routes

app.get('/', () => {
    console.log("Welcome to expense tracker")
})

app.use('/api/users', userRoute)
app.use('/api/expenses', verifyRoute, expenseRoute)

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("DB ERROR: ", error)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
