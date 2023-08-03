const express = require('express');
const Food = require('./../model/foodModel');
const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../model/resModel');
//const Restaurant = require('../model/resModel');



exports.getAllFoodsByRestaurant = async (req, res) => {
    try{
    const restaurantId = req.params.restaurantId;

    console.log(req.params.restaurantId)
        const foods = await Food.find({ restaurantId: restaurantId});

        res.status(200).json({
            status: 'Success',
            data: {
                foods
            }
    })
    } catch (err)
    {
        res.status(400).json({
            status: 'Fail',
            message: err
        })
    }
}
exports.getAllFoods = async (req, res) => {
    try{
    

    
        const foods = await Food.find({});
        console.log(foods)

        res.status(200).json({
            status: 'Success',
            data: {
                foods
            }
    })
    } catch (err)
    {
        console.log(err)
        res.status(400).json({
            status: 'Fail',
            message: err
        })
    }
}
exports.createFood = catchAsync(async (req, res) => {
    const restaurantId = req.params.restaurantId
    const restaurant = await Restaurant.findOne({_id: restaurantId}) 
    console.log(restaurant)
    if (!restaurant)
        return res.json({
        message: 'Restaurant does not exist'
    })
    
        const newFood = await Food.create(req.body);
        res.status(200).json({
            status: 'Success',
            data: {
                newFood
            }
        })
    
})

exports.getFood = async (req, res) => {
    try
    {
        const foodId = req.params.restaurantId

        const food = await food.findOne(foodId)

        res.status(200).json({
            status: 'Success',
            data: {
                restaurant: food
            }
        })

    } catch (err)
    {
        res.status(400).json({
            status: 'Fail',
            message: 'Food not found'
        })
    }
}
exports.updateFood = async (req, res) => {
    try
    {
        const { foodId } = req.body

        const food = await Food.updateOne({ _id: foodId}, req.body, {new: true})

        res.status(200).json({
            status: 'Success',
            data: {
                food
            }
        })
    } catch (err)
    {
        res.status(200).json({
            status: 'fail',
            message: err
        })
    }
}
exports.deleteFood = async (req, res) => {
    try{
    const { foodId } = req.body
    
    const food = await Food.deleteOne({ _id: foodId }, req.body)    
    
    res.status(200).json({
        status: 'Success',
        data: null
    })
    } catch (err)
    {
        res.status(404).json({
        status: 'fail',
        message: err
        })
    }
}