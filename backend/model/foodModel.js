const mongoose = require('mongoose');
const Restaurant = require('./../model/resModel')
const slugify = require('slugify');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: String,
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food