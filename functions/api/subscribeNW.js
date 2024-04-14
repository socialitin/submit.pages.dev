export async function onRequestPost(context) {
    try {
        const formData = await context.request.formData();
        const formDataObject = Object.fromEntries(formData);
        const jsonData = JSON.stringify(formDataObject);
        console.log('JSON data:', jsonData);

        const storageUrl = 'https://tournet.socialitin.workers.dev/NYCS.json';
        const response = await fetch(storageUrl, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: jsonData
        });

        if (!response.ok) {
            throw new Error(`Failed to store JSON data: ${response.statusText}`);
        }

        return new Response(jsonData, {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (err) {
        console.error('Error processing request:', err.message, err.stack);
        return new Response(`Error processing request: ${err.message}`, { status: 500 });
    }
}
