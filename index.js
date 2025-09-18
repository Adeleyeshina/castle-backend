import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'


import db from './connectDB/db.js'
import agentRoute from './routes/agentRoutes.js'
import notFound from './middleware/notFound.js'
import authRoute from './routes/authRoute.js'
import errorHandler from './middleware/error.js'
import './keepAlive.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.get("/", (req, res) => {
    res.status(200).json("Welcome")
})
app.use("/api/auth", authRoute)
app.use("/api", agentRoute)

app.use(notFound)
app.use(errorHandler)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    db()
})