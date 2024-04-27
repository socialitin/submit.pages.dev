addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    // URL of the Target Worker
    const targetWorkerUrl = 'https://imageupl.socialitin.workers.dev';
  
    try {
      // Making a fetch request to the Target Worker
      const responseFromTarget = await fetch(targetWorkerUrl, {
        method: 'GET', // Change this to 'POST' if required, and add body if needed
        headers: {
          // Add headers if necessary for your request
          'Content-Type': 'application/json'
        }
        // If it's a POST request, add a body:
        // body: JSON.stringify({ key: 'value' })
      });
  
      // Waiting for the response from the Target Worker
      const data = await responseFromTarget.json();
  
      // Returning the response from the Target Worker to the client
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      // Handling any errors in the fetch request
      return new Response('Error contacting the target Worker: ' + error.message, { status: 500 });
    }
  }
  