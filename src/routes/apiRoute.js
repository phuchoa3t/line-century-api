const express = require('express');
const ohlcRouter = require('@routes/ohlc');

const app = express();

app.use('/v1/ohlc', ohlcRouter);
module.exports = app;
