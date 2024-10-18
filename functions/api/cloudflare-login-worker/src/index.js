// index.js
import bcrypt from 'bcryptjs'; // Corrected import statement

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Define allowed origins (replace with your actual domain in production)
    const allowedOrigins = ['https://tournet.com', 'https://www.tournet.com'];

    // Get the Origin header from the request
    const origin = request.headers.get('Origin');

    // Function to determine if the origin is allowed
    const isOriginAllowed = origin && allowedOrigins.includes(origin);

    // Function to set CORS headers
    const setCorsHeaders = (response) => {
      const headers = {
        'Access-Control-Allow-Origin': isOriginAllowed ? origin : 'https://tournet.com', // Fallback to your domain
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true', // If you need to allow credentials
        'Vary': 'Origin', // Inform caches that response varies based on Origin
      };
      // Merge existing headers with CORS headers
      for (const [key, value] of Object.entries(headers)) {
        response.headers.set(key, value);
      }
      return response;
    };

    // Handle preflight OPTIONS request
    if (url.pathname === '/login' && request.method === 'OPTIONS') {
      return setCorsHeaders(new Response(null, { status: 204 })); // No Content
    }

    // Handle POST /login request
    if (url.pathname === '/login' && request.method === 'POST') {
      try {
        const { username, password } = await request.json();

        if (!username || !password) {
          const errorResponse = new Response(JSON.stringify({ error: 'Username and password are required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
          return setCorsHeaders(errorResponse);
        }

        // Query the user from D1
        const result = await env.DB.prepare("SELECT * FROM members WHERE username = ?").bind(username).first();

        if (!result) {
          const errorResponse = new Response(JSON.stringify({ error: 'Invalid username or password.' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          });
          return setCorsHeaders(errorResponse);
        }

        const isPasswordValid = await bcrypt.compare(password, result.password_hash);

        if (!isPasswordValid) {
          const errorResponse = new Response(JSON.stringify({ error: 'Invalid username or password.' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          });
          return setCorsHeaders(errorResponse);
        }

        // For demonstration, returning a success message.
        // In production, you might return a JWT or set a session cookie.
        const successResponse = new Response(JSON.stringify({ message: 'Login successful!' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
        return setCorsHeaders(successResponse);

      } catch (error) {
        console.error('Login error:', error);
        const errorResponse = new Response(JSON.stringify({ error: 'Internal Server Error.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
        return setCorsHeaders(errorResponse);
      }
    }

    // Handle all other routes
    return new Response('Not Found', { status: 404 });
  }
};
