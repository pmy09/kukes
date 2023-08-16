const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const resRouter = require('./routes/resRoutes');
const foodRouter = require('./routes/foodRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes')



const app = express();

app.use(helmet())

if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))


app.use(express.json());

//Data sanitization against NoSQL query injection
app.use(mongoSanitize())

//Data sanitization against XSS
app.use(xss())

//app.use(hpp())

app.use((req, res, next) => {
    req.requestedTime = new Date().toISOString();
    //console.log(req.headers)

    next();
})




app.use('/api/v1/restaurant', resRouter)
app.use('/api/v1/food', foodRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/orders', orderRouter)


app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `can't find ${req.originalUrl} `
    })
})

app.use(globalErrorHandler);

module.exports = app