const { Router } = require("express");
const { ConversationController } = require("../../controllers");

const conversationController = new ConversationController();

module.exports = () => {
  const router = Router();
  router.post("/", conversationController.create);

  router.get("/:memberId", conversationController.get);

  return router;
};
