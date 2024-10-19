  export async function onRequest(context) {
    const ps = context.env.DB.prepare('SELECT * from streams');
    const data = await ps.first();
    //const data = await ps;
      return Response.json(data);
 //const info = await env.DB.prepare(`INSERT INTO jsondata (pitch) VALUES ('{"City": "Cali"}')`);
 //const info = await env.DB.prepare(`UPDATE jsondata SET pitch = json_replace(pitch, '$.City', 'NYC') `);
//const dat = await info;
//return Response.json(dat);

  }
