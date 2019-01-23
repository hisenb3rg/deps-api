const redis = require('redis');

const FULL_DEPS = 'fullDeps'; // redis key for hash of fully resolved deps by package key
const REQUESTS = 'requests';  // redis key for list of active resolution requests

async function fetchDepsOrRequestResolution(packageKey, client) {
  const reply = await client.hexistsAsync(FULL_DEPS, packageKey);
  console.log(`Redis cache hit for ${packageKey}: ${reply}`);

  if (reply) {
    // cache hit
    return 'hit';
  } else {
    // cache miss
    await client.lpushAsync(REQUESTS, packageKey);
    return 'miss';
  }
}

module.exports = {
  fetchDepsOrRequestResolution,
};
