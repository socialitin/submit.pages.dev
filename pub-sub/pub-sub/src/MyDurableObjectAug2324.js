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
      return this.handleHostReply(conversationId, request);
    } else if (action === "getConversation" && conversationId) {
      return this.handleGetConversation(conversationId);
    } else if (action === "listConversations" && pathnameParts[2]) {
      const channel = pathnameParts[2];
      return this.handleListConversations(channel);
    } else {
      return this.createResponse("Not Found", { status: 404 });
    }
  }

  async handleInitiateConversation(request) {
    const { itinId, channel, message } = await request.json();
    const conversationId = crypto.randomUUID(); // Generate a unique conversation ID

    const userKey = `${itinId}_${channel}_${conversationId}`;
    const hostKey = `${channel}_${itinId}_${conversationId}`;

    const initialMessage = {
      message,
      timestamp: new Date().toISOString(),
      hostId: 'initial'
    };

    const conversation = [initialMessage];

    // Store the initial message in both the user and host keys
    await this.env.VENDOR_CONVERSATIONS.put(userKey, JSON.stringify(conversation));
    await this.env.VENDOR_CONVERSATIONS.put(hostKey, JSON.stringify({ conversation, status: "new" }));

    // Return the conversation ID and refresh the list of conversations for the channel
    const conversations = await this.listConversations(channel);
    return this.createResponse(JSON.stringify({ conversationId: userKey, conversations }), 200);
  }

  async handleHostReply(conversationId, request) {
    const { message, hostId } = await request.json();

    // Identify the original key based on conversationId
    const [channel, itinId, uniqueId] = conversationId.split("_");
    const userKey = `${itinId}_${channel}_${uniqueId}`;

    // Update the original conversation
    const storedData = await this.env.VENDOR_CONVERSATIONS.get(userKey);
    const conversation = storedData ? JSON.parse(storedData) : [];

    conversation.push({ message, timestamp: new Date().toISOString(), hostId });

    // Store the updated conversation in the original key
    await this.env.VENDOR_CONVERSATIONS.put(userKey, JSON.stringify(conversation));

    // No need to update the host's key with the reply

    return this.createResponse("Reply added to conversation", 200);
  }

  async handleGetConversation(conversationId) {
    const storedData = await this.env.VENDOR_CONVERSATIONS.get(conversationId);

    if (!storedData) {
      return this.createResponse("Conversation not found", 404);
    }

    return this.createResponse(storedData, 200);
  }

  async handleListConversations(channel) {
    // Retrieve all conversation IDs for a given channel (for hosts to see new requests)
    const list = await this.env.VENDOR_CONVERSATIONS.list({ prefix: `${channel}_` });
    const conversationIds = list.keys.map(key => key.name);

    return this.createResponse(JSON.stringify(conversationIds), 200);
  }

  async listConversations(channel) {
    // Internal helper method for listing conversations by channel
    const list = await this.env.VENDOR_CONVERSATIONS.list({ prefix: `${channel}_` });
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
