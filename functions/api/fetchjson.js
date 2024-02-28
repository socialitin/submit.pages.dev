export default {
  async fetch(request, env, ctx) {
  const res = await env.DB.prepare("SELECT * FROM jcontent;").all();
  return new Response;
  //(JSON.stringify(res, null, 2));
  },
  };