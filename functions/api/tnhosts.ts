var src_default = {
    async fetch(request, env) {
      const { pathname } = new URL(request.url);
      if (pathname === "/api/beverages") {
        const { results } = await env.DB.prepare(
          "SELECT * FROM Hosts WHERE CompanyName = ?"
        ).bind("Bs Beverages").all();
        return Response.json(results);
      }
      //return new Response(
        "Call /api/beverages to see everyone who works at Bs Beverages"
      //);
    }
  };
  export {
    src_default as default
  };