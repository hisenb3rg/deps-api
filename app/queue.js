const QUEUE = 'requests';  // redis key for list of active requests

async function pushRequest(request, client) {
  return client.lpushAsync(QUEUE, request);
}

// waits until new requests come in
async function popRequest(client) {
  const [_, request] = await client.brpopAsync([QUEUE, 0]);
  return request;
};

module.exports = {
  pushRequest,
  popRequest,
};
