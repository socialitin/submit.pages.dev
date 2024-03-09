/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
    try {
        const db = context.env.DB;

        // Parse form data from the request
        let formData = await context.request.formData();

        // Convert form data to JSON object
        let formDataObject = {};
        for (const [name, value] of formData.entries()) {
            formDataObject[name] = value;
        }

        // Convert the JSON object to a string
        let jsonData = JSON.stringify(formDataObject);

        // Insert the JSON data into the SQLite database
        await db.run("INSERT INTO hosts (pitching) VALUES (?)", [jsonData]);

        return new Response('Data inserted successfully', {
            status: 200,
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    } catch (err) {
        return new Response('Error inserting data into SQLite database', { status: 500 });
    }
}
  