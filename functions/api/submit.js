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
const existingData = obj;
        //const mixj = Object.assign(obj, jsonData);
        // Check if grouping key exists in both existing data and new data, and if their content matches
        const groupingKey = '440-2'; // Replace 'groupingKey' with your actual grouping key
        if (existingData.hasOwnProperty(groupingKey) && jsonData.hasOwnProperty(groupingKey) &&
            JSON.stringify(existingData[groupingKey]) === JSON.stringify(jsonData[groupingKey])) {
            // Merge existing data with new data for matching grouping key
            for (const [key, value] of Object.entries(jsonData)) {
                if (key !== groupingKey) {
                    if (existingData.hasOwnProperty(key) && Array.isArray(existingData[key])) {
                        existingData[key].push(...value);
                    } else { 
                        existingData[key] = value;
                    }
                }
            }
        } else {
            // If the grouping key does not match, treat it as a new entry
           // existingData = jsonData;
        }
        
        //const jMrgd = obj["NYCS"].push(jsonData);
        let jMrgd = JSON.stringify(existingData, null, 2);
        console.log(jMrgd);

        //let json = JSON.stringify(existingData, null, 2);

            return new Response(jMrgd);
      

    } catch (err) {
        return new Response('Error inserting data into SQLite database', { status: 500 });
    }
}



  