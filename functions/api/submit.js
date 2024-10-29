
// Define the allowed origin(s)
const ALLOWED_ORIGIN = "https://your-allowed-origin.com"; // Replace with your frontend's origin

// Helper function to create a CORS response
function createCORSResponse(body, status = 200) {
  return new Response(body, {
    status: status,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN, // Allow specific origin
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json", // Adjust as needed
    },
  });
}

// Helper function to handle CORS preflight requests
function handleOptions(request) {
  const headers = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400", // Cache preflight response for 1 day
  };

  return new Response(null, {
    status: 204, // No Content
    headers: headers,
  });
}

// Main handleSubmit function
async function handleSubmit(request, event) {
  // Handle CORS preflight request
  if (request.method === "OPTIONS") {
    return handleOptions(request);
  }

  try {
    // Ensure the request method is POST
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Content-Type": "application/json",
        },
      });
    }

    // Parse JSON body
    const data = await request.json();

    // Validate incoming data as needed
    if (!data) {
      return new Response(JSON.stringify({ error: "Invalid JSON data" }), {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Content-Type": "application/json",
        },
      });
    }

    // Prepare jsonData (modify as per your requirements)
    const jsonData = data; // Or transform as needed
    console.log("jdata is", jsonData);

    // Stringify jsonData if the database expects a string
    const jsonString = JSON.stringify(jsonData);

    // Prepare and execute the SQL statement
    const stmt = event.env.DB.prepare(
      "UPDATE hosts SET pitching = ? WHERE CompanyName LIKE '%Pereirawas%'"
    );
    const dbResponse = await stmt.bind(jsonString).run();

    // Check if the update was successful (optional)
    if (dbResponse.success) {
      return createCORSResponse(JSON.stringify({ message: "Database updated successfully" }), 200);
    } else {
      return createCORSResponse(JSON.stringify({ error: "Database update failed" }), 500);
    }
  } catch (error) {
    console.error("Error in handleSubmit:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Content-Type": "application/json",
      },
    });
  }
}

// Fetch event listener
addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Adjust the path as needed
  if (url.pathname === "/api/submit") {
    event.respondWith(handleSubmit(request, event));
  } else {
    // Handle other routes or return 404
    event.respondWith(new Response("Not Found", { status: 404 }));
  }
});

