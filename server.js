const express = require("express");
const cors = require("cors");
const app = require("./app");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`click Fit server is runnig on port ${port}`);
});
