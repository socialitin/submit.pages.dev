export async function onRequest(request) {
  // Accessing query parameters from the request URL
  const url = new URL(request.url);
  const params = url.searchParams;
  const paramValue = params.get('paramn');

  // Your logic using the query parameters
  // For example:
  if (paramValue) {
    // Fetch JSON data
    const response = await fetch('/api/fetchjson?paramn=' + paramValue);
    if (!response.ok) {
      return new Response('Failed to fetch JSON data', { status: 500 });
    }
    
    const obj = await response.json();
    return new Response(JSON.stringify(obj));
  } else {
    return new Response('Parameter "paramn" is missing', { status: 400 });
  }
}




