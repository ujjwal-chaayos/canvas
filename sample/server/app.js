require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const menu = require("./routes/menu")

const app = express();


app.disable('x-powered-by');
app.use(express.json([]));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(menu);

function loadOpenCV() {
    return new Promise(resolve => {
      global.Module = {
        onRuntimeInitialized: resolve
      };
      global.cv = require('./services/opencv.js');
      console.log("cv object created");
    });
  }


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
    loadOpenCV();
    console.log("server running on port 8000");
  });