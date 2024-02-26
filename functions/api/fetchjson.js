export async function onRequest(context) {
  const obj = await context.env.filterjson.get('NYC-Video.json');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  }
  const modifiedData = {
    City: 'Cali',
    
  }
  const jsonData = JSON.stringify(modifiedData)
  
    return new Response(obj.body);
   //return new Response(JSON.stringify(obj))
   //return new Response(obj.City);

};
