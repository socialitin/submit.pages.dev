  export async function onRequest(context) {
   
   // const ps = context.env.DB.prepare('SELECT ROWID, CompanyName,ContactName,CountryIataRegion, CustomerId,DateTime,Status,pitching from streams where CustomerId = "440" ');
   // const data = await ps.all();
   const ps = context.env.DB.prepare('SELECT * FROM streams WHERE CustomerId = ?');  
   const data = await ps.all([cust_Id]);
      return Response.json(data);
 //const info = await env.DB.prepare(`INSERT INTO jsondata (pitch) VALUES ('{"City": "Cali"}')`);
 //const info = await env.DB.prepare(`UPDATE jsondata SET pitch = json_replace(pitch, '$.City', 'NYC') `);
//const dat = await info;
//return Response.json(dat);
//const cust_Id = '440';  
//const ps = context.env.DB.prepare('SELECT * FROM streams WHERE CustomerId = ?');  
//const data = await ps.all(cust_Id);  // Use all() directly on the prepared statement with parameters  
//return Response.json(data);////

  }
