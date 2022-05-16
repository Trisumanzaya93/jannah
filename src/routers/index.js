const express = require("express")
const mainRouter = express.Router()
const productRouter = require('./products.js')

mainRouter.use('/product', productRouter)

module.exports = mainRouter