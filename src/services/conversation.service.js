const { prisma } = require("../configs");
const APIError = require("../utils/APIError");

class ConversationService {
  constructor() {
    this.conversation = prisma.conversation;
  }

  async create(membersId) {
    try {
      const conversation = await this.conversation.create({
        data: {
          members: { connect: [{ id: membersId[0] }, { id: membersId[1] }] },
        },
        select: { id: true },
      });

      return conversation;
    } catch (error) {
      console.log(error);
      throw new APIError(500, "Internal Server Error");
    }
  }

  async getConversations(memberId) {
    try {
      const conversations = await this.conversation.findMany({
        where: { members: { some: { id: memberId } } },
        include: {
          members: { select: { id: true, username: true, image: true } },
        },
      });

      if (!conversations) throw new APIError(404, "Conversation not found");

      return conversations;
    } catch (error) {
      console.log(error);
      if (error instanceof APIError) {
        throw new APIError(error.status, error.message);
      }
      throw new APIError(500, "Internal Server Error");
    }
  }
}

module.exports = ConversationService;
