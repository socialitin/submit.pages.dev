  export async function onRequest(context) {
 //   const ps = context.env.DB.prepare('SELECT * from hosts');
 //   const data = await ps.first();
 //     return Response.json(data);
 const info = await env.DB.prepare('INSERT INTO jsondata pitch VALUES {"City": "Cali"}');
const dat = await info;
return Response.json(dat);
  }
