const Redis = require('redis');
const redisClient = Redis.createClient({ host: 'redis', port: 6379 });
module.exports = redisClient;
