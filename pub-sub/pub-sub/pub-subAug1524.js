// src/MyDurableObject.js
import { DurableObject } from "cloudflare:workers";
var MyDurableObject = class extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.subscribers = /* @__PURE__ */ new Set();
  }
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
  async handleSubscription(request) {
    const [client, server] = new WebSocketPair();
    server.accept();
    this.subscribers.add(server);
    server.addEventListener("message", (event) => {
    });
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
    return new Response("Message sent to subscribers", { status: 200 });
  }
};

// src/index.js
var src_default = {
  async fetch(request, env, ctx) {
    let id = env.MY_DURABLE_OBJECT.idFromName(new URL(request.url).pathname);
    let stub = env.MY_DURABLE_OBJECT.get(id);
    return await stub.fetch(request);
  }
};
export {
  MyDurableObject,
  src_default as default
};
//# sourceMappingURL=index.js.map