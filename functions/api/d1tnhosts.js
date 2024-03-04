  export async function onRequest(context) {
 const info = await env.DB.prepare(`UPDATE jsondata SET pitch = json_replace(pitch, '$.City', 'NYC') `);
const dat = await info;
return Response.json(dat);
  }
