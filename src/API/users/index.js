const { Router } = require("express");
const { UserController } = require("../../controllers");

const userController = new UserController();
module.exports = () => {
  const router = Router();
  router.post("/create", userController.createUser);
  router.post("/login", userController.login);

  return router;
};
