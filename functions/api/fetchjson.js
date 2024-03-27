export async function onRequest(context) {
  
  const obj = await context.env.filterjson.get('NYCS2.json');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  };
      //return new Response(obj.body);
const j2upd = new Response(obj.body);
      const ps = context.env.DB.prepare('SELECT * from hosts');
      const data = await ps.first();
        
        const k2upd = Response.json(data);
        return j2upd+k2upd;
};

