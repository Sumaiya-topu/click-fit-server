const express = require("express");
const uploader = require("../middleware/uploader");

const router = express.Router();

const imageUploadController = require("../Controller/imageUpload.controller");

router.post(
  "/image-upload",
  uploader.single("image"),
  imageUploadController.imageUpload
);

module.exports = router;
