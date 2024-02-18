/**
 * POST /api/submit
 */

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
