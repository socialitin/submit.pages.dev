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

        let existingData = await getExistingData();
        if (!existingData) {
            existingData = {};
        }

        // Merge existing data with new data
        Object.assign(existingData, output);

        let json = JSON.stringify(existingData, null, 2);
        console.log(json);

        // Write JSON data to file
        await writeToJSONFile(json);

        return new Response(json, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        });

    } catch (err) {
        return existingData;
        //new Response('Error parsing JSON content', { status: 400 });
    }
}

// Function to fetch existing JSON data
async function getExistingData() {
    try {
        const response = await R2.get("https://pub-ff67a151dd104cf6b171f45a47c36526.r2.dev/NYCS2.json");
        if (!response.ok) {
            return null;
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        return null;
    }
}

// Function to write JSON data to file
async function writeToJSONFile(jsonData) {
    const response = await R2.put("https://pub-ff67a151dd104cf6b171f45a47c36526.r2.dev/NYCS2.json", {
        body: jsonData,
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to write JSON data to file");
    }
}

  