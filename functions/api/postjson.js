/**
 * POST /api/submit
 */

export async function onRequestPost({ request }) {
	try {
		let input = await request.formData();

		// Convert FormData to JSON
		// NOTE: Allows mutliple values per key
		let tmp, output = {};
		for (let [key, value] of input) {
			tmp = output[key];
			if (tmp === undefined) {
				output[key] = value;
			} else {
				output[key] = [].concat(tmp, value);
			}
		}


let pretty = JSON.stringify(output, null, 2);
		return new Response(pretty, {
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		});
					
	} catch (err) {
		return new Response('Error parsing JSON content', { status: 400 });
	}
}
export async function onRequestGet(context) {
	return context.env.SERVICE.fetch(context.request);
  }
////// post modified json
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    // Modify the JSON data as needed
    const modifiedData = {
      key1: 'value1',
      key2: 'value2'
    }
  
    // Convert the modified data to a JSON string
    const jsonData = JSON.stringify(modifiedData)
  
    // Make an HTTP request to the r2 API endpoint with the modified JSON data
    export async function onRequest(context) {
        const obj = await context.env.filterjson.get('NYC-Video.json')
        
    const response = await fetch('https://api.example.com/r2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
  
    // Return the response from the r2 API endpoint
    return response
  }
  