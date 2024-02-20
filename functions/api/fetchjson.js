export async function onRequest(context) {
  const obj = await context.env.BUCKET.get('_BZ0wdHFj8CHeDPMEY28XbGjemKlggsDyQcZUSG5 ');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  }
  return new Response(obj.body);
}
//}

