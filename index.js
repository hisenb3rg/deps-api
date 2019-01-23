const express = require('express');
const depsResolver = require('./app/depsResolver');
const client = require('./config/initRedisClient');

// setup express app
const app = express();
const PORT = process.env.PORT;

app.get('/deps/:package/:version', async (req, res) => {
  const { package, version } = req.params;
  const result = await depsResolver.fetchDepsOrRequestResolution(`${package}/${version}`, client);
  res.setHeader('Content-Type', 'application/json');
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
