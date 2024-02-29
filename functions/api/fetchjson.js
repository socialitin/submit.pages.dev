var src_default = {
  fetch: async function(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/beverages") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM Hosts WHERE CompanyName = ?"
      ).bind("Bs Beverages").all();
      return Response.json(results);
    }
    return new Response(
      "Call /api/beverages to see everyone who works at Bs Beverages"
    );
  }
};
export default src_default;