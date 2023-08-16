const mongoose  = require("mongoose");
const Food = require("./foodModel");

const orderSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'An order must belong to a restaurant']
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        defaukt: 'User'
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        required: true
    }, 
    status: {
        type: String,
        enum:['pending', 'fulfilled'],
        default: 'pending' 
    }
})

orderSchema.pre(/^find/, function (next) {
    this.populate('user').populate({
        path: 'restaurant',
        select: '_id'
    });
    next();
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order