const express = require('express'); 
const orderController = require('../controllers/orderController')
const resController = require('../controllers/resController')
const foodController = require('../controllers/foodController')

//const mongoose = require('mongoose');

const router = express.Router();


router
    .route('/')
    .get(orderController.getAllOrders)
    .post(orderController.createOrder)

router
    .route('/:restaurantId')
    .patch(orderController.updateOrderToFulfilled)
    //.delete(orderController.deleteOrder)


module.exports = router;