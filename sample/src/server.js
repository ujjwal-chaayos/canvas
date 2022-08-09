const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const database = require("./db.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8000, function () {
    console.log("server running on port 8000");
    database.connect();
  });