export default {
    async fetch(request, env) {
      const url = new URL(request.url);
  
      // Assume you're using a single chat room for this example
      const roomName = "default-room";  // You can make this dynamic based on URL or request data
      const id = env.PUBSUBROOM.idFromName(roomName);
      const obj = env.PUBSUBROOM.get(id);
  
      // Forward the request to the Durable Object
      return await obj.fetch(request);
    },
  };
  
