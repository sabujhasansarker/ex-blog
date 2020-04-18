const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: (req, file, cb) => {
    const types = /jpeg|jpg|png|gif/;
    const extName = types.test(path.extname(file.originalname).toLowerCase());
    const mimeType = types.test(file.mimetype);
    console.log(mimeType);
    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only support Image"));
    }
  },
});

module.exports = uploads;
