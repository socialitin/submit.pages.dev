export default {
  async fetch(request, env) {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('file'); // e.g., "431.json"

    if (!fileName || !/^[\w\-]+\.json$/.test(fileName)) {
      return new Response('Invalid or missing file name.', {
        status: 400,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }

    if (request.method === 'GET') {
      // Fetch from R2
      const object = await env.jsontournet.get(fileName);
      if (!object) {
        return new Response('File not found', {
          status: 404,
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
      }
      const jsonData = await object.text();
      return new Response(jsonData, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    if (request.method === 'PUT') {
      // Upload/replace in R2
      const body = await request.text();
      await env.jsontournet.put(fileName, body, {
        httpMetadata: { contentType: 'application/json' }
      });
      return new Response('File uploaded/replaced', {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }

    return new Response('Method Not Allowed', {
      status: 405,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  },
};
