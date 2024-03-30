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
        const subgroupID = '440-2'; 
        for (let i = 0; i < obj.length; i++) {
            if (obj[i][subgroupID]) {
              obj[i][subgroupID] = jsonData;
              break; // Assuming each subgroup ID is unique, so no need to continue searching
            }
          }      
            return new Response(JSON.stringify(obj));
   

    } catch (err) {
        return new Response('Error inserting data ', { status: 500 });
    }
}



  