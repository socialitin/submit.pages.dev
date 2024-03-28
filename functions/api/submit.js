
export async function onRequestPost(context) {
    try {
        // Parse form data from the request
        let formData = await context.request.formData();

        // Convert form data to JSON object
        let formDataObject = {};
        for (const [name, value] of formData.entries()) {
            formDataObject[name] = value;
        }

        // Read the existing JSON file
        const obj = await context.env.filterjson.get('NYCS.json');
        //const filePath = 'path_to_your_json_file.json';
        //const existingData = await fs.readFile(filePath, 'utf8');
        const existingJson = JSON.parse(obj);
    
        // Update the JSON object with the new data
        //existingJson.NYCS = formDataObject;

        // Convert the updated JSON object to a string
        //let updatedJsonData = JSON.stringify(existingJson);

        // Write the updated JSON data back to the file
       // await fs.writeFile(filePath, updatedJsonData, 'utf8');

        return formDataObject;
    } catch (err) {
        return new Response('Error updating JSON file', { status: 500 });
    }
}
