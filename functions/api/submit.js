
async function handleSubmit(request, event) {
    try {
        // Parse JSON body
        const data = await request.json();

        // Remove 'FormData' by using plain object
        // In this example, data is already a plain object

        // Prepare jsonData with dynamic key
        const jsonData = data;
        //{ [pWrapa]: data };
        console.log('jdata is', jsonData);

        // Stringify jsonData if the database expects a string
        const jsonString = JSON.stringify(jsonData);

        // Prepare and execute the SQL statement
        const stmt = event.env.DB.prepare("UPDATE hosts SET pitching = ? WHERE CompanyName LIKE '%Pereirawas%' ");
        const dbResponse = await stmt.bind(jsonString).run();

        return new Response(jsonString, { status: 200 });
    } catch (error) {
        console.error(jsonString, error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
