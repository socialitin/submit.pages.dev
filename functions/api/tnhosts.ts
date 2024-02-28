// src/index.ts
var src_default = {
    async fetch(request, env) {
      const { pathname } = new URL(request.url);
      if (pathname === "/api/beverages") {
        const { results } = await env.DB.prepare(
          "SELECT * FROM Hosts WHERE CompanyName = ?"
        ).bind("Bs Beverages").all();
        var Response: {
            new (body?: BodyInit | null | undefined, init?: ResponseInit | undefined): Response;
            prototype: Response;
            error(): Response;
            redirect(url: string | URL, status?: number | undefined): Response;
        }
      }
      //return new Response(
        "Call /api/beverages to see everyone who works at Bs Beverages"
      
     // );
    
    }
  };
  export {
    src_default as default
  };