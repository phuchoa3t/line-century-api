/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const redis = require('redis');
const redisClient = redis.createClient({
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

redisClient
    .on('connect', function () {
        console.log('Redis client connected');
    })
    .on('error', function (err) {
        console.log('Redis client wrong ' + err);
    });

const setData = async (key, data, time = null) => {
    key = getKeyCache(key);
    if (time) {
        redisClient.setex(key, time, JSON.stringify(data));
        return;
    }
    redisClient.set(key, JSON.stringify(data));
};

const getData = async (key) => {
    key = getKeyCache(key);
    let data = await getCacheById(key);
    if (data != null) {
        data = JSON.parse(data);
        return data;
    }
    return null;
};

const getCacheById = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, reply) => {
            if (err) {
                console.log('err get cache ' + error.message);
                resolve(null);
            }
            resolve(reply);
        });
    });
};

const deleteCacheById = (key) => {
    key = getKeyCache(key);
    return new Promise((resolve, reject) => {
        redisClient.del(key, (err, reply) => {
            resolve(reply);
        });
    });
};

const getKeyCache = (key) => {
    return key;
};

module.exports = {
    setData,
    getData,
    deleteCacheById,
};
