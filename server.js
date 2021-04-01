/* eslint-disable no-undef */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const apiRouter = require('@routes/apiRoute');
const apiResponse = require('@helpers/apiResponse');
const ErrorMiddleware = require('@middleware/errorMiddleware');

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

// DB connection
const { MONGODB_URL } = process.env;
const { MONGODB_USERNAME } = process.env;
const { MONGODB_PASSWORD } = process.env;

const mongoose = require('mongoose');

const mongooseOptions = {
    user: MONGODB_USERNAME,
    pass: MONGODB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(MONGODB_URL, mongooseOptions)
    .then(() => {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Connected to %s', MONGODB_URL);
            console.log('Web App is running ... \n');
            console.log('Press CTRL + C to stop the process. \n');
        }
    })
    .catch((err) => {
        console.error('App starting DB error:', err.message);
        process.exit(1);
    });
// const db = mongoose.connection;


// app.use(function(req, res, next){
//   console.log('req :', req.headers.access_token);
//   next();
// })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use('/api/', apiRouter);
// if error is not an instanceOf APIError, convert it.
app.use(ErrorMiddleware.converter);

// catch 404 and forward to error handler
app.use(ErrorMiddleware.notFound);

// error handler
app.use(ErrorMiddleware.handler);

// throw 404 if URL not found
app.all('*', (req, res) => apiResponse.notFoundResponse(res, 'Page not found'));

app.use((err, req, res) => {
    if (err.name === 'UnauthorizedError') {
        return apiResponse.unauthorizedResponse(res, err.message);
    }
});

module.exports = app;
