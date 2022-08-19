require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose")

const app = express();


app.disable('x-powered-by');
app.use(express.json([]));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



const connection = mongoose
    .connect(
        process.env.MONGODB_URL,
        {
            useNewUrlParser: true
        }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.log(error));

app.listen(8000, function () {
    console.log("server running on port 8000");
  });