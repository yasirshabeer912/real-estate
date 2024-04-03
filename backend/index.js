const express = require("express")
const connectDB = require("./config/db")
const authRoutes = require('./routes/auth.routes')
const app = express()
require('dotenv').config()
app.use(express.json())
connectDB()


app.use('/api',authRoutes)


app.listen(process.env.PORT || 5000, (
    console.log('Its Running at',process.env.PORT)
))