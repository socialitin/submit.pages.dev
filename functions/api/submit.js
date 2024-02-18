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
addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
	})
	
	async function handleRequest(request) {
	const url = new URL(request.url)
	const jsonUrl = 'https://pub-ff67a151dd104cf6b171f45a47c36526.r2.dev/NYCD.json' // Replace this with the URL of the R2 JSON file
	
	if (url.pathname === '/load-r2-json') {
	const response = await fetch(jsonUrl)
	const json = await response.json()
	
	return new Response(JSON.stringify(json), {
	headers: {
	'Content-Type': 'application/json'
	}
	})
	} else {
	return new Response('Not Found', { status: 404 })
	}
	}
export default {
	async fetch(request, env) {
	const url = new URL(request.url);
	const key = url.pathname.slice(1);
	
	if (request.method === 'GET') {
	const r2Object = await env.MY_BUCKET.get(key);
	if (r2Object) {
	const json = await r2Object.json();
	return new Response(JSON.stringify(json), {
	headers: {
	'Content-Type': 'application/json',
	},
	});
	} else {
	return new Response('File not found', { status: 404 });
	}
	} else {
	return new Response('Method not allowed', { status: 405 });
	}
	},
	};
