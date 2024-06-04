const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user.router')
const productRoutes = require('./routes/product.router')
const orderRoutes = require('./routes/order.router')

require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors("*"))
app.use(express.json())

try {
     mongoose.connect(`mongodb://0.0.0.0:27017/${process.env.DATABASE}`)

    console.log('MongoDB connected!')
} catch {
    console.log(error)
}


app.use('/', userRoutes)
app.use('/', productRoutes)
app.use('/', orderRoutes)

app.listen(PORT, () => { 
    console.log(`Listening on port: ${PORT}`) 
})