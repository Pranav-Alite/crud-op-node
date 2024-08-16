import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './api/Utils/dbConnection.js'
import express from "express"
import cors from 'cors'
import userRoute from './api/Routes/user.route.js'

connectDB

const app = express()
const PORT = process.env.PORT || 5000
// 
app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRoute)

app.listen(PORT, () => {
    console.log(`Server Running on - http://localhost:${PORT}`)
})