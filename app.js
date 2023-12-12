const express = require("express");
const app = express();
const cors = require("cors");

const imageUploadRoutes = require("./Routes/imageUpload.routes");

app.use(express.json());
app.use(cors());
app.use(express.static("image"));

app.use("/api/v1/upload", imageUploadRoutes);

app.get("/", (req, res) => {
  res.send("click-fit image upload server");
});

module.exports = app;
