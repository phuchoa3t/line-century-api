const mongoose = require('mongoose');

const { Schema } = mongoose;

const coinSchema = new Schema(
    {
        symbol: { type: String },
        close: { type: Number},
        high: { type: Number},
        low: { type: Number},
        open: { type: Number},
        volume: { type: Number},
        date: {type: Number},
        type: {type: Array}
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

module.exports = mongoose.model('ohlc', coinSchema, 'ohlc');
