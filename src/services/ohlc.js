const OHLCRepo = require('@repositories/ohlc');

const getAll = async (option = {}) => {
    return await OHLCRepo.getAll(option);
};

module.exports = {
    getAll
};
