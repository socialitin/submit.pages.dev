export async function onRequest(context) {

  addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
    })
    
    async function handleRequest(request) {
    const url = new URL(request.url)
    const params = url.searchParams
    var myParam = params.get('name')
    if (myParam = 'put'){
  const obj = await context.env.filterjson.get('NYCS.json');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  };
      return new Response(obj.body);

    }
    //return new Response(myParam)
    }


};

