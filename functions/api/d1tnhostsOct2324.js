export async function onRequest(context) {
    try {
      const { request, env } = context;
  
      // Extract the CustomerId from the query parameters
      const url = new URL(request.url);
      const customerId = url.searchParams.get('CustomerId');
  
      // Validate the CustomerId parameter
      if (!customerId) {
        return new Response(
          JSON.stringify({ error: 'Missing CustomerId parameter' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
  
      // Optional: Further validate the CustomerId (e.g., ensure it's numeric)
      // if (!/^\d+$/.test(customerId)) {
      //   return new Response(
      //     JSON.stringify({ error: 'Invalid CustomerId format' }),
      //     {
      //       status: 400,
      //       headers: { 'Content-Type': 'application/json' },
      //     }
      //   );
      // }
  
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
  
      // Check if any records were found
      if (data.results.length === 0) {
        return new Response(
          JSON.stringify({ message: 'No records found for the provided CustomerId' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
  
      // Return the fetched data as JSON
      return new Response(JSON.stringify(data.results), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error processing request:', error);
  
      // Return a generic error message
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }
  