export async function onRequest(context) {
    try {
      const { request, env } = context;
  
      // Only allow POST requests
      if (request.method !== 'POST') {
        return new Response(
          JSON.stringify({ error: 'Method Not Allowed' }),
          {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
  
      // Parse the JSON body of the request
      const body = await request.json();
      const customerId = body.CustomerId;
  
      // Validate the presence of CustomerId
      if (!customerId) {
        return new Response(
          JSON.stringify({ error: 'CustomerId is required.' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
  
      // Prepare the SQL statement with a positional placeholder
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
        FROM 
          streams 
        WHERE 
          CustomerId = ?
      `).bind(customerId); // Bind the customerId to the placeholder
  
      // Execute the query to fetch all matching records
      const result = await ps.all();
  
      // Check if any records were found
      if (result.results.length === 0) {
        return new Response(
          JSON.stringify({ message: 'No records found for the provided CustomerId.' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
  
      // Return the fetched records as a JSON response
      return new Response(
        JSON.stringify(result.results),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
    } catch (error) {
      console.error('Error processing request:', error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }
  

 

 


