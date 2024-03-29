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
        let jsonData = formDataObject;
        //JSON.stringify(formDataObject);
console.log('jdata is', jsonData);
        // Insert the JSON data into the SQLite database
       // await db.run("INSERT INTO hosts (pitching) VALUES (?)", [jsonData]);
       //const stmt = context.env.DB.prepare("INSERT INTO hosts (pitching) VALUES (?),[jsonDate]");

      
        const existingData = await context.env.filterjson.get('NYCS.json');
        if (existingData === null) {
          return new Response('Not found', { status: 404 });
        };

        //const mixj = Object.assign(obj, jsonData);
        // Merge existing data with new data
        const jMrgd = existingData["NYCS"].push(jsonData);
        
        //let json = JSON.stringify(existingData, null, 2);

        //let jMrgd = JSON.stringify(obj, null, 2);
        console.log(jMrgd);

        //let json = JSON.stringify(existingData, null, 2);

            return new Response(jMrgd);
      

    } catch (err) {
        return new Response('Error inserting data into SQLite database', { status: 500 });
    }
}



  