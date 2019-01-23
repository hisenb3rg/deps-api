const express = require('express');
const depsResolver = require('./app/depsResolver');
const client = require('./config/initRedisClient');

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
