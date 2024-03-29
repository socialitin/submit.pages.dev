// POST /api/submit

export async function onRequestPost({ request }) {
    try {
        let input = await request.formData();
        console.log(input);
        // Convert FormData to JSON
        // NOTE: Allows multiple values per key
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

  return output;

    } finally{}
}



  