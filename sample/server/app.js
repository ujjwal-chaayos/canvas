
console.log("hello world");
require("dotenv").config();
const { JSDOM } = require('jsdom');
const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const menu = require("./routes/menu")

const app = express();



app.disable('x-powered-by');
app.use(express.static("./public"))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(fileUpload());
app.use(cors());
app.use(menu);

function installDOM() {
  const dom = new JSDOM();
  global.document = dom.window.document;
  // The rest enables DOM image and canvas and is provided by node-canvas
  global.Image = Image;
  global.HTMLCanvasElement = Canvas;
  global.ImageData = ImageData;
  global.HTMLImageElement = Image;
}

function loadOpenCV() {
 
  return new Promise(resolve => {
    global.Module = {
      onRuntimeInitialized: resolve
    };
    global.cv = require('./services/opencv.js');
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

app.get("https://cafes.chaayos.com/oneIndiaBulls.jpg", (req, res)=>{
  console.log(res);
})

app.listen(8000, function () {
    installDOM();
    loadOpenCV();
    console.log("server running on port 8000");
  }); 

