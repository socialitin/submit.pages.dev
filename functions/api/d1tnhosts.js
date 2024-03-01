  export async function onRequest(context) {
    const ps = context.env.DB.prepare('SELECT * from jsondata');
    const data = await ps.first();
      return Response.json(ps);
  }
