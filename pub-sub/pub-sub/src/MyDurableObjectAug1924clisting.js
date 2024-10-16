import { DurableObject } from "cloudflare:workers";

class MyDurableObject extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.channels = new Map(); // Map of channel names to sets of conversation IDs
    this.env = env;
  }

  async fetch(request) {
    const url = new URL(request.url);
    const pathnameParts = url.pathname.split("/");

    if (request.method === "OPTIONS") {
      return this.handleOptions(request);
    }

    const action = pathnameParts[1];
    const conversationId = pathnameParts[2]; // Simplified to handle conversation ID directly

    if (action === "initiate") {
      return this.handleInitiateConversation(request);
    } else if (action === "reply" && conversationId) {
      return this.handleReply(conversationId, request);
    } else if (action === "getConversation" && conversationId) {
      return this.handleGetConversation(conversationId);
    } else if (action === "listConversations") {
      return this.handleListConversations();
    } else {
      return this.createResponse("Not Found", { status: 404 });
    }
  }

  async handleInitiateConversation(request) {
    const convId = crypto.randomUUID(); // Generate a unique conversation ID

    const initialMessage = await request.json();
    const conversation = [{ message: initialMessage.message, timestamp: new Date().toISOString() }];

    // Store the initial message in KV under the conversation ID
    await this.env.VENDOR_CONVERSATIONS.put(convId, JSON.stringify(conversation));

    return this.createResponse(JSON.stringify({ conversationId: convId }), 200);
  }

  async handleReply(conversationId, request) {
    const reply = await request.json();

    // Retrieve existing conversation from KV
    const storedData = await this.env.VENDOR_CONVERSATIONS.get(conversationId);
    const conversation = storedData ? JSON.parse(storedData) : [];

    // Add the new message to the conversation
    conversation.push({ message: reply.message, timestamp: new Date().toISOString() });

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

  async handleListConversations() {
    // Retrieve all conversation IDs stored in the KV namespace
    const list = await this.env.VENDOR_CONVERSATIONS.list();
    const conversationIds = list.keys.map(key => key.name);

    return this.createResponse(JSON.stringify(conversationIds), 200);
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
