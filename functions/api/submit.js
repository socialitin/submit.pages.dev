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

      
        const obj = await context.env.filterjson.get('NYCS3.json');
        if (obj === null) {
          return new Response('Not found', { status: 404 });
        };

        // obj.body['440-2'] = jsonData;    
      
        
const subgroupID = '440-2'; // The ID of the subgroup you want to modify
let modified = false; // Flag to track if the subgroup was modified

// Iterate over the array to find the object containing the subgroup with the specified ID
for (let i = 0; i < obj.length; i++) {
  if (obj[i][subgroupID]) {
    obj[i][subgroupID] = jsonData; // Replace the content of the subgroup with jsonData
    modified = true; // Set the flag to true indicating that the subgroup was modified
    break; // Assuming each subgroup ID is unique, so no need to continue searching
  }
}

if (!modified) {
  // Handle case when subgroup with the specified ID is not found
  return new Response('Subgroup not found', { status: 404 });
}

// Now obj contains the modified JSON object
return new Response(JSON.stringify(obj));

   

    } catch (err) {
        return new Response('Error inserting data ', { status: 500 });
    }
}



  