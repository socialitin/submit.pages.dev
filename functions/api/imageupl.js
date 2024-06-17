addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    // URL of the Target Worker
    const targetWorkerUrl = 'https://imageupl.socialitin.workers.dev';
  
    try {
      // Making a fetch request to the Target Worker
      const responseFromTarget = await fetch(targetWorkerUrl, {
        method: 'GET', // Change this to 'POST' if required, and add body if needed
        headers: {
          // Add headers if necessary for your request
          'Content-Type': 'application/json'
        }
        // If it's a POST request, add a body:
        // body: JSON.stringify({ key: 'value' })
      });
  
      // Waiting for the response from the Target Worker
      const data = await responseFromTarget.json();
  
      // Returning the response from the Target Worker to the client
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      // Handling any errors in the fetch request
      return new Response('Error contacting the target Worker: ' + error.message, { status: 500 });
    }
  }

  /////script
  document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length === 0) {
      alert('Please select an image to upload.');
      return;
    }

    const imageFile = imageInput.files[0];

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
  ///https://imageupl.socialitin.workers.dev/
      const response = await fetch('https://upl-img-url.socialitin.workers.dev/', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.text();
      alert('Image uploaded successfully: ' + result);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + error.message);
    }
  });
  