export class PubSubRoom {
    constructor(state, env) {
      this.state = state;
      this.env = env;
      this.subscribers = new Set(); // A set to store active WebSocket connections
    }
  
    // Handle incoming WebSocket connections
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/subscribe") {
        return this.handleSubscription(request);
      } else if (url.pathname === "/publish") {
        return this.handlePublish(request);
      } else {
        return new Response("Not Found", { status: 404 });
      }
    }
  
    // Handle new subscriptions
    async handleSubscription(request) {
      const [client, server] = new WebSocketPair();
      server.accept();
  
      this.subscribers.add(server);
  
      server.addEventListener("close", () => {
        this.subscribers.delete(server);
      });
  
      return new Response(null, { status: 101, webSocket: client });
    }
  
    // Handle publishing messages
    async handlePublish(request) {
      const data = await request.json();
  
      for (const subscriber of this.subscribers) {
        try {
          subscriber.send(JSON.stringify(data));
        } catch (err) {
          // Handle the case where the subscriber might have been disconnected
          this.subscribers.delete(subscriber);
        }
      }
  
      return new Response("Message sent to subscribers", { status: 200 });
    }
  }
  