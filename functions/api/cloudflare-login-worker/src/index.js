// index.js

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Define allowed origins
    const allowedOrigins = ["https://www.ads.tournet.com"];

    // Get the Origin header from the request
    const origin = request.headers.get("Origin");

    // Determine if the origin is allowed
    const isOriginAllowed = origin && allowedOrigins.includes(origin);

    // Function to set CORS headers
    const setCorsHeaders = (response) => {
      response.headers.set("Access-Control-Allow-Origin", isOriginAllowed ? origin : "https://www.ads.tournet.com");
      response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type");
      response.headers.set("Access-Control-Allow-Credentials", "true");
      response.headers.set("Vary", "Origin");
      return response;
    };

    // Handle preflight OPTIONS request
    if (url.pathname === "/login" && request.method === "OPTIONS") {
      console.log('Received OPTIONS request for /login');
      return setCorsHeaders(new Response(null, { status: 204 }));
    }

    // Handle POST /login request
    if (url.pathname === "/login" && request.method === "POST") {
      try {
        const { username, password } = await request.json();
        console.log(`Received login request for username: ${username}`);

        // Validate input
        if (!username || !password) {
          console.log('Username or password missing in request');
          const errorResponse = new Response(JSON.stringify({ error: "Username and password are required." }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
          return setCorsHeaders(errorResponse);
        }

        // Query the user from D1
        const result = await env.DB.prepare("SELECT * FROM members WHERE username = ?").bind(username).first();

        if (!result) {
          console.log(`User not found: ${username}`);
          const errorResponse = new Response(JSON.stringify({ error: "Invalid username or password." }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
          });
          return setCorsHeaders(errorResponse);
        }

        console.log(`Fetched user: ${result.username}`);
        console.log(`Stored password: ${result.password_hash}`);

        // Compare provided password with stored password
        const isPasswordValid = (password === result.password_hash);
        console.log(`Password valid: ${isPasswordValid}`);

        if (!isPasswordValid) {
          console.log('Password comparison failed');
          const errorResponse = new Response(JSON.stringify({ error: "Invalid username or password." }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
          });
          return setCorsHeaders(errorResponse);
        }

        // Successful login
        console.log('Login successful');
        const successResponse = new Response(JSON.stringify({ message: "Login successful!" }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
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
    console.log(`Received request for unsupported path: ${url.pathname}`);
    return new Response('Not Found', { status: 404 });
  }
};
