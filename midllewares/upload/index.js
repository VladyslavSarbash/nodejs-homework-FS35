const multer = require("multer");
const path = require("path");
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fontSize: 1000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }

    cb(new Error("Wrong file type!"));
  },
});

module.exports = { upload };
