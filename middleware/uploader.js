const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "upload_images/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /\.(jpg|jpeg|png|PNG)$/;
    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg/jpeg file"));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = uploader;
