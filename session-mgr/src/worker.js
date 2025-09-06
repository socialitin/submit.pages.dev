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

    if (url.pathname === '/api/session-by-cell' && request.method === 'GET') {
      const cell = url.searchParams.get('cell');
      if (!cell) {
        return new Response('Missing cell number', {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
      }
      let session = await env.KV_BINDING.get(cell, { type: 'json' });
      let created = false;
      if (!session) {
        session = { cell, created: Date.now() };
        await env.KV_BINDING.put(cell, JSON.stringify(session));
        created = true;
      }
      return new Response(JSON.stringify({ ...session, createdNew: created }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // ...other handlers...

    return new Response('Not Found', {
      status: 404,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
};
