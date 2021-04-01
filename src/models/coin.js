const mongoose = require('mongoose');

const { Schema } = mongoose;

const coinSchema = new Schema(
    {
        symbol: { type: String },
        buy: { type: Number },
        close: { type: Number },
        high: { type: Number },
        last: { type: Number },
        low: { type: Number },
        open: { type: Number },
        sell: { type: Number },
        vol: { type: Number },
        date: { type: Number },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

module.exports = mongoose.model('coin', coinSchema, 'coin');
