// src/workers/index.js
import { PubSubRoom } from './pubsub';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const id = env.PUBSUBROOM.idFromName(url.pathname); // Create a unique Durable Object ID based on the room name
    const obj = env.PUBSUBROOM.get(id);

    return await obj.fetch(request);
  },
};
