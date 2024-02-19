/**
 * POST /api/submit
 */
//export async function onRequestGet(context) {
//	return context.env.SERVICE.fetch(context.request);
  //}

export async function onRequestGet({ request }) {
	try {
        const url = 'https://pub-ff67a151dd104cf6b171f45a47c36526.r2.dev/NYCD.json';
       const myj = fetch('url');
     // .then(response => response.json())
     // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));

let pretty = JSON.stringify(myj, null, 2);
		return new Response(pretty, {
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		});
					
	} catch (err) {
		return new Response('Error parsing JSON content', { status: 400 });
	}
}

