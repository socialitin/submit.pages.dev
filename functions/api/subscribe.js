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

       //const stmt = context.env.DB.prepare("INSERT jsondata SET pitch = ? WHERE pitch LIKE '%name%' ");
       const stmt = context.env.DB.prepare("INSERT INTO jsondata (pitch) VALUES '{"pitch": jsonData}'");
     
const response = await stmt.bind(jsonData).run(); 

       //Update corresponding published json
      
        return new Response(jsonData, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    } catch (err) {
        return new Response('Error inserting data into SQLite database', { status: 500 });
    }
}
  