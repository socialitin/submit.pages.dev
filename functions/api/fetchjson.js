/**
 * POST /api/submit
 */
//export async function onRequestGet(context) {
//	return context.env.SERVICE.fetch(context.request);
  //}
  const url = 'https://pub-ff67a151dd104cf6b171f45a47c36526.r2.dev/NYCD.json';
  fetch('url')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

export async function onRequestPost({ request }) {
	try {
        const url = 'https://pub-ff67a151dd104cf6b171f45a47c36526.r2.dev/NYCD.json';
        fetch('url')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

let pretty = JSON.stringify(data, null, 2);
		return new Response(pretty, {
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		});
					
	} catch (err) {
		return new Response('Error parsing JSON content', { status: 400 });
	}
}

