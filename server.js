const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = require("./app");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// connect database

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "onwave",
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    var query =
      "CREATE TABLE IF NOT EXISTS users(ID INT NOT NULL AUTO_INCREMENT,email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL, password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL, type VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL, active TINYINT DEFAULT 1, PRIMARY KEY (ID))";
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("connected");
      }
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`click Fit server is runnig on port ${port}`);
});
