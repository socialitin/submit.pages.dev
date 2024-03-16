export async function onRequest(context) {
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Accessing query parameters from the request URL
  const url = new URL(request.url);
  const params = url.searchParams;
  const paramValue = params.get('paramn');
//URLSearchParams.get()
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
    return new Response(params);
  }
}
}




