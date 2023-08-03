const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const resRouter = require('./routes/resRoutes');
const foodRouter = require('./routes/foodroutes');
const userRouter = require('./routes/userRoutes')



const app = express();

if (process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'))
}

app.use((req, res, next) => {
    req.requestedTime = new Date().toISOString();
    //console.log(req.headers)

    next();
})


// app.get('/', (req, res) => {
//     res.send('Hello from the server side')
// })

app.use(express.json());

app.use('/api/v1/restaurant', resRouter)
app.use('/api/v1/food', foodRouter)
app.use('/api/v1/user', userRouter)

app.use(globalErrorHandler);

module.exports = app