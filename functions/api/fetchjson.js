export async function onRequest(context) {
  const obj = await context.env.filterjson.get('NYC-NIA.json');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  }
    //return new Response(obj.body);
   //return new Response(JSON.stringify(obj))
   return new Response(obj.City);

};
