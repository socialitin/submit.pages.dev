import { DurableObject } from "cloudflare:workers";

class MyDurableObject extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.subscribers = new Set(); // Store active WebSocket connections
  }

  // Handle requests from the Worker
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.endsWith("/subscribe")) {
      return this.handleSubscription(request);
    } else if (url.pathname.endsWith("/publish")) {
      return this.handlePublish(request);
    } else {
      return new Response("Not Found", { status: 404 });
    }
  }

  // Handle new subscriptions (vendors connecting via WebSocket)
  async handleSubscription(request) {
    const [client, server] = new WebSocketPair();
    server.accept();

    this.subscribers.add(server);

    server.addEventListener("message", (event) => {
      // Optional: Handle messages from the subscribers (e.g., vendor messages)
    });

    server.addEventListener("close", () => {
      this.subscribers.delete(server);
    });

    return new Response(null, { status: 101, webSocket: client });
  }

  // Handle publishing messages (from kiosk or another source)
  async handlePublish(request) {
    const data = await request.json();
    const { message } = data;

    for (const subscriber of this.subscribers) {
      try {
        subscriber.send(JSON.stringify({ message }));
      } catch (err) {
        // If sending fails, remove the subscriber
        this.subscribers.delete(subscriber);
      }
    }

    return new Response("Message sent to subscribers", { status: 200 });
  }
}

export default {
  async fetch(request, env, ctx) {
    // The Durable Object ID is determined by the request path or another unique identifier
    let id = env.MY_DURABLE_OBJECT.idFromName(new URL(request.url).pathname);
    let stub = env.MY_DURABLE_OBJECT.get(id);

    // Forward the request to the Durable Object's fetch method
    return await stub.fetch(request);
  }
};

export { MyDurableObject };

