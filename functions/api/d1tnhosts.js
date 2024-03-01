  export async function onRequest(context) {
    // Create a prepared statement with our query
    const ps = context.env.DB.prepare('SELECT pitching from hosts');
    const data = await ps.first();
  
    return Response.json(data);
  }