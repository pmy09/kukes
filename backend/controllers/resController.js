const express = require('express');
const Restaurant = require('./../model/resModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError')
const Food = require('./../model/foodModel')
const User = require('./../model/userModel')

exports.getAllRestaurants = catchAsync(async (req, res) => {
   
    let restaurants = await Restaurant.find({}).populate("userId")
    console.log(restaurants)
      restaurants = restaurants.map(restaurant => ({
        ...restaurant.toObject(),
        createdBy: restaurant.userId.name,
          userId: undefined,
        __v: undefined
      }));

        res.status(200).json({
            status: 'success',
            results: restaurants.length,
            data: {
                restaurants
            }
        })
    })
    
exports.createRestaurant = catchAsync(async (req, res, next) => {
    const userId = req.currentUserId
    const user = await User.findOne({ _id: userId })
    
    if (!user) return res.json({
        message: 'User does not exist'
    })

    if (user && user.role === 'owner')
    {
    
        const newRestaurant = await Restaurant.create({ userId: req.currentUserId, ...req.body })
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: newRestaurant
            }
        })
    } else
    {
        return res.json({
            message: 'You do not have access to perform this action'
        })
    }
})
exports.getRestaurant = catchAsync(async (req, res) => {


        const restaurant = await Restaurant.findById(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: {
                restaurant
            }
        })

})
    
exports.updateRestaurant = catchAsync(async (req, res) => {

        //const { restaurantId } = req.body

        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(200).json({
            status: 'Success',
            data: {
                restaurant
            }
        })
    
})
exports.deleteRestaurant = catchAsync(async (req, res) => {
    
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'success',
        })
    
})
// exports.getFood = async (req, res) => {
//     try
//     {
//         const food = await Restaurant.findByIdAndUpdate(req.params.id, {
//             $push: { restaurant: food}
//         })

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 restaurant: food
//             }
//         })
//     } catch (err)
//     {
//         res.status(404).json({
//             status: 'fail',
//             message: err
//         })
//     }
//}

// const { acknowledged } = await HotelModel.updateOne(
//     { country },
//     {
//       $push: { hotels: hotel }
//     }
//   )

