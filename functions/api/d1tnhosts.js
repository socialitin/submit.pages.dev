export async function onRequest(context) {
  try {
    const { request, env } = context;

    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method Not Allowed' }),
        {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const body = await request.json();
    const customerId = body.CustomerId;

    const ps = context.env.DB.prepare('SELECT ROWID, CompanyName,ContactName,CountryIataRegion, CustomerId,DateTime,Status,pitching from streams where CustomerId == [customerId] ');
    const data = await ps;
    
      return Response.json(data);
  } catch (error) {
    // Error handling as before
  }
}


 

 


