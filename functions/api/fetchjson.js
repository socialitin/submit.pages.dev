/**
 * POST /api/submit
 */
export async function onRequestGet(fetchjson) {
	return fetchjson.env.SERVICE.fetch(fetchjson.request);
  }
