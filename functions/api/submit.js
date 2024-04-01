/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
    try {
      //  const db = context.env.DB;

        // Parse form data from the request
        let formData = await context.request.formData();

        // Convert form data to JSON object
        let formDataObject = {};
        for (const [name, value] of formData.entries()) {
            formDataObject[name] = value;
        }

        // Convert the JSON object to a string
        let jsonData = JSON.stringify(formDataObject);
console.log('jdata is', jsonData);
        // Insert the JSON data into the SQLite database
       // await db.run("INSERT INTO hosts (pitching) VALUES (?)", [jsonData]);
       //const stmt = context.env.DB.prepare("INSERT INTO hosts (pitching) VALUES (?),[jsonDate]");

      
        const response = await context.env.filterjson.get('NYCS3.json');
        const data = await response.json();
        if (response === null) {
          return new Response('Not found', { status: 404 });
        };

        // obj.body['440-2'] = jsonData;    
        
        // Iterate over each object in the array
        const subgroupID = "440-2"; // The ID of the subgroup you want to modify
let found = false;

// Iterate over each object in the array
for (let i = 0; i < data.length; i++) {
  const currentObj = data[i];

  // Check if the current object contains the subgroup ID
  if (currentObj.hasOwnProperty(subgroupID)) {
    // If the subgroup ID is found, replace its content with jsonData
    currentObj[subgroupID] = jsonData;
    found = true; // Set found flag to true
    break; // Exit the loop after modifying the subgroup (assuming subgroup IDs are unique)
  }
}

if (!found) {
    return new Response('Subgroup ID not found', { status: 404 });
  }
  
  // Return the modified JSON data as a response
 /// return new Response(JSON.stringify(data));
  // Now, update the JSON data in Cloudflare KV by overwriting the existing value
const putResponse = await context.env.filterjson.put('NYCS3.json', JSON.stringify(data));

if (!putResponse.ok) {
  return new Response('Failed ', { status: putResponse.status });
}
// Return a success response
return new Response('JSON data updated successfully', { status: 200 }); 

    } catch (err) {
        return new Response('Error inserting data ', { status: 500 });
    }
}



  