/* eslint-disable no-undef */
const axios = require('axios');
const CoinModel = require('@models/coin');
const OHLCModel = require('@models/ohlc');
const RedisService = require('@services/redis');
const CoinConstant = require('@constants/coin');
// console.log(CoinModel)
const crawl = async () => {
    let url = process.env.CRAWL_URL;
    let coinsData = await getCoinData(url);

    let BITX_ETH = await getSymbolData(coinsData, 'BITX_ETH');
    let coinData = prepareCoinData(BITX_ETH);

    await CoinModel.create(coinData);

    await updateOHLC(coinData);
    await updatePrice(coinData);
};

const updatePrice = async (coinData) => {
    var price = await RedisService.getData(CoinConstant.PRICE_BITX_ETH);
    if (price != coinData.close) {
        price = coinData.close;
        try {
            console.log('update bitx_eth: ', price);
            await axios.post(process.env.SOCKET_API_URL, {
                price: price,
            });
        } catch(e) {console.log(e);}
    }
    await RedisService.setData(CoinConstant.PRICE_BITX_ETH, price);
};

const updateOHLC = async (coinData) => {
    let ohlc = await RedisService.getData(CoinConstant.OHLC_KEY);

    if (!ohlc) {
        ohlc = {};
        ohlc.open = coinData.open;
        ohlc.high = coinData.high;
        ohlc.low = coinData.low;
        ohlc.close = coinData.close;
        ohlc.date5m = coinData.date;
        ohlc.date30m = coinData.date;
        ohlc.date1h = coinData.date;
    } else {
        ohlc.high = ohlc.high < coinData.high ? coinData.high : ohlc.high;
        ohlc.low = ohlc.low > coinData.low ? coinData.low : ohlc.low;
    }
    type = [];
    if (coinData.date - ohlc.date5m >= 5 * 60) {
        type.push('5m');
        ohlc.date5m = coinData.date;
    }
    if (coinData.date - ohlc.date30m >= 30 * 60) {
        type.push('30m');
        ohlc.date30m = coinData.date;
    }
    if (coinData.date - ohlc.date1h >= 60 * 60) {
        type.push('1h');
        ohlc.date1h = coinData.date;
    }
    if (type.length) {
        OHLCModel.create({
            symbol: coinData.symbol,
            close: coinData.close,
            high: ohlc.high,
            low: ohlc.low,
            open: ohlc.open,
            date: coinData.date,
            volume: coinData.vol,
            type: type
        });
        ohlc.open = coinData.open;
    }
    await RedisService.setData(CoinConstant.OHLC_KEY, ohlc);
};

const prepareCoinData = (data) => {
    return data;
};

const getSymbolData = async (coinData, symbol) => {
    let symbolData = coinData.ticker.filter((data) => data.symbol === symbol);
    return symbolData.length
        ? {
            ...symbolData[0],
            date: coinData.date,
        }
        : null;
};

const getCoinData = async (url) => {
    let response = await axios.get(url, { timeout: 10000 });
    return response ? response.data : null;
};

module.exports = {
    crawl,
};
