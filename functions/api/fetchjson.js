export async function onRequest(context) {
  const obj = await context.env.filterjson.get('NYC-NIA.json');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  }
  
    return new Response(obj.property1);
   // return new Response(offers);

};
