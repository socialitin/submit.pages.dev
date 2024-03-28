
export async function onRequestPost(context) {
    try {
        // Parse form data from the request
        let formData = await context.request.formData();

        // Convert form data to JSON object
        let formDataObject = {};
        for (const [name, value] of formData.entries()) {
            formDataObject[name] = value;
        }

        return formDataObject;
    } catch (err) {
        return new Response('Error updating JSON file', { status: 500 });
    }
}
