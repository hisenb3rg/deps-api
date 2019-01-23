// initializes redis client
var Promise = require('bluebird');
const redis = require('redis');
Promise.promisifyAll(redis);

const REDIS_HOST = process.env.REDIS_HOST;
const client = redis.createClient({ host: REDIS_HOST });

module.exports = client;
