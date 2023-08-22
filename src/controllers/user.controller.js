const { UserService } = require("../services");

const userService = new UserService();

class UserController {
  async createUser(req, res, next) {
    try {
      const { username, password, image } = req.body;
      const user = await userService.createUser({
        username,
        password,
        image,
      });
      res.status(201).json({ message: "Succes create user!", userId: user.id });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await userService.login({ username, password });
      res.status(200).json({ user, message: "Login Success" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
