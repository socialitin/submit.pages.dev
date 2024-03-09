/**
 * POST /api/submit
 */

export async function onRequestPost({ request }) {
	try {
		let input = await request.formData();
		console.log(input);
		// Convert FormData to JSON
		// NOTE: Allows mutliple values per key
		let tmp, output = {};
		for (let [key, value] of input) {
			tmp = output[key];
			if (tmp === undefined) {
				output[key] = value;
			} else {
				output[key] = [].concat(tmp, value);
			}
		
		}
		console.log(output);
let pretty = JSON.stringify(output, null, 2);
var toupd = '<img id="fjson" src="https://tournet.com/SocialITIN/img/feedicon.jpg" width="32px" height="32px" style="margin-top:10px; float:right;" onclick="d1tnupdate()">';
console.log(pretty);

		return new Response(pretty+toupd, {
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		});
		
	} catch (err) {
		return new Response('Error parsing JSON content', { status: 400 });
	}
}
export async function onRequestGet(context) {
	const mdjson = context.env.SERVICE.fetch(context.request);
	console.log('pjson', mdjson)
return mdjson;

 };