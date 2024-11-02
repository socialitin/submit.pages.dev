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
        let jsonData1 = JSON.stringify(formDataObject,null,2);
       // let pretty = JSON.stringify(output, null, 2);

////1
// This function will capture URL parameters  
//export async function onRequest(context) {  
    const { request } = context; // Get the request object  

    // Create a new URL object from the request URL  
    const url = new URL(request.url);  
    
    // Retrieve URL parameters using searchParams  
    const param1 = url.searchParams.get('cmpid'); 
    const param2 = url.searchParams.get('jid'); 

    // Craft a response using the captured parameters  

   // const thiscmpj = "3-5"; 
    // Returning the response  
  //  return new Response(responseMessage, {  
  //      headers: { "Content-Type": "text/plain" },  
  // });  
//}
/////1

const thiscmpj = param1 +'-'+param2;
//document.getElementById('jdata').dataset.cpit;
//console.log(thiscmpj);
            //const pWrap = new FormData(event.target);
            const jsonData = {[thiscmpj]: formDataObject};
              console.log(JSON.stringify(jsonData));


        // Insert the JSON data into the SQLite database
       // await db.run("INSERT INTO hosts (pitching) VALUES (?)", [jsonData]);
       //const stmt = context.env.DB.prepare("INSERT INTO hosts (pitching) VALUES (?),[jsonDate]");
const CompanyName = 'Pereirawas';
 //      const stmt = context.env.DB.prepare("UPDATE hosts SET pitching = ? WHERE CompanyName LIKE '%Pereirawas%' ");
//const response = await stmt.bind(JSON.stringify(jsonData)).run(); 
const stmt = context.env.DB.prepare("UPDATE hosts SET pitching = ? WHERE CompanyName LIKE ?"); 
const response = await stmt.bind(JSON.stringify(jsonData), `%${CompanyName}%`).run(); 
       //Update corresponding published json

       
        return new Response(jsonData, {
            status: 200,
            headers: {
                'Content-Type': 'json'
            }
        });
    } catch (err) {
        return new Response('Error inserting data into SQLite database', { status: 500 });
    }
}
  