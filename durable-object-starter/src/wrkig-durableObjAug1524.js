
// src/index.js  //https://durable-object-starter.socialitin.workers.dev/
import { DurableObject } from "cloudflare:workers";
var MyDurableObject = class extends DurableObject {
  /**
   * The constructor is invoked once upon creation of the Durable Object, i.e. the first call to
   * 	`DurableObjectStub::get` for a given identifier (no-op constructors can be omitted)
   *
   * @param {DurableObjectState} ctx - The interface for interacting with Durable Object state
   * @param {Env} env - The interface to reference bindings declared in wrangler.toml
   */
  constructor(ctx, env) {
    super(ctx, env);
  }
  /**
   * The Durable Object exposes an RPC method sayHello which will be invoked when when a Durable
   *  Object instance receives a request from a Worker via the same method invocation on the stub
   *
   * @param {string} name - The name provided to a Durable Object instance from a Worker
   * @returns {Promise<string>} The greeting to be sent back to the Worker
   */
  async sayHello(name) {
    return `Hello, ${name}!`;
  }
};
var src_default = {
  /**
   * This is the standard fetch handler for a Cloudflare Worker
   *
   * @param {Request} request - The request submitted to the Worker from the client
   * @param {Env} env - The interface to reference bindings declared in wrangler.toml
   * @param {ExecutionContext} ctx - The execution context of the Worker
   * @returns {Promise<Response>} The response to be sent back to the client
   */
  async fetch(request, env, ctx) {
    let id = env.MY_DURABLE_OBJECT.idFromName(new URL(request.url).pathname);
    let stub = env.MY_DURABLE_OBJECT.get(id);
    let greeting = await stub.sayHello("world");
    return new Response(greeting);
  }
};
export {
  MyDurableObject,
  src_default as default
};
//# sourceMappingURL=index.js.map
