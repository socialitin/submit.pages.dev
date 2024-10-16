import { DurableObject } from "cloudflare:workers";

class MyDurableObject extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.env = env;
  }

  async fetch(request) {
    try {
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
        return this.createResponse("Not Found", 404);
      }
    } catch (error) {
      console.error('Worker error:', error);
      return this.createResponse("Internal Server Error", 500);
    }
  }

  async handleInitiateConversation(request) {
    try {
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

      // Store the initial message in both the user and host keys with the new structure
      await this.env.VENDOR_CONVERSATIONS.put(userKey, JSON.stringify(conversation));
      await this.env.VENDOR_CONVERSATIONS.put(hostKey, JSON.stringify({ conversation, status: "new" }));

      // Return the conversation ID and refresh the list of conversations for the channel
      const conversations = await this.listConversations(channel);
      return this.createResponse(JSON.stringify({ conversationId: userKey, conversations }), 200);
    } catch (error) {
      console.error('Error initiating conversation:', error);
      return this.createResponse("Failed to initiate conversation", 500);
    }
  }

  async handleHostReply(conversationId, request) {
    try {
      const { message, hostId } = await request.json();

      if (!hostId) {
        console.error("Host ID is missing in the reply request.");
        return this.createResponse("Host ID is required", 400);
      }

      console.log(`Handling reply for conversation ID: ${conversationId}`);
      console.log(`Host ID: ${hostId}`);

      // Identify the original key based on conversationId
      const parts = conversationId.split("_");
      if (parts.length !== 3) {
        console.error(`Invalid conversation ID format: ${conversationId}`);
        return this.createResponse("Invalid conversation ID format", 400);
      }

      const [channel, itinId, uniqueId] = parts;
      if (!channel || !itinId || !uniqueId) {
        console.error(`Invalid parts extracted from conversation ID: ${parts}`);
        return this.createResponse("Invalid conversation ID parts", 400);
      }

      const userKey = `${itinId}_${channel}_${uniqueId}`;
      console.log(`User key generated: ${userKey}`);

      // Update the original conversation
      const storedData = await this.env.VENDOR_CONVERSATIONS.get(userKey);

      if (!storedData) {
        console.error(`No stored data found for user key: ${userKey}`);
        return this.createResponse("Conversation not found", 404);
      }

      console.log(`Stored data retrieved: ${storedData}`);
      let conversation;
      try {
        conversation = JSON.parse(storedData);
      } catch (parseError) {
        console.error(`Error parsing stored data: ${parseError.message}`);
        return this.createResponse("Failed to parse conversation data", 500);
      }

      // Ensure that we handle the new conversation format correctly
      if (Array.isArray(conversation)) {
        conversation.push({ message, timestamp: new Date().toISOString(), hostId });
      } else if (conversation.conversation) {
        conversation.conversation.push({ message, timestamp: new Date().toISOString(), hostId });
      } else {
        console.error('Unexpected data format for conversation:', conversation);
        return this.createResponse("Unexpected data format for conversation", 500);
      }

      console.log(`Updated conversation: ${JSON.stringify(conversation)}`);

      // Store the updated conversation in the original key
      try {
        await this.env.VENDOR_CONVERSATIONS.put(userKey, JSON.stringify(conversation));
        console.log(`Updated conversation stored successfully for user key: ${userKey}`);
      } catch (putError) {
        console.error(`Error storing updated conversation: ${putError.message}`);
        return this.createResponse("Failed to store updated conversation", 500);
      }

      return this.createResponse("Reply added to conversation", 200);
    } catch (error) {
      console.error('Error replying to conversation:', error);
      return this.createResponse("Failed to reply to conversation", 500);
    }
  }

  async handleGetConversation(conversationId) {
    try {
      const storedData = await this.env.VENDOR_CONVERSATIONS.get(conversationId);

      if (!storedData) {
        console.error(`Conversation not found for ID: ${conversationId}`);
        return this.createResponse("Conversation not found", 404);
      }

      return this.createResponse(storedData, 200);
    } catch (error) {
      console.error('Error getting conversation:', error);
      return this.createResponse("Failed to get conversation", 500);
    }
  }

  async handleListConversations(channel) {
    try {
      // Retrieve all conversation IDs for a given channel (for hosts to see new requests)
      const list = await this.env.VENDOR_CONVERSATIONS.list({ prefix: `${channel}_` });
      const conversationIds = list.keys.map(key => key.name);

      return this.createResponse(JSON.stringify(conversationIds), 200);
    } catch (error) {
      console.error('Error listing conversations:', error);
      return this.createResponse("Failed to list conversations", 500);
    }
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
      "Access-Control-Allow-Origin": "*", // Ensure CORS header is included in all responses
      "Content-Type": "application/json",
    };
    return new Response(body, { status, headers });
  }
}

export { MyDurableObject };
