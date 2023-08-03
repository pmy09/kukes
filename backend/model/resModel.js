const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const slugify = require('slugify');


const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'restaurant name required']
    },
    location: {
        type: String,
        required: [true, 'location required']
    },
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        
})

restaurantSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant