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
      if (!Array.isArray(payload)) {
        return new Response('Payload must be an array', {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
      }
      if (payload.length < 1) {
        return new Response('Payload array must contain at least 1 item.', {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        });
      }

      let session = await env.KV_BINDING.get(cell, { type: 'json' });
      if (session && Array.isArray(session.payload)) {
        // Append new payload items to existing payload array
        session.payload.push(...payload);
        session.reqId = reqId; // Replace or add reqId property
        // Remove 'cell' property if present
        if ('cell' in session) delete session.cell;
      } else {
        // Create new session with reqId instead of cell
        session = { reqId, payload };
      }
      await env.KV_BINDING.put(cell, JSON.stringify(session));
      // Return the updated session as JSON
      return new Response(JSON.stringify(session), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
    }

    // ...existing GET handler...

    return new Response('Not Found', {
      status: 404,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
};