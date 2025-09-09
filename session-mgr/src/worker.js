export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // POST /api/session-by-cell?cell=cellValue
if (url.pathname === '/api/session-by-cell' && request.method === 'POST') {
  const cell = url.searchParams.get('cell');
  if (!cell) {
    return new Response('Missing cell number', {
      status: 400,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
  const { reqId, payload } = await request.json();
  if (!reqId || !Array.isArray(payload)) {
    return new Response('Missing reqId or payload must be an array', {
      status: 400,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }

  // Fetch or create the session object
  let session = await env.KV_BINDING.get(cell, { type: 'json' });
  if (!session || typeof session !== 'object') session = {};

  // Set or overwrite the reqId entry with its payload
  session[reqId] = { payload };

  await env.KV_BINDING.put(cell, JSON.stringify(session));
  return new Response(JSON.stringify(session), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });
}

///  if (payload.length === 1 && Object.keys(payload[0]).length === 0 && payload[0].constructor === Object) {
 ///       return new Response('Payload array must contain at least 1 item.', {



    // ...existing GET handler...

    return new Response('Not Found', {
      status: 404,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
};