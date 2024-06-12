addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    if (request.method !== "POST") {
      return new Response("Expected POST", { status: 405 });
    }
  
    const formData = await request.formData();
    const imageFile = formData.get('image'); // 'image' is the name field in the form
  
    if (!imageFile) {
      return new Response("No image provided", { status: 400 });
    }
  
    try {
      const imageURL = await uploadToCloudflareImages(imageFile);
      return new Response(`Image uploaded successfully: ${imageURL}`, { status: 200 });
    } catch (error) {
      return new Response(`Failed to upload image: ${error.message}`, { status: 500 });
    }
  }
  
  async function uploadToCloudflareImages(file) {
    const CLOUDFLARE_IMAGES_ENDPOINT = "https://api.cloudflare.com/client/v4/accounts/your_account_id/images/v1";
    const CLOUDFLARE_API_TOKEN = 'your_api_token';
  
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch(CLOUDFLARE_IMAGES_ENDPOINT, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`
      },
      body: formData
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to upload to Cloudflare Images: ${errorText}`);
    }
  
    const result = await response.json();
    return result.result.variants[0]; // Assuming the API returns variants with URLs of the uploaded image
  }
  