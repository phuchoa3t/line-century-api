const cron = require('cron');
const crawlService = require('@services/crawl');

var job = new cron.CronJob(
    '*/20 * * * * *', //run at every 10 minute
    async function () {
        console.log('Crawl running');
        await crawlService.crawl();
    },
    null,
    false,
    'Asia/Ho_Chi_Minh'
);
crawlService.crawl();
module.exports = job;
