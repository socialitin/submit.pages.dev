export async function onRequest(context) {
  try {
    const { request, env } = context;

    // Handle CORS preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*', // Adjust as needed
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only allow GET requests for this endpoint
    if (request.method !== 'GET') {
      return new Response(
        JSON.stringify({ error: 'Method Not Allowed' }),
        {
          status: 405,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Adjust as needed
          },
        }
      );
    }

    // Extract the CustomerId from the query parameters
    const url = new URL(request.url);
    const customerId = url.searchParams.get('CustomerId');

    // Validate the CustomerId parameter
    if (!customerId) {
      return new Response(
        JSON.stringify({ error: 'Missing CustomerId parameter' }),
        {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Adjust as needed
          },
        }
      );
    }

    // Optional: Further validate the CustomerId (e.g., ensure it's numeric)
    // if (!/^\d+$/.test(customerId)) {
    //   return new Response(
    //     JSON.stringify({ error: 'Invalid CustomerId format' }),
    //     {
    //       status: 400,
    //       headers: { 
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*', // Adjust as needed
    //       },
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
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Adjust as needed
          },
        }
      );
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

    // Return a generic error message
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Adjust as needed
        },
      }
    );
  }
}

