const cron = require('cron');
const ohlcService = require('@services/ohlc');

var job = new cron.CronJob(
    '*/5 * * * *', //run at every 5 minute
    async function () {
        console.log('ohlcService running');
        await ohlcService.calculate();
    },
    null,
    false,
    'Asia/Ho_Chi_Minh'
);
ohlcService.calculate();
module.exports = job;
