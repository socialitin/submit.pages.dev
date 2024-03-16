export async function onRequest(context) {
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Accessing query parameters from the request URL
  const url = new URL(request.url);
  const params = url.searchParams;
  //const paramValue = params.get('paramn');
  const paramValue = URLSearchParams.get('paramn')
  // Your logic using the query parameters
  // For example:
  if (paramValue) {
    
      const obj = await context.env.filterjson.get('NYCS.json');
      if (obj === null) {
        return new Response('Not found', { status: 404 });
      };
          return new Response(obj.body);
  
    //return new Response(`Value of paramName: ${paramValue}`);
  } else {
    const obj = await context.env.filterjson.get('NYCS.json');
    if (obj === null) {
      return new Response('Not found', { status: 404 });
    };
        return new Response(obj.body);
    //return new Response(params);
  }
}
}




