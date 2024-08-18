/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { MyDurableObject } from "./MyDurableObject.js";

export default {
  async fetch(request, env, ctx) {
    let id = env.MY_DURABLE_OBJECT.idFromName(new URL(request.url).pathname);
    let stub = env.MY_DURABLE_OBJECT.get(id);

    return await stub.fetch(request);
  }
};

// Export the MyDurableObject class so Cloudflare can use it
export { MyDurableObject };
//// Ensure MyDurableObject is exported
//var src_default = {
	//async fetch(request, env, ctx) {
	 // let id = env.MY_DURABLE_OBJECT.idFromName(new URL(request.url).pathname);
	 // let stub = env.MY_DURABLE_OBJECT.get(id);
  
	  // Forward the request to the Durable Object's fetch method
	 // return await stub.fetch(request);
	//}
 // };
  
  //export {
	//MyDurableObject,
	///src_default as default
 /// };
 ////end 
  

//import { MyDurableObject } from './MyDurableObject.js';
//export default {
 // async fetch(request, env, ctx) {
 //   let id = env.MY_DURABLE_OBJECT.idFromName(new URL(request.url).pathname);
 //   let stub = env.MY_DURABLE_OBJECT.get(id);

 //   return await stub.fetch(request);
 // }
//};

//export { MyDurableObject };  // Ensure this line is included

