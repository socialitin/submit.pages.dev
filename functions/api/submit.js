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

      
        const obj = await context.env.filterjson.get('NYCS3.json');
        if (obj === null) {
          return new Response('Not found', { status: 404 });
        };
       // obj["440-2"] = jsonData;
        const jMrgd =  obj;
        //Object.assign(obj, jsonData);
        // Check if grouping key exists in both existing data and new data, and if their content matches
        //const groupingKey = '440-2'; // Replace 'groupingKey' with your actual grouping key
              //const jMrgd = obj["NYCS"].push(jsonData);
        
        console.log(jMrgd);

        let json = JSON.stringify(jMrgd, null, 2);

            return new Response(jMrgd);
      

    } catch (err) {
        return new Response('Error inserting data into SQLite database', { status: 500 });
    }
}



  