const { diskStorage } = require("multer");

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profile_pictures");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
    req.body.image = filename;
  },
});

module.exports = storage;
