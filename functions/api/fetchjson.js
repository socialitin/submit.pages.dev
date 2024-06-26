export async function onRequest(context) {
  const obj = await context.env.filterjson.get('NYCS.json');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  };
      return new Response(obj.body);
};
