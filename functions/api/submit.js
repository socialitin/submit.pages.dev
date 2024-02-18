/**
 * POST /api/submit
 */

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
