// /api/submit.js

export async function onRequest(request, env) {
    const ALLOWED_ORIGIN = 'https://www.ads.tournet.com'; // Replace with your frontend's origin
  
    // Handle CORS preflight requests
  

      // Parse the JSON body
      const data = await request.json();
  
      // Validate incoming data (example validation)
  
  
      // Prepare jsonData (modify as per your requirements)
      const jsonData = JSON.stringify(data);
  
      // Execute the SQL statement
     // const stmt = env.DB.prepare("UPDATE hosts SET pitching = ? WHERE CompanyName LIKE '%Pereirawas%'");
     // const dbResponse = await stmt.bind(jsonData).run();
  
      // Check if the update was successful
return new Response(jsonData);

};
