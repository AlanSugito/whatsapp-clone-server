const { ChatService } = require("../services");

const chatService = new ChatService();

class ChatController {
  async getChats(req, res, next) {
    try {
      const { conversationId } = req.params;
      const chats = await chatService.getChats(conversationId);
      res.status(200).json({ chats });
    } catch (error) {
      next(error);
    }
  }

  async createChat(req, res, next) {
    try {
      const { text, conversationId, senderId } = req.body;
      const chatId = await chatService.create({
        text,
        conversationId,
        senderId,
      });
      res.status(201).json({ chatId });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ChatController;
