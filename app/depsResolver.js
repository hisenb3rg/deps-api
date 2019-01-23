const request = require('request-promise');
const queue = require('./queue');

const FULL_DEPS = 'fullDeps'; // redis key for hash of fully resolved deps by package key

async function fetchDepsOrRequestResolution(packageKey, client) {
  const cacheResult = await client.hgetAsync(FULL_DEPS, packageKey);
  console.log(`Redis cache for ${packageKey}: ${cacheResult}`);

  if (cacheResult) {
    // cache hit
    return JSON.parse(cacheResult);

  } else {
    // cache miss
    await queue.pushRequest(packageKey, client);
    return { status: 'in_progress' };
  }
}

async function resolveDeps(packageKey, client) {
  const npmInfoUrl = `https://registry.npmjs.org/${packageKey}`;
  let result;

  try {
    const npmInfo = await request(npmInfoUrl, {json: true});
    result = { status: 'completed', dependencies: npmInfo.dependencies };
  } catch (error) {
    console.log(`Error: ${error}`);
    result = { status: 'invalid', error };
  }

  await client.hsetAsync(FULL_DEPS, packageKey, JSON.stringify(result));

  return result;
}

module.exports = {
  fetchDepsOrRequestResolution,
  resolveDeps,
};
