
          // URL of the Cloudflare Worker
          const workerUrl = 'https://grabjson.socialitin.workers.dev/';
  
          // Function to fetch and display JSON data
          async function fetchJsonData() {
              try {
                  // Fetch data from the Cloudflare Worker
                  const response = await fetch(workerUrl);
  
                  // Check if the response is OK (status 200)
                  if (!response.ok) {
                     // document.getElementById('jData').textContent = 'Failed to fetch JSON data';
                      return;
                  }
  
                  // Parse the JSON content
                  const data = await response.json();
  
                  // Display the JSON data in the <pre> element
                  //document.getElementById('jData').textContent = JSON.stringify(data, null, 2);
              } catch (error) {
                  // Handle any errors that occur during the fetch
                  ///.getElementById('jData').textContent = 'Error fetching JSON: ' + error.message;
              }
          }
  
          // Call the function to fetch and display JSON data when the page loads
          fetchJsonData();
 
  
  // const ps = context.env.DB.prepare('SELECT * from hosts');
  //  const data = await ps.first();
   //   return Response.json(data)
  
