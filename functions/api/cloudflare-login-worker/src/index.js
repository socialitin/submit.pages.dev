// index.js
import { bcrypt } from 'bcryptjs';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/login' && request.method === 'POST') {
      return handleLogin(request, env);
    }

    return new Response('Not Found', { status: 404 });
  }
}

async function handleLogin(request, env) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Username and password are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Replace '*' with your specific origin in production
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
         },
      });
    }

    // Query the user from D1
    const result = await env.DB.prepare("SELECT * FROM members WHERE username = ?").bind(username).first();

    if (!result) {
      return new Response(JSON.stringify({ error: 'Invalid username or password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Replace '*' with your specific origin in production
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
         },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, result.password_hash);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid username or password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Replace '*' with your specific origin in production
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
         },
      });
    }

    // For demonstration, returning a success message.
    // In production, you might return a JWT or set a session cookie.
    return new Response(JSON.stringify({ message: 'Login successful!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

