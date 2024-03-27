
    export async function onRequest(context) {
       //// const stmt = context.env.DB.prepare("UPDATE hosts SET CompanyName = 'Pereira' WHERE CompanyName LIKE '%tn%' ");
       /// const result = await stmt.run(); // Execute the prepared statement
    
        // Check the result of the update operation
       /// if (result.changes > 0) {
           ///return new Response.json({ success: true, message: 'Records updated successfully.' });
       /// } else {
          ///  return new Response.json({ success: false, message: 'No records were updated.' });
      ////  }
    

    /////new update
   /// export async function onRequest(context) {
       const ps = context.env.DB.prepare('SELECT * from hosts');
       const data = await ps.first();
          return Response.json(data);
     //const info = await env.DB.prepare(`INSERT INTO jsondata (pitch) VALUES ('{"City": "Cali"}')`);
     //const info = await env.DB.prepare(`UPDATE jsondata SET pitch = json_replace(pitch, '$.City', 'NYC') `);
    //const dat = await info;
    //return Response.json(dat);
    
    ///call tournet.worker to fetch json
    ///const j2upd = context.env.filterjson.fetch('NYCS2.json');
    
    //const obj = await context.env.filterjson.get('NYCS2.json');
   /// if (j2upd === null) {
      ///return new Response('Not found', { status: 404 });
   /// };
       //// return new Response(obj.body);
      }
    