  export async function onRequest(context) {
    const ps = context.env.DB.prepare('SELECT * from hosts');
    const data = await ps.second();
      return Response.json(data);
 //const info = await env.DB.prepare(`INSERT INTO jsondata (pitch) VALUES ('{"City": "Cali"}')`);
 //const info = await env.DB.prepare(`UPDATE jsondata SET pitch = json_replace(pitch, '$.City', 'NYC') `);
//const dat = await info;
//return Response.json(dat);
  }
