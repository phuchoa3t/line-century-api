const apiResponse = require('@helpers/apiResponse');
const OHLCService = require('@services/ohlc');
const index = async (req, res) => {
    let type = req.query.type || '5m';
    var ohlcData = await OHLCService.getAll({
        cond: {type: type}
    });
    return apiResponse.successResponseWithData(
        res,
        'Operation success',
        ohlcData
    );
};

module.exports = {
    index,
};
