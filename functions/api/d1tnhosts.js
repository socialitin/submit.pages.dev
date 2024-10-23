export async function onRequest(context) {

  
//return new Response(JSON.stringify(data))
 const ps = context.env.DB.prepare('SELECT ROWID, CompanyName,ContactName,CountryIataRegion, CustomerId,DateTime,Status,pitching from streams where CustomerId = "440" ');
 const data = await ps.all();
 return Response.json(data);
}