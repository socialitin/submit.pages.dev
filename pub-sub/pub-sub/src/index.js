// import { MyDurableObject } from "./MyDurableObject.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // --- Session management endpoints ---
    if (url.pathname === '/api/session' && request.method === 'POST') {
      const { cell } = await request.json();
      if (!cell || !/^\d{6,}$/.test(cell)) {
        return new Response('Invalid cell number', { status: 400 });
      }
      // Generate a secure session ID
      const sessionId = crypto.randomUUID();
      // Store session data in KV
      await env.VENDOR_CONVERSATIONS.put(`session:${sessionId}`, JSON.stringify({ cell, created: Date.now() }));
      return Response.json({ sessionId });
    }

    if (url.pathname === '/api/session' && request.method === 'GET') {
      const sessionId = url.searchParams.get('sessionId');
      if (!sessionId) {
        return new Response('Missing sessionId', { status: 400 });
      }
      const session = await env.VENDOR_CONVERSATIONS.get(`session:${sessionId}`, { type: 'json' });
      if (!session) {
        return new Response('Session not found', { status: 404 });
      }
      return Response.json(session);
    }

    // --- Multi-get endpoint for batch KV retrieval ---
    if (url.pathname === '/api/multi-get' && request.method === 'POST') {
      const { keys } = await request.json();
      if (!Array.isArray(keys) || keys.length === 0) {
        return new Response('Missing or invalid keys', { status: 400 });
      }
      // Fetch all keys in parallel
      const results = await Promise.all(
        keys.map(async key => {
          const value = await env.VENDOR_CONVERSATIONS.get(key, { type: 'json' });
          return { key, value };
        })
      );
      return Response.json(results);
    }

    // --- All other requests go to the Durable Object ---
    let id = env.MY_DURABLE_OBJECT.idFromName(url.pathname);
    let stub = env.MY_DURABLE_OBJECT.get(id);
    let response = await stub.fetch(request);

    if (response.status < 200 || response.status > 599) {
      return new Response("Invalid status code from Durable Object", { status: 500 });
    }

    return response;
  }
};

// Export the Durable Object class
export { MyDurableObject };
