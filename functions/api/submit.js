/**  
 * POST /api/submit  
 */  
export async function onRequestPost(context) {  
    try {  
        // Parse form data from the request  
        let formData = await context.request.formData();  

        // Convert form data to JSON object  
        let formDataObject = {};  
        for (const [name, value] of formData.entries()) {  
            formDataObject[name] = value;  
        }  

        console.log(JSON.stringify(formDataObject, null, 2));  

        const thiscmpj = "3-5"; // Replace with appropriate field as needed  
        const jsonData = formDataObject[thiscmpj]; // Use the proper key directly for the UPDATE  

        console.log('jdata is', jsonData);  

        const stmt = context.env.DB.prepare("UPDATE hosts SET pitching = ? WHERE CompanyName LIKE '%Pereirawas%' ");  
        
        // Assuming 'thiscmpj' is the correct reference key for the value  
        const response = await stmt.bind(jsonData).run();   

        // Return a JSON response  
        return new Response(JSON.stringify({ message: 'Update successful', data: jsonData }), {  
            status: 200,  
            headers: {  
                'Content-Type': 'application/json'  
            }  
        });  
    } catch (err) {  
        console.error('Error:', err); // Log the error for debugging  
        return new Response('Error inserting data into SQLite database', { status: 500 });  
    }  
}
  