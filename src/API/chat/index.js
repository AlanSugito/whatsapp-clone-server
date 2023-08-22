const { Router } = require("express");
const { ChatController } = require("../../controllers");

const chatController = new ChatController();

module.exports = () => {
  const router = Router();
  router.post("/", chatController.createChat);
  router.get("/:conversationId", chatController.getChats);

  return router;
};
