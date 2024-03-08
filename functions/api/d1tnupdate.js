const stmt = context.env.DB
    .prepare("UPDATE hosts SET CompanyName = 'Pereira');
   // const data = await stmt;
     //     return Response.json(data);

   // export async function onRequest(context) {
    //    const ps = context.env.DB.prepare('SELECT * from hosts');
    //    const data = await ps.first();
    //      return Response.json(data);}