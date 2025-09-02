import { MyDurableObject } from "./MyDurableObject.js";

export default {
  async fetch(request, env, ctx) {
    let id = env.MY_DURABLE_OBJECT.idFromName(new URL(request.url).pathname);
    let stub = env.MY_DURABLE_OBJECT.get(id);

    let response = await stub.fetch(request);

    // Ensure the response status code is within the valid range
    if (response.status < 200 || response.status > 599) {
      return new Response("Invalid status code from Durable Object", { status: 500 });
    }

    return response;
  }
};

// Ensure you export the Durable Object class
export { MyDurableObject };



//export default {
  //async fetch(request, env, ctx) {
    //let id = env.MY_DURABLE_OBJECT.idFromName(new URL(request.url).pathname);
    //let stub = env.MY_DURABLE_OBJECT.get(id);

    //return await stub.fetch(request);
  //}
//};