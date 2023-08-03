const express = require('express');
const resController = require('../controllers/resController')
const authController = require('./../controllers/authController')
//const mongoose = require('mongoose');

const router = express.Router();

router
    .route('/')
    .get(authController.protect, resController.getAllRestaurants)
    .post(authController.protect, resController.createRestaurant)

router
    .route('/:id')
    .get(resController.getRestaurant)
    .patch(resController.updateRestaurant)
    .delete(
        authController.protect,
        authController.restrictTo('owner'),
        resController.deleteRestaurant)


module.exports = router;