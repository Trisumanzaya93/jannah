const express = require('express')
const productRouter = express.Router()
const productController = require('./../controllers/products')
const upload = require("../middlewares/upload") 
// const {checkToken} = require('../middlewares/auth')
// const {checkRoleAdmin} = require('../middlewares/authorize')
// const {fileUpload} = require('../middlewares/upload')

productRouter

        .get('/:productId',  productController.getProductById)
    .post('/createproduct',upload,productController.createProduct)
    .patch('/:productId',upload,productController.updateProduct)
    // .get("/getproductbyseler",checkToken,checkRoleAdmin,productController.getProductBySeller)
    // .get('/:productId', productController.getProductById)
    .get('/',  productController.getAllProduct)
    .delete('/:productId',productController.deleteProductById)



module.exports = productRouter