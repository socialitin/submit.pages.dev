export async function onRequest(context) {
  const obj = await context.env.filterjson.get('NYC-Video.json');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  }
  const modifiedData = {
    City: 'Cali',
    
  }
  const jsonData = JSON.stringify(modifiedData)
  
    return new Response(obj.body);
   //return new Response(JSON.stringify(obj))
   //return new Response(obj.City);

};
/////
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    switch (request.method) {
      case 'PUT':
        await env.filterjson.put('NYC-SAN.json', request.body);
        //return new Response(`Put ${key} successfully!`);
      case 'GET':
        const object = await env.filterjson.get('NYC-Video.json');

        if (object === null) {
          return new Response('Object Not Found', { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);

        return new Response(object.body, {
          headers,
        });
      case 'DELETE':
        await env.MY_BUCKET.delete(key);
        return new Response('Deleted!');

      default:
        return new Response('Method Not Allowed', {
          status: 405,
          headers: {
            Allow: 'PUT, GET, DELETE',
          },
        });
    }
  },
};
