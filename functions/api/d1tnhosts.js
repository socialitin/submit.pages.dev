export async function onRequest(context) {
    const { request, env } = context;
  
    try {
      // Log the incoming request for debugging
      console.log(`Received ${request.method} request for ${request.url}`);
  
      // Handle only GET requests (modify if you switch to POST)
      if (request.method !== 'GET') {
        console.warn(`Method ${request.method} not allowed.`);
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
          status: 405,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Adjust as needed for security
          },
        });
      }
  
      // Extract the CustomerId from the query parameters
      const url = new URL(request.url);
      const customerId = url.searchParams.get('CustomerId'); 
  
      console.log(`Extracted CustomerId: ${customerId}`);
  
      // Validate the CustomerId parameter
      if (!customerId) {
        console.warn('Missing CustomerId parameter.');
        return new Response(JSON.stringify({ error: 'Missing CustomerId parameter' }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Adjust as needed
          },
        });
      }
  
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
  
      console.log('Executing SQL query.');
  
      // Execute the prepared statement with the CustomerId as a parameter
      const data = await ps.all([customerId]);
  
      console.log(`Query returned ${data.results.length} records.`);
  
      // Check if any records were found
      if (data.results.length === 0) {
        console.warn(`No records found for CustomerId: ${customerId}`);
        return new Response(JSON.stringify({ message: 'No records found for the provided CustomerId' }), {
          status: 404,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Adjust as needed
          },
        });
      }
  
      // Return the fetched data as JSON
      return new Response(JSON.stringify(data.results), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Adjust as needed
        },
      });
    } catch (error) {
      console.error('Error processing request:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Adjust as needed
        },
      });
    }
  }
  
//return new Response(JSON.stringify(data))
 //const ps = context.env.DB.prepare('SELECT ROWID, CompanyName,ContactName,CountryIataRegion, CustomerId,DateTime,Status,pitching from streams where CustomerId = "440" ');
 // const data = await ps.all();
    //return Response.data.json();
    