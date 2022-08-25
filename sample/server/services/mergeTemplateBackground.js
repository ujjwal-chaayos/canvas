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




const mergeTemplateBackground = (template, background) => {
  //console.log(template,background);
console.log("hi hello");

var tempImg = new Image();
tempImg.onload = () => {}; // console.log(img.width, img.height)
tempImg.src = template.data;
let screen1canvas= createCanvas(tempImg.width, tempImg.height);
let screen1ctx = screen1canvas.getContext("2d");
let templateMat = cv.imread(tempImg);
let sortedCoordinates1 = sortCoordinates(getCoordinates(templateMat, cv));

let bgImg = new Image();
bgImg.onload = () => {};
bgImg.src = background.data;
drawImage(screen1ctx, bgImg,{
  x: 0,
  y: 0,
  w: tempImg.width,
  h: tempImg.height,
});
sortedCoordinates1.forEach((e) => {
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
sortedCoordinates1.forEach((e) => {
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
 let buffer1 = screen1canvas.toBuffer('image/png');
 let buffer2 = screen2canvas.toBuffer('image/png');
 return {"backgroundWithContours":buffer1,
          "background":buffer2,
          "sortedCoordinates":sortedCoordinates1};

  }


  module.exports = {mergeTemplateBackground};