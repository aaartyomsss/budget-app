const Redis = require('redis');
const redisClient = Redis.createClient({ host: 'redis', port: 6379 });

const DEFAULT_EXPIRATION = 600;

const getOrSetCache = (key, cb) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error);
      if (data !== null) return resolve(JSON.parse(data));
      const newData = await cb();
      redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(newData));
      resolve(newData);
    });
  });
};

// TODO update cache util
const addToCachedExpenses = (key, expenses) => {
  return new Promise((resolve, reject) => {
    redisClient.get();
  });
};

module.exports = getOrSetCache;
