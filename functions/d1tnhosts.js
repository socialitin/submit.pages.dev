const src_default = {
    fetch: async function(request, env) {
      const { pathname } = new URL(request.url);
      //if (pathname === "/api/beverages") {
        const { results } = await env.DB.prepare(
          "SELECT * FROM Hosts WHERE CompanyName = ?"
        ).bind("Bs Beverages").all();
        console.log('got',Response.json(results));
        return Response.json(results);
      //}
    }
  };
  export default src_default;
  //# sourceMappingURL=index.js.map