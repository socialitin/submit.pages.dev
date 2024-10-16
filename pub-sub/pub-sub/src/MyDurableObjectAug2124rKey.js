import { DurableObject } from "cloudflare:workers";

class MyDurableObject extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.env = env;
  }

  async fetch(request) {
    const url = new URL(request.url);
    const pathnameParts = url.pathname.split("/");

    if (request.method === "OPTIONS") {
      return this.handleOptions(request);
    }

    const action = pathnameParts[1];
    const conversationId = pathnameParts[2];

    if (action === "initiate") {
      return this.handleInitiateConversation(request);
    } else if (action === "reply" && conversationId) {
      return this.handleReply(conversationId, request);
    } else if (action === "getConversation" && conversationId) {
      return this.handleGetConversation(conversationId);
    } else if (action === "listConversations" && pathnameParts[2]) {
      const itinId = pathnameParts[2];
      return this.handleListConversations(itinId);
    } else {
      return this.createResponse("Not Found", { status: 404 });
    }
  }

  async handleInitiateConversation(request) {
    const { itinId, channel, message } = await request.json();
    const convId = `${itinId}-${channel}-${crypto.randomUUID()}`; // Generate a unique conversation ID within the itinerary and channel

    const conversation = [{ message, timestamp: new Date().toISOString(), hostId: 'initial' }];

    // Store the initial message in KV under the conversation ID
    await this.env.VENDOR_CONVERSATIONS.put(convId, JSON.stringify(conversation));

    // Return the conversation ID and refresh the list of conversations
    const conversations = await this.listConversations(itinId);
    return this.createResponse(JSON.stringify({ conversationId: convId, conversations }), 200);
  }

  async handleReply(conversationId, request) {
    const { message, hostId } = await request.json();

    // Retrieve existing conversation from KV
    const storedData = await this.env.VENDOR_CONVERSATIONS.get(conversationId);
    const conversation = storedData ? JSON.parse(storedData) : [];

    // Add the new message with the host ID to the conversation
    conversation.push({ message, timestamp: new Date().toISOString(), hostId });

    // Store the updated conversation in KV
    await this.env.VENDOR_CONVERSATIONS.put(conversationId, JSON.stringify(conversation));

    return this.createResponse("Message added to conversation", 200);
  }

  async handleGetConversation(conversationId) {
    const storedData = await this.env.VENDOR_CONVERSATIONS.get(conversationId);

    if (!storedData) {
      return this.createResponse("Conversation not found", 404);
    }

    return this.createResponse(storedData, 200);
  }

  async handleListConversations(itinId) {
    // Retrieve all conversation IDs stored in the KV namespace for the specified itinerary, regardless of the channel
    const list = await this.env.VENDOR_CONVERSATIONS.list({ prefix: `${itinId}-` });
    const conversationIds = list.keys.map(key => key.name);

    return this.createResponse(JSON.stringify(conversationIds), 200);
  }

  async listConversations(itinId) {
    // This is a helper method to list conversations internally without sending a separate response
    const list = await this.env.VENDOR_CONVERSATIONS.list({ prefix: `${itinId}-` });
    return list.keys.map(key => key.name);
  }

  handleOptions(request) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
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
