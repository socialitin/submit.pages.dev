addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    const imageUrl = 'https://tournet.com/SocialITIN/img/Miami%20Beach.png';
    const apiKey = '8lLq_u9YwvbgM5NintQ_5HzMHhJStJ1XDQBAgw7X';
    const accountId = 'f0c92755958332f29a4d8658606c6f34';
  
    // Fetch the image from the URL
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return new Response('Failed to fetch image', { status: 500 });
    }
  
    const imageBlob = await imageResponse.blob();
    const formData = new FormData();
    formData.append('file', imageBlob, 'image.jpg'); // Adjust the file name and type as needed
  
    // Upload the image to Cloudflare Images
    const uploadResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    });
  
    const uploadResult = await uploadResponse.json();
    if (!uploadResult.success) {
      return new Response(`Failed to upload image: ${uploadResult.errors.map(e => e.message).join(', ')}`, { status: 500 });
    }
  
    return new Response('Image uploaded successfully!', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uploadResult.result)
    });
  }
  