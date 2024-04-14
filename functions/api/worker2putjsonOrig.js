export default {
    async fetch(request, env, ctx) {
      const url = 'https://pub-ff67a151dd104cf6b171f45a47c36526.r2.dev/NYCS2.json';
  
      // Function to gather response from the fetch request
      async function gatherResponse(response) {
        const { headers } = response;
        const contentType = headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return JSON.stringify(await response.json());
        }
        return response.text();
      
      }
  
      const init = {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      };
  
      try {
        // Fetch the data from another source
        const response = await fetch(url, init);
  
        // Modify the response headers to include CORS headers
        const headers = new Headers(response.headers);
        headers.set('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
        headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specified methods
        headers.set('Access-Control-Allow-Headers', 'Content-Type'); // Allow specified headers
  
        // Gather the response body
        const results = await gatherResponse(response);
  
        // Create a new response with updated headers
        return new Response(results, {
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
  