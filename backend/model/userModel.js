const crypto = require('crypto')
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email']
    },
    image: String,
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    role: {
        type: String,
        enum: ['user', 'owner'],
        required: true
    },
    password: {
        type: String,
        requred: true,
        minlength: 8,
        select: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date
    
});

userSchema.pre('save', async function(next) {
    
    this.password = await bcrypt.hash(this.password, 12);
        
    next();
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
    
    console.log({resetToken}, this.passwordResetToken)
    
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000
    
    return resetToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;