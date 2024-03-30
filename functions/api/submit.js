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
        let found = false;
        
        // Iterate over each object in the array
        for (let i = 0; i < obj.length; i++) {
          // Check if the subgroup ID exists in the current object
          if (obj[i][subgroupID]) {
            obj[i][subgroupID] = jsonData; // Replace the content of the subgroup with jsonData
            found = true;
            break; // Exit the loop if the subgroup is found (assuming subgroup IDs are unique)
          }
        }
        
        if (!found) {
          return new Response('Subgroup ID not found', { status: 404 });
        }
        
        // Now obj contains the modified JSON object
        return new Response(JSON.stringify(obj));
   

    } catch (err) {
        return new Response('Error inserting data ', { status: 500 });
    }
}



  