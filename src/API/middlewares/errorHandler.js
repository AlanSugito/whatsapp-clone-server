const APIError = require("../../utils/APIError");

module.exports = (err, req, res, next) => {
  if (err) {
    console.log(err);
    if (err instanceof APIError) {
      res.status(err.status).json({ message: err.message });
      return;
    }

    return res
      .status(500)
      .json({ message: "Ooopss!! Something wrong in the server🥺" });
  }

  next();
};
