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

     /// insert /update pubd json
     //const workerURL = 'https://tournet.socialitin.workers.dev/'; // Replace with your Worker's URL
     //const response2 = await fetch(workerURL, {method: 'GET', // or 'POST', 'PUT', etc. depending on your Workerheaders: {'Content-Type': 'application/json',},});
     const response2 = await context.env.filterjson.get('NYCS.json');
     if (response2.ok) {
     const data = await response2.json();
     const j2upd = new Response(JSON.stringify(data));
     //var newjson = j2upd["NYCS"].push(jsonData);
    return j2upd;
     //new Response(JSON.stringify(data), {
     //headers: { 'Content-Type': 'application/json' },
     //});
     
     }; 
     //else {
     //return new Response('Error calling the Worker', { status: response.status });
     //}

     ///
        // Insert the JSON data into the SQLite database
       // await db.run("INSERT INTO hosts (pitching) VALUES (?)", [jsonData]);
       //const stmt = context.env.DB.prepare("INSERT INTO hosts (pitching) VALUES (?),[jsonDate]");


    } catch (err) {
       // return new Response('Error inserting data into SQLite database', { status: 500 });
    }
    
}
  