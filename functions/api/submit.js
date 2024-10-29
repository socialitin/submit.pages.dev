// /api/submit.js

export async function onRequest(request, env) {
    const ALLOWED_ORIGIN = 'https://www.ads.tournet.com'; // Replace with your frontend's origin
  
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400', // 1 day
        },
      });
    }
  
    // Ensure the request method is POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Content-Type': 'application/json',
        },
      });
    }
  
    try {
      // Parse the JSON body
      const data = await request.json();
  
      // Validate incoming data (example validation)
      if (!data || typeof data !== 'object') {
        return new Response(JSON.stringify({ error: 'Invalid JSON data' }), {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            'Content-Type': 'application/json',
          },
        });
      }
  
      // Prepare jsonData (modify as per your requirements)
      const jsonData = JSON.stringify(data);
  
      // Execute the SQL statement
      const stmt = env.DB.prepare("UPDATE hosts SET pitching = ? WHERE CompanyName LIKE '%Pereirawas%'");
      const dbResponse = await stmt.bind(jsonData).run();
  
      // Check if the update was successful
      if (dbResponse.success) {
        return new Response(JSON.stringify({ message: 'Database updated successfully' }), {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            'Content-Type': 'application/json',
          },
        });
      } else {
        return new Response(JSON.stringify({ error: 'Database update failed' }), {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Error in /api/submit:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Content-Type': 'application/json',
        },
      });
    }
  }
  