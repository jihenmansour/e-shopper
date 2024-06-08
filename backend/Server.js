const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require("express-async-errors")

const authRoutes = require('./routes/auth.router')
const userRoutes = require('./routes/user.router')
const productRoutes = require('./routes/product.router')
const orderRoutes = require('./routes/order.router')
const errorHandler = require('./middleware/error.handler')
const requestMethod = require ('./middleware/request.method')

require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors("*"))
app.use(express.json())
app.use(express.static('public'));

try {
     mongoose.connect(`mongodb://0.0.0.0:27017/${process.env.DATABASE}`)

    console.log('MongoDB connected!')
} catch {
    console.log(error)
}

app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', productRoutes)
app.use('/', orderRoutes)


app.use('*', requestMethod)
app.use('*', errorHandler)




app.listen(PORT, () => { 
    console.log(`Listening on port: ${PORT}`) 
})