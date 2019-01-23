const depsResolver = require('../app/depsResolver');
const queue = require('../app/queue');
const client = require('../config/initRedisClient');

async function waitForRequest() {
  console.log('Waiting for new request...');
  const packageKey = await queue.popRequest(client);
  console.log(`Processing new request: ${packageKey}`);

  await depsResolver.resolveDeps(packageKey, client);
  console.log(`Request processed: ${packageKey}`);
  waitForRequest();
}

waitForRequest();
