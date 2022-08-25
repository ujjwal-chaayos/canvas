// const  cv = require('./opencv.js')
//const template = require("../data/templates/screen2.png")
//const background = require("../data/templates/Meals-food Background.jpg")
const { createCanvas, loadImage } = require('canvas');
const { Image } = require('canvas')
//const fs = require('fs');
// var FileAPI = require('file-api')
//   , File = FileAPI.File
//   , FileList = FileAPI.FileList
//   , FileReader = FileAPI.FileReader
//   ;

//const {Blob} = require('node:buffer');
const {drawText,
    drawImage,
    drawContours,
    downloadImage,
    getCoordinates,
    sortCoordinates,
} = require("./CVServices");
//const async = require('async');

// const blobToImage =async  (blob,img) => {
//   return new Promise(resolve => {
//     const url = URL.createObjectURL(blob)
//     //let img = new Image()
//     img.onload = () => {
//       console.log(url);
//       URL.revokeObjectURL(url)
//       resolve(img)
//     }
//     img.src = url
//   })
// }




const mergeTemplateBackground = async (template, background) => {
  //console.log(template,background);
console.log("hi hello");

var tempImg = new Image();
tempImg.onload = () => {}; // console.log(img.width, img.height)
tempImg.src = template.data;
let screen1canvas= createCanvas(tempImg.width, tempImg.height);
let screen1ctx = screen1canvas.getContext("2d");
let templateMat = cv.imread(tempImg);
let sortedCoordinates = sortCoordinates(getCoordinates(templateMat, cv));

let bgImg = new Image();
bgImg.onload = () => {};
bgImg.src = background.data;
drawImage(screen1ctx, bgImg,{
  x: 0,
  y: 0,
  w: tempImg.width,
  h: tempImg.height,
});
sortedCoordinates.forEach((e) => {
  drawContours(e, cv, screen1ctx);
});


let screen2canvas = createCanvas(tempImg.width, tempImg.height);
let screen2ctx = screen2canvas.getContext("2d");
let bg2Img = new Image();
bg2Img.onload = () => {};
bg2Img.src = background.data;
drawImage(screen2ctx, bg2Img, {
  x: 0,
  y: 0,
  w: tempImg.width,
  h: tempImg.height,
});
screen2ctx.save();
console.log("hi in funtion");
console.log(screen2canvas.toBuffer('image/png'));

screen1ctx.fillStyle = "#000000";
screen1ctx.save();
sortedCoordinates.forEach((e) => {
  drawText(
    screen1ctx,
    e["block_id"],
    {
      x: parseInt(e.x) + 10,
      y: parseInt(e.y) + 90,
    },
    "80px Arial"
  );
});

////////////////////////////////////////////////////////////////////////////////////////////////
    // let blob = await screen1canvas.convertToBlob();
    // let arraybuffer = await blob.arrayBuffer();
    // var uint8View = new Uint8Array(arraybuffer);
    // blob = new Blob([uint8View], { type: "image/png" });
  
    // let blob2 = await screen2canvas.convertToBlob();
    // let arraybuffer2 = await blob2.arrayBuffer();
    // var uint8View = new Uint8Array(arraybuffer2);
    // blob2 = new Blob([uint8View], { type: "image/png" });
    // // returning blob with contour drawn , blob2 witrhgout contour drawn,sorted coordinates
    // return { blob, blob2, sortedCoordinates };
  }


  module.exports = {mergeTemplateBackground};