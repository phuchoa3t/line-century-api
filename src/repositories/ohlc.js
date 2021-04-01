const OHLCModel = require('@models/ohlc');
const getAll = async (option = {}) => {
    let cond  = option.cond || {};
    return await OHLCModel.find(cond).lean().exec();
};

module.exports = {
    getAll
};