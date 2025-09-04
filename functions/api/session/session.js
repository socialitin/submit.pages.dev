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
//       const { keys } = await request.json();
//       if (!Array.isArray(keys) || keys.some(k => typeof k !== 'string')) {
//         return new Response('Invalid keys', {
//           status: 400,
//           headers: { 'Access-Control-Allow-Origin': '*' }
//         });
//       }
//       // Fetch all sessions
//       const sessions = await Promise.all(keys.map(key => env.MY_BUCKET.get(key)));
//       const results = {};
//       sessions.forEach((session, index) => {
//         if (session) {
//           results[keys[index]] = session.text();
//         }
//       });
//       return new Response(JSON.stringify(results), {
//         headers: {
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin': '*'
//         }
//       });
//     }
//   }
// };
//       if (request.method === 'POST') {
//         // Save or update a session
//         const { key, data } = await request.json();
//         if (typeof key !== 'string' || typeof data !== 'object') {
//           return new Response('Invalid key or data', {
//             status: 400,
//             headers: { 'Access-Control-Allow-Origin': '*' }
//           });
//         }
//         // Save or update the session
//         await env.MY_BUCKET.put(key, JSON.stringify(data), {
//           httpMetadata: { contentType: 'application/json' }
//         });
//         return new Response('Session saved/updated', {
//           status: 200,
//           headers: { 'Access-Control-Allow-Origin': '*' }
//         });
//       }
//     } catch (error) {
//       return new Response('Internal Error: ' + error.message, {
//         status: 500,
//         headers: { 'Access-Control-Allow-Origin': '*' }
//       });
//     }
//   }
// };
