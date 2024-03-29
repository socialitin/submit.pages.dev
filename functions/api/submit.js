// POST /api/submit

export async function onRequestPost({ request }) {
    try {
           // Parse form data from the request
           let formData = await context.request.formData();

           // Convert form data to JSON object
           let formDataObject = {};
           for (const [name, value] of formData.entries()) {
               formDataObject[name] = value;
           }
   
           // Convert the JSON object to a string
           let jsonData = JSON.stringify(formDataObject);
   console.log('jdata is', jsonData);

        let existingData = await getExistingData();
        if (!existingData) {
            existingData = {};
        }

        // Merge existing data with new data
        Object.assign(existingData, jsonData);

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
        return new Response('Error parsing JSON content', { status: 400 });
    }
}

// Function to fetch existing JSON data
async function getExistingData() {
    try {
        const response = await R2.get("https://pub-ff67a151dd104cf6b171f45a47c36526.r2.dev/NYCS2.json");
        if (!response.ok) {
            return null;
        }
        const jsonUpd = await response.json();
        return jsonUpd;
    } catch (error) {
        return null;
    }
}

// Function to write JSON data to file
async function writeToJSONFile(jsonUpd) {
    const response = await R2.put("https://pub-ff67a151dd104cf6b171f45a47c36526.r2.dev/NYCS2.json", {
        body: jsonUpd,
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to write JSON data to file");
    }
}

  