const express = require('express');
const Food = require('./../model/foodModel');
const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../model/resModel');
const AppError = require('../utils/appError');
const Order = require('./../model/orderModel')
//const Restaurant = require('../model/resModel');



exports.getAllFoodsByRestaurant = catchAsync(async (req, res, next) => {
    
    const restaurantId = req.params.restaurantId;
    //console.log(req.params.restaurantId)
        const foods = await Food.find({ restaurantId: restaurantId});

        res.status(200).json({
            status: 'Success',
            data: {
                foods
            }
    })
   
})
exports.getAllFoods =catchAsync (async (req, res, next) => {
    
    
        const foods = await Food.find({});

        res.status(200).json({
            status: 'Success',
            data: {
                foods
            }
    })
    
})

exports.createFood = catchAsync(async (req, res, next) => {
    const restaurantId = req.body.restaurantId;
    //console.log(req.restaurantId)
    try
    {
        const restaurant = await Restaurant.findOne({ _id: restaurantId });
    console.log(restaurant);
  
    if (!restaurant) {
      return next(new AppError('Restaurant does not exist'));
        }
   
  
    const newFood = await Food.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        newFood
      },
    });
    } catch (err)
    {
       return next(new AppError('Error creating food'))
    }
  });
  

exports.getFood =catchAsync( async (req, res, next) => {
   
        const foodId = req.params.restaurantId

        const food = await food.findOne(foodId)

        res.status(200).json({
            status: 'Success',
            data: {
                
                restaurant: food
            }
        })

    } )

exports.updateFood = catchAsync(async (req, res, next) => {
    
        const { foodId } = req.body

        const food = await Food.updateOne({ _id: foodId}, req.body, {new: true})

        res.status(200).json({
            status: 'Success',
            data: {
                food
            }
        })
   
})
exports.deleteFood = catchAsync(async (req, res, next) => {

    const { foodId } = req.body
    
    const food = await Food.deleteOne({ _id: foodId }, req.body)    
    
    res.status(200).json({
        status: 'Success',
        data: null
    })
    
})