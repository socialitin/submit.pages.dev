// /api/submit.js

export async function onRequest(request, env) {
    const ALLOWED_ORIGIN = 'https://www.ads.tournet.com'; // Replace with your frontend's origin
  
    // Handle CORS preflight requests
  
    try {
      // Parse the JSON body
      const data = await request.json();
  
      // Validate incoming data (example validation)
  
  
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
      return new Response(JSON.stringify(jsonData), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Content-Type': 'application/json',
        },
      });
    }
  }
  