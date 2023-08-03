const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../model/userModel')
const AppError = require('./../utils/appError');
const { token } = require('morgan');
const catchAsync = require('../utils/catchAsync');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
};

exports.signup = catchAsync(async (req, res, next) => {
console.log("hello", req.body)
  if (!req.body.email || !req.body.password) {
    console.log("yo")
    return "Missing fields";}
  // if (req.body.password !== req.body.passwordConfirm) return res.status(400).json({ message: "Password mismatch" })
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    role: "user"
  });
  console.log("newUser", newUser)
  newUser.password = undefined;
  const token = signToken(newUser._id)

  return newUser

  // return res.status(201).send({
  //   status: 'success',
  //   token,
  //   data: {
  //     user: newUser
  //   }
  // })

})

exports.login = catchAsync(async (req, res, next) => {

  const { email, password } = req.body


  if (!email || !password)
  {
    return next(new AppError('please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password)))
  {
    return next(new AppError('Incorrect email or password', 401))
  }


  const token = signToken(user._id);
  res.status(200).json({
    status: 'Success',
    token
  })


});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
  {
    token = req.headers.authorization.split(' ')[1]
  }


  if (!token)
  {
    return next(new AppError('You are not logged in! Please login to get access.', 401))
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  console.log(decoded)

  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
  {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  req.currentUserId = decoded.id

  next();
});

exports.restrictTo = (roles) => {
  return (req, res, next) => {
  
    if (roles == req.user.role)
    {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
