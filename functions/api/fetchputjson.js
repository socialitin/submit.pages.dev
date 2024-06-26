export async function onRequest(context) {

    addEventListener('fetch', event => {
        event.respondWith(handleRequest(event.request))
        })
        
        async function handleRequest(request) {
        const url = new URL(request.url)
        const params = url.searchParams
        const myParam = params.get('myParam')
        
        return new Response(`My parameter value is: ${myParam}`)
        }

 // const obj = await context.env.filterjson.put(j2publish);
 // if (obj === null) {
//    return new Response('Not found', { status: 404 });
 // };
   //   return new Response(obj.body);
};