export default {
  async fetch(request, env) {
    try {
      const { searchParams } = new URL(request.url);
      const fileName = searchParams.get('file');

      if (!fileName || !/^[\w\-]+\.json$/.test(fileName)) {
        return new Response('Invalid or missing file name.', {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
      }

      if (!env.MY_BUCKET) {
        return new Response('R2 binding missing', {
          status: 500,
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
      }

      if (request.method === 'GET') {
        const object = await env.MY_BUCKET.get(fileName);
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
        const body = await request.text();
        await env.MY_BUCKET.put(fileName, body, {
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
    } catch (error) {
      return new Response('Internal Error: ' + error.message, {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }
  },
};

