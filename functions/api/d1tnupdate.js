
    export async function onRequest(context) {

             const ps = context.env.DB.prepare('SELECT * from hosts');
       const data1 = await ps.first();
          //const data1 = data;
          //const p2p =JSON.parse(data1.pitching);
            const workerURL = 'https://tournet.socialitin.workers.dev/'; // Replace with your Worker's URL
            const response = await fetch(workerURL, {
            method: 'GET', // or 'POST', 'PUT', etc. depending on your Worker
            headers: {
            'Content-Type': 'application/json',
            },
            });
            
            if (response.ok) {
            const data = await response.json();
            const j2upd = new Response(JSON.stringify(data));
            //var newjson = j2upd["NYCS"].push(p2p);
            return j2upd[0].Pictures;
            //new Response(JSON.stringify(data), {
            //headers: { 'Content-Type': 'application/json' },
            //});
            
            } else {
            return new Response('Error calling the Worker', { status: response.status });
            }
            
            
       //// const stmt = context.env.DB.prepare("UPDATE hosts SET CompanyName = 'Pereira' WHERE CompanyName LIKE '%tn%' ");
       /// const result = await stmt.run(); // Execute the prepared statement
    
        // Check the result of the update operation
       /// if (result.changes > 0) {
           ///return new Response.json({ success: true, message: 'Records updated successfully.' });
       /// } else {
          ///  return new Response.json({ success: false, message: 'No records were updated.' });
      ////  }
    

    /////new update
  
     ///  const ps = context.env.DB.prepare('SELECT * from hosts');
      /// const data = await ps.first();
         /// return Response.json(data);
     //const info = await env.DB.prepare(`INSERT INTO jsondata (pitch) VALUES ('{"City": "Cali"}')`);
     //const info = await env.DB.prepare(`UPDATE jsondata SET pitch = json_replace(pitch, '$.City', 'NYC') `);

    
    ///call tournet.worker to fetch json
   ///const obj = context.env.grabjson.fetch('NYCS2.json');
    
   /// const obj = await context.env.grabjson.get('NYCS2.json');
   ////if (j2upd === null) {
   ////   return new Response('Not found', { status: 404 });
   /// };
      //// return new Response(obj.body);
     }
    