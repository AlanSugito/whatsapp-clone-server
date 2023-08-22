const { prisma } = require("../configs");
const APIError = require("../utils/APIError");
const { encrypt, verify } = require("../utils/hashing");

class UserService {
  constructor() {
    this.user = prisma.user;
  }

  async createUser({ username, password, image = null }) {
    try {
      const encryptedPassword = await encrypt(password);
      const user = await this.user.create({
        data: {
          username,
          image: image ? image : "no_profile.png",
          password: encryptedPassword,
        },
      });

      return user;
    } catch (error) {
      throw new APIError(500, "Internal Server Error");
    }
  }

  async login({ username, password }) {
    try {
      const user = await this.user.findFirst({ where: { username } });
      if (!user) throw new APIError(403, "Invalid User");
      const passwordValid = await verify(password, user.password);
      if (!passwordValid) throw new APIError(403, "Password doesn't match");
      return { id: user.id, username: user.username, image: user.image };
    } catch (error) {
      if (error instanceof APIError) {
        throw new APIError(error.status, error.message);
      }

      throw new APIError(500, "Internal Server Error");
    }
  }
}

module.exports = UserService;
