export default {
    async fetch(request, env, ctx) {
         // Get the HTTP method from the request
         const method = 'PUT';
         //request.method.toUpperCase();
  console.log('method',method);
      //const url = 'https://pub-ff67a151dd104cf6b171f45a47c36526.r2.dev/NYCS3.json';
      const urlParam = 'https://pub-ff67a151dd104cf6b171f45a47c36526.r2.dev/NYCS2.json';
      //new URL(request.url).searchParams.get('url');
      console.log('URL',urlParam);
         // If the URL parameter is not provided or is empty, return an error response
         if (!urlParam) {
          return new Response('URL parameter is missing', { status: 400 });
        }
  
      // Function to gather response from the fetch request
      async function gatherResponse(response) {
        const { headers } = response;
        const contentType = headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return JSON.stringify(await response.json());
        }
        console.log('response1',response.text());
        return response.text();
      
      }
  
      const init = {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      };
  
      try {
  // Fetch the data from the provided URL
  let response;
  //if (method === 'GET') {
   // response = await fetch(urlParam, init);
   // console.log('results',response);
  //} else 
  if (method === 'PUT') {
    // Handle PUT request differently
    const body = {
      "userId": "12345",
      "updateFields": {
        "email": "user@example.com",
        "name": "John Doe"
      }
    }
    
    //await request.text();
    response = await fetch(urlParam, { ...init, method: 'PUT',body});
    console.log('body',body);
  } else {
    // Handle other methods (POST, DELETE, etc.) if needed
    return new Response('Method not allowed', { status: 405 });
  }
  console.log('results',response);
  // Modify the response headers to include CORS headers
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specified methods
  headers.set('Access-Control-Allow-Headers', 'Content-Type'); // Allow specified headers
  
  // Gather the response body
  //const results = await gatherResponse(response);
  //console.log('results',results);
  // Create a new response with updated headers
  return new Response('', {
    status: response.status,
    statusText: response.statusText,
    headers: headers,
        });
      } catch (error) {
        console.error('Error:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
    },
  };
  