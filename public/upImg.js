document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length === 0) {
        alert('Please select an image to upload.');
        return;
    }

    const imageFile = imageInput.files[0];

    try {
        // Upload the image to a temporary location
        const tempImageURL = await uploadToTempLocation(imageFile);

        // Call the Cloudflare Worker with the temporary image URL
        const response = await callCloudflareWorker(tempImageURL);
        alert('Image uploaded successfully: ' + response);
    } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image: ' + error.message);
    }
});

/**
 * Uploads the image to a temporary location
 * @param {File} imageFile
 * @returns {Promise<string>} URL of the temporary image
 */
async function uploadToTempLocation(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch('/upload-temp', { // This endpoint should be your server endpoint that handles temporary storage
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to upload to temporary location');
    }

    const result = await response.json();
    return result.tempImageURL; // Assuming your server returns the URL of the temporary image
}

/**
 * Calls the Cloudflare Worker with the temporary image URL
 * @param {string} tempImageURL
 * @returns {Promise<string>} URL of the uploaded image
 */
async function callCloudflareWorker(tempImageURL) {
    const formData = new FormData();
    formData.append('image', tempImageURL);

    const response = await fetch('https://your-worker.your-subdomain.workers.dev', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to upload to Cloudflare');
    }

    const result = await response.text();
    return result;
}



//////server side upload;
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload-temp', upload.single('image'), (req, res) => {
    const tempImageURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ tempImageURL });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
