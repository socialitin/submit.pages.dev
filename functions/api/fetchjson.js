/**
 * POST /api/submit
 */
export async function onRequestGet(context) {
	return context.env.SERVICE.fetch(context.request);
  }
