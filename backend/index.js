const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require("path");
require("express-async-errors")

const authRoutes = require('./routes/auth.router')
const userRoutes = require('./routes/user.router')
const categoryRoutes = require('./routes/category.router')
const productRoutes = require('./routes/product.router')
const orderRoutes = require('./routes/order.router')
const statsRoutes = require('./routes/stats.router')
const errorHandler = require('./middleware/error.handler')
const requestMethod = require ('./middleware/request.method')

require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors("*"))
app.use(express.static(path.join(process.cwd(),"public/images")));

try {
     mongoose.connect(process.env.MONGODB_CONNECT_URL)

    console.log('MongoDB connected!')
} catch {
    console.log(error)
}

app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', categoryRoutes)
app.use('/', productRoutes)
app.use('/', orderRoutes)
app.use('/', statsRoutes)


app.use('*', requestMethod)
app.use('*', errorHandler)




app.listen(PORT, () => { 
    console.log(`Listening on port: ${PORT}`) 
})