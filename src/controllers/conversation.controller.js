const { ConversationService } = require("../services");

const conversationService = new ConversationService();

class ConversationController {
  async create(req, res, next) {
    try {
      const { membersId } = req.body;
      const conversationId = await conversationService.create(membersId);
      res.status(201).json({
        conversationId,
        message: "Successfully create a conversation",
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const { memberId } = req.params;
      const conversations = await conversationService.getConversations(
        Number(memberId)
      );
      res.status(200).json({ conversations });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ConversationController;
