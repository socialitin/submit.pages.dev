import { DurableObject } from "cloudflare:workers";

class MyDurableObject extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.subscribers = new Set();
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return this.handleOptions(request);
    }

    if (url.pathname.endsWith("/subscribe")) {
      return this.handleSubscription(request);
    } else if (url.pathname.endsWith("/publish")) {
      return this.handlePublish(request);
    } else {
      return this.createResponse("Not Found", 404);
    }
  }
  async handleSubscription(request) {
    const [client, server] = new WebSocketPair();
    server.accept();
    this.subscribers.add(server);

    server.addEventListener("message", (event) => {});

    server.addEventListener("close", () => {
      this.subscribers.delete(server);
    });

    return new Response(null, { status: 101, webSocket: client });
  }

  async handlePublish(request) {
    const data = await request.json();
    const { message } = data;

    for (const subscriber of this.subscribers) {
      try {
        subscriber.send(JSON.stringify({ message }));
      } catch (err) {
        this.subscribers.delete(subscriber);
      }
    }

    return this.createResponse("Message sent to subscribers", 200);
  }

  handleOptions(request) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    return new Response(null, { status: 204, headers });
  }

  createResponse(body, status = 200) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    return new Response(body, { status, headers });
  }
}

export { MyDurableObject };


