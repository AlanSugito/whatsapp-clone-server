const bcrypt = require("bcrypt");

module.exports.encrypt = async (password) => {
  const SALT_ROUNDS = 10;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const encryptedPassword = await bcrypt.hash(password, salt);

  return encryptedPassword;
};

module.exports.verify = async (password, encryptedPassword) => {
  const result = await bcrypt.compare(password, encryptedPassword);

  return result;
};
