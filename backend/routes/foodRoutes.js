const express = require('express');
const foodController = require('../controllers/foodController')
const resController = require('./../controllers/resController')

//const mongoose = require('mongoose');

const router = express.Router();


router
    .route('/')
    .get(foodController.getAllFoods)
    .post(foodController.createFood)

router
    .route('/:restaurantId')
    .get(foodController.getAllFoodsByRestaurant)
    .patch(foodController.updateFood)
    .delete(foodController.deleteFood)


module.exports = router;