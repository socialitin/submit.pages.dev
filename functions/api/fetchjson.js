/**
 * POST /api/submit
 */
export async function onRequestGet(context) {
	return context.env.fetchjson.fetch(context.request);
  }
