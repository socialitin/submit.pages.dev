  export async function onRequest(context) {
    // Extract the CustomerId from the query parameters
    //const url = new URL(request.url);
    const customerId = '440';
    //url.searchParams.get('CustomerId'); 
  
  // Execute the prepared statement with the CustomerId as a parameter
  //const data = await ps.all([customerId]);

   const ps = context.env.DB.prepare('SELECT ROWID, CompanyName,ContactName,CountryIataRegion, CustomerId,DateTime,Status,pitching from streams where CustomerId = [customerId] ');
    const data = await ps.all();
    
      return Response.json(data);
 

  }

  
 //const ps = context.env.DB.prepare('SELECT ROWID, CompanyName,ContactName,CountryIataRegion, CustomerId,DateTime,Status,pitching from streams where CustomerId = "440" ');
 //const data = await ps.all();
 //return Response.json(data);
