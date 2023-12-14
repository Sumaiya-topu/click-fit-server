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

//add procedure
connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    var addUser = `CREATE PROCEDURE IF NOT EXISTS addUser(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_type VARCHAR(255)
)
BEGIN
    INSERT INTO users (email, password, type) VALUES (p_email, p_password, p_type);
END  `;
    connection.query(addUser, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Add user stored procedure created");
      }
    });
  }
});

// add user endpoint
app.post("/add-user", async (req, res) => {
  const { email, password, type } = req.body;
  console.log("req.body", req.body);
  connection.query(
    "Call addUser(?,?,?)",
    [email, password, type],
    (err, result) => {
      if (err) {
        console.error("Error calling addUser stored procedure:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(200).json({ message: "User added successfully" });
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`click Fit server is runnig on port ${port}`);
});
