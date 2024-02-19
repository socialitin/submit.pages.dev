/**
 * POST /api/submit
 */
//export async function onRequestGet(context) {
//	return context.env.SERVICE.fetch(context.request);
  //}

export async function onRequestGet({ request }) {
	try {
        async function handleRequest(request) {
            // Make a request to the R2 JSON file
            const response = await fetch('https://pub-ff67a151dd104cf6b171f45a47c36526.r2.dev/NYCD.json')
          
            // Check if the request was successful
            if (!response.ok) {
              return new Response('Failed to fetch R2 JSON file', { status: 500 })
            }
          
            // Parse the JSON response
            const data = await response.json()
          
            // Do something with the JSON data
            // For example, you can return it as a response
            return new Response(JSON.stringify(data), {
              headers: { 'Content-Type': 'application/json' }
            })
          }		
	} 
};

