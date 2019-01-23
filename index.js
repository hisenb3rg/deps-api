const express = require('express');
const redis = require('redis');
const depsResolver = require('./app/depsResolver');
var Promise = require('bluebird');

// setup redis client
const REDIS_HOST = process.env.REDIS_HOST;
const client = redis.createClient({ host: REDIS_HOST });
Promise.promisifyAll(redis);

// setup express app
const app = express();
const PORT = process.env.PORT;

app.get('/deps', async (req, res) => {
  const { package, version } = req.query;
  const result = await depsResolver.fetchDepsOrRequestResolution(`${package}/${version}`, client);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
