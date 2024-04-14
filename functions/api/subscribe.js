/**
 * POST /api/submit
 * Handles incoming POST requests and generates a JSON file with a dynamic name based on today's date.
 */
export async function onRequestPost(context) {
    try {
        // Parse form data from the request
        const formData = await context.request.formData();

        // Convert form data to JSON object
        const formDataObject = Object.fromEntries(formData);

        // Convert the JSON object to a string
        const jsonData = JSON.stringify(formDataObject);
        console.log('JSON data:', jsonData);

        // Generate a file name based on today's date
        const date = new Date();
        const dateString = date.toISOString().slice(0, 10); // Formats to 'YYYY-MM-DD'
        const fileName = `${dateString}.json`;

        // Assuming the base URL for your Cloudflare Worker that handles file storage
        const storageUrl = 'https://tournet.socialitin.workers.dev/';
        //`https://your-cloudflare-worker-url.com/test1.json`;

        // Prepare the PUT request to store the JSON data
        const response = await fetch(storageUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData,
            mode: 'cors'  // Ensure CORS mode is set if crossing origins
        });

        
        if (!response.ok) {
            throw new Error(`Failed to store JSON data: ${response.statusText}`);
        }

        // Return the success response with the JSON data
        return new Response(jsonData, {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.error('Error:', err);
        return new Response('Error processing request', { status: 500 });
    }
}
