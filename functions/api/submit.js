/**
 * POST /api/submit
 */

export async function onRequestPost({ request }) {
	try {
		let input = await request.formData();

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
//const myjson = fetch('https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYDqApmQNJQQBimYACFKNRHQDsALwDCAZgCaACwQA5AIwAJCKgAiADwBMAKQBcLFh268BWEdVqTZilRu16jxgLAAoGeioIdkDsXSgAZxh0cN4oANMSDCw8AmISKjhgdgYAInxCADoAK3Cc0lQoMGDM7LzU4tLff0DgiGwAFToYdgS4GBgwKABjAjiqZCK4ADc4cKGEWAgAamB0XHB2X192fSikElx2VDhwCBIAbx8ASAyshJyAUX1MgfYSAEEABQBJHIAaa6EADm4QSAG0cjsXlV-iQcn0oLCcgh2JEAuF2DkALoAgC+RB8vgszCsPH4gnsYno0nkyjUWh0BhMTQCQRCYTRMWg8USghShFIt1qUBoOwaZUSlWqWVyIsO+nFLJaIU63V6-UGI2540mMzmCxgy1W6yqW2uOz2Z0Ox1OF2uV1mdCoQ0S7AgQyUAAoUQBHECoiB-EjBKZBoYQfQASjtVyuJBIyAAVIn7fGSImSE9oW9wugsppomcIiQMWcQDASBB0JW4ABrN4ikhwEjGADKAHlVCRff7whBU-GMwAldgDOBDN4gBBgEgAd14SkrSjeSkLJDolDnEUXVZLwVw3fYfoD4Ur6AH6ZIAAF4AhMhc+wsqEDcSW8+wC32lyu17uMTRv0PY8vyrC8MxvRB73OR8RRfEgpxnCBlxIABVIcABkzz3ACkLeHsAzPMDkGuZBkCGdEzhKAIUOnEgGBIAByJQIAgGBQVImAQDIbBUFQAA2CQ4HUABWdRcFwdQAAYABYhn4sh1AkdRUGk4S4GkiQhjkPjhMMPiCgQQwCkOKZkFUBQZF0BoAgYkhrmuciqC-BC6MY5jWPY5BOO43iBKE0TxKk2T5MU5TVPUzTtN0-TDOM9hTPMyzrKoBiB1I3N8zXJY4WQPtRiGCZcyoMprnjNLkzAkggQIZcEBHNEnLeOBZzgXhTzgACUQgKcnKbQ8Goxcg1joJt2pLCAnyBApKpQwbmtas5qtwurUSiRrPQKApo0bDrRqdF1UGocMxiwoE3UAlEBreChcDoSqILvYALnqtaMVfS7XvYIiB0dZ1EiO7Uqpq9gVqu71VvRdho0uWMrkcr9zhIZc4EOBBT1feiPshglYfhs5HLZCBVTeejkdR8ICjOiBPRyAnWmwCAukxaMAB8WbhErYagVASE9OnAmJgoRSGMAQEOcIab6AZhlGAJCoCHJI2h+040PbqECoFsO1UAoYOfbm6E9ebeH6z7ks9JWcdjXEVa6nrTchgogn0anIyt+MbdVgc8ZIEUTfomHYzJkHQRjWN41p1l6cZ7ocnuKXNVlnUiqID1EFLBgUPaPhsAADn+FXcQBcOSHxUq7JLn2sca1zjbOVA3Q9T0EKDP2IDd72KP605T3ouugeWl7IfBq6O5Lu2NfSdhZxIIf1sunvW6oXgx6uIvy-xIliVJGwKVERwaRcel3CZbw-Cj9kIiiLkxgSJIcHyNIhVyWd2DAcisgKZjgDACUKiqZ+ORX7v3fF-CAP8chKkJh0JmCRnYoDHCKM0AAeAAhLodsMh2gKE+A8JG4CwAAD4fDIO-jOMAHUgS5GCDkYhVxSHsBRnQ+hWRCAkDTmjN0uQs453zgmZhyDWHNncjAbAR4QBQCmLkAAGtgFC7xsD+GAPAaAZAYTsIvhAXI3wHgMHYLgM6OR+H2kEW6ZsgCphQGnpaIx-MtFAKgLgJCDATLDHYNgecTilBL1iHAMA2A5h+OyOoAokkjHIAEdACAVRCEyDAJQXAqAKEohIKwTA9Y0YkE+BQugQIED72QcgKJMSTGDCoLWW2b9ch9joFUcIy43Q5BVioI4uQRGeTHLk-JDg4pTBgPk3ABQRYJKSYgdgvTkDAI-u4mpVQhnhFKPaCJ1xClk2ISsm6dABG4EkewihCzcijMurQlWyCoDACBCWBAQw2ksTYqYDiOS8n716f0tYQz4liyOeMkyaBkmogKDAZ84SBHIB2VMARwBWpUGYfQ8FezZjhBfukkO2B4lAnQLQwp4LYXIJgLCq4HAQFZFQahQaSFizZLgF0-eWEghflwAsKYTVUkooQGGFEBAWWHFWIRWGVx6ljJIAEMp7AgwdQPLOZcmtOW3QOKOeJI0dkonDGAEau5cLBgMddEapZoDPnghWOAKsrhxJGf8psQxyLUAgNNWGhT8WnKUOoQhrAlAEF9mNNJCAMkAH5VkutOY6-l7wSBmq+Ra71GTPUtmmHAVs8xFgaMOOuTcs4FhBCXB691NA6mpqnHOTgJquTsAYqeTQ7R2ifErHeXiwwDhQBVdEkajZw2JP+WWrVZ0SDxK1GMdq3ScLLhNbOTAYBcDirAPE+cBqNwgCwr2rlya3jDPJdWOdCBgwARABiTJjZMCoz5bDauB4NXLieqsFJfphi1jVacryuLnWEPaPQX2ZwN0YjAKgANuLg2w3bJrDdPajhFjGuEbMrKfUgyzaB7s1Bl4GoCEuYsJaCgkAUJuEYVATX6JNibQYzKmwAQxG8TVC9ICnlquMzMOyziapUYuOAFBCO7mQAiI9sYSNI3QDPTVUJlFVEg9GnNuA807N4iDVo3ZKD0rQxh+dWGmxgFzFq3gJrNXkRTX+dgbwpUEE7dfGIaimoATIJNfNm6qA7CLIcZsu5BgNztbGB1oKoUijoYUzZxDVkEOIVvCwO9yR2H3uIQ+dI3CMk8FA+mHJr6xB5PffkT8ai5CEY-P+UpAFqPQGQSB59lRtGJuqaWfa5ZUSoGac4OQ3NUAAPrGg2HHHIcoxQlByLifzlhOBklsMIEL1JnDhYZB4EwzBfBAA');
//.then(response => response.json());
//.then(data => console.log(data))
//.catch(error => console.error('Error:', error));

let pretty = JSON.stringify(output, null, 2);
console.log(pretty);
await env.filterjson.put('NYC-Video.json');
//return new Response(`Put ${key} successfully!`);
		return new Response(pretty, {
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
	
return mdjson;

 };