const { prisma } = require("../configs");
const APIError = require("../utils/APIError");

class ChatService {
  constructor() {
    this.chat = prisma.chat;
  }

  async create({ text, senderId, conversationId }) {
    try {
      const chat = await this.chat.create({
        data: { text, userId: senderId, conversationId },
      });
      return chat;
    } catch (error) {
      throw new APIError(500, "Internal Server Error");
    }
  }

  async getChats(conversationId) {
    try {
      const chats = await this.chat.findMany({
        where: { conversationId },
      });

      return chats;
    } catch (error) {
      throw new APIError(500, "Internal Server Error");
    }
  }
}

module.exports = ChatService;
