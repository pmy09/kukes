const Restaurant = require('./../model/resModel');
const Order = require('./../model/orderModel');
const Food = require('./../model/foodModel')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { login } = require('./authController');

exports.getAllOrders = catchAsync(async (req, res, next) => {
    const { restaurantId } = req.body;

    if (!mongoose.Schema.ObjectId.isValid(restaurantId))
        return next(new AppError('Invalid restaurant ID'))
    
    try
    {
        const restaurant = await Restaurant.findById(restaurantId)

        if (!restaurant) return next(new AppError('Restaurant not found'))

        const orders = await Order.find({ restaurant: restaurant })

        const ordersWithFood = await Promise.all(orders.map(async (order) => {
            const foodItems = await Food.find({ order: order._id });
            return { ...order.toObject(), food: foodItems };
        }));
        
        res.status(200).json({
            status: 'Success',
            data: {
                orders: ordersWithFood
            }
        })
    } catch (err)
    {
        res.status(500).json({
            status: 'fail',
            message: 'Error fetching orders'
        })
    }
    
})

exports.createOrder = catchAsync(async (req, res, next) => {

    const restaurantId = req.body.restaurantId
    const restaurant = await Restaurant.findOne({_id: restaurantId}) 
    if (!restaurant)
        return next(new AppError('Restaurant does not exist'))
    
    try{
    const foodId = req.body.food
    const food = await Food.findOne({ _id: foodId })
    //console.log(restaurantId);
    //console.log(foodId);

    if (!food)
        return next(new AppError('There is no food matching this id'))
    
        const newOrder = await Order.create(req.body);
    
        res.status(200).json({
            status: 'Success',
            data: {
                newOrder
            }
        })
    } catch (err)
    {
        res.status(500).json({
            status: 'fail',
            message: 'Error creating order'
        });
    }
})

exports.updateOrderToFulfilled = catchAsync(async (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    const orderId = req.body.orderId;
    console.log(restaurantId);
    console.log(orderId);

    const order = await Order.findOne({ _id: orderId, status: 'pending' })
    if (!order)
    {
        return next(new AppError('no pending order for this restaurant'))
    }


    const updateOrder = await Order.findByIdAndUpdate(
        { _id: orderId },
        { "status": 'fulfilled' } ,
        {new: true}

    );
    
    console.log(updateOrder);

    
    res.status(200).json({
        status: 'Success',
        data: {
            updateOrder
        }
    })
}) 