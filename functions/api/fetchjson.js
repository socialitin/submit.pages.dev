//export async function onRequest(context) {
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
    
    return new Response(paramValue);
  } else {
 
    return new Response(params);
  }
}





