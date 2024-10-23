export async function onRequest(context) {
  // Extract the CustomerId from the query parameters
  const url = new URL(request.url);
  const customerId = url.searchParams.get('CustomerId'); 
 // Prepare the SQL statement with a parameter placeholder
 const ps = env.DB.prepare(`
  SELECT 
    ROWID, 
    CompanyName,
    ContactName,
    CountryIataRegion, 
    CustomerId,
    DateTime,
    Status,
    pitching 
  FROM streams 
  WHERE CustomerId = ?
`);

// Execute the prepared statement with the CustomerId as a parameter
const data = await ps.all([customerId]);
return new Response(JSON.stringify(data))
 //const ps = context.env.DB.prepare('SELECT ROWID, CompanyName,ContactName,CountryIataRegion, CustomerId,DateTime,Status,pitching from streams where CustomerId = "440" ');
 // const data = await ps.all();
  
   // return Response.json(data);


}