const  cv = require('./opencv.js')
//const template = require("../data/templates/screen2.png")
//const background = require("../data/templates/Meals-food Background.jpg")
const { createCanvas, loadImage } = require('canvas');
const { Image } = require('canvas')
const fs = require('fs');
var FileAPI = require('file-api')
  , File = FileAPI.File
  , FileList = FileAPI.FileList
  , FileReader = FileAPI.FileReader
  ;

const {Blob} = require('node:buffer');
const {drawText,
    drawImage,
    drawContours,
    downloadImage,
    getCoordinates,
    sortCoordinates,
} = require("./CVServices");
//const async = require('async');

const blobToImage =async  (blob,img) => {
  return new Promise(resolve => {
    const url = URL.createObjectURL(blob)
    //let img = new Image()
    img.onload = () => {
      console.log(url);
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.src = url
  })
}




const mergeTemplateBackground = async (tempImg, background) => {
  //console.log(template,background);


//   let tempImg = Object.keys(template).map(function (key) {
         
//     return template[key];
// });
console.log(tempImg.data);
var img = new Image();
img.onload = () => console.log(img.width, img.height)
img.src = tempImg.data;


// var reader = new FileReader();
// console.log("------------------------");
// console.log(tempImg);
// let datauri = reader.readAsDataURL(tempImg.fileImage);
// console.log("daturi  "+datauri);

// let img = new Image();
console.log("ji");
//tempImg = new Uint8Array(tempImg);
// let blob = new Blob([tempImg.data], { type: 'image/png' } /* (1) */);
// console.log(blob);
//const url = URL.createObjectURL(blob)
//console.log(url);
//img.src = url;
// img.src = URL.createObjectURL(

//   new Blob([tempImg.buffer], { type: 'image/png' } /* (1) */)
// );
//img = loadImage(tempImg);
//console.log(img.width, img.height);

console.log("agya");
//let iimg = await blobToImage(blob,img);
//console.log(iimg)


// let imgX = await loadImage(tempImg);
// console.log("LOG:::::::");
// try{
//   console.log("hi im in blob");
//   console.log(image.width, image.height);
//   screen1canvas= createCanvas(image.width, image.height);
//   screen1ctx = screen1canvas.getContext("2d");
//   screen1ctx.drawImage(image, 0, 0, image.width, image.height)
//   templateMat = cv.imread(image);
// } catch {
//   console.error("Error in file");
//}

// let screen1canvas;
// let screen1ctx;
// let templateMat;
// console.log("ji");

// await loadImage(img).then(image => {
//     console.log("hi im in blob");
//     console.log(image.width, image.height);
//     screen1canvas= createCanvas(image.width, image.height);
//     screen1ctx = screen1canvas.getContext("2d");
//     screen1ctx.drawImage(image, 0, 0, image.width, image.height)
//     templateMat = cv.imread(image);
// })


    // let templateImg = new Image();
    // templateImg.src = template;
    // await loadImage(templateImg);
    // let screen1canvas;
    // let templateMat;
    // let screen1ctx = screen1canvas.getContext("2d");
    // await loadImage(template).then(image => {
    //   console.log(image.width, image.height);
    //   screen1canvas= createCanvas(image.width, image.height);
    //   screen1ctx = screen1canvas.getContext("2d");
    //   screen1ctx.drawImage(image, 0, 0, image.width, image.height)
    //   templateMat = cv.imread(image);

    // })


    // let url = URL.createObjectURL(
    //   new Blob([template.buffer], { type: 'image/png' } /* (1) */)
    // );
    // let templateImg = new Image();
    // // templateImg.src = template;
    // await loadImage(url).then(image => {
    //   console.log(image.width, image.height);
    //   screen1canvas= createCanvas(image.width, image.height);
    //   screen1ctx = screen1canvas.getContext("2d");
    //   screen1ctx.drawImage(image, 0, 0, image.width, image.height)
    //   templateMat = cv.imread(image);

    // })

    // //let screen1canvas= createCanvas(templateImg.width,templateImg.height);
    // // let screen1canvas = new OffscreenCanvas(
    // //   templateImg.width,
    // //   templateImg.height
    // // );
    // //let screen1ctx = screen1canvas.getContext("2d");
    // //let templateMat = cv.imread(templateImg);
    // let sortedCoordinates = sortCoordinates(getCoordinates(templateMat, cv));
  
    // let bgImg = new Image();
    // bgImg.src = background;
    // await loadImage(bgImg);
    // drawImage(screen1ctx, bgImg, {
    //   x: 0,
    //   y: 0,
    //   w: templateImg.width,
    //   h: templateImg.height,
    // });
    // sortedCoordinates.forEach((e) => {
    //   drawContours(e, cv, screen1ctx);
    // });
  
  
    // let screen2canvas = new OffscreenCanvas(
    //   templateImg.width,
    //   templateImg.height
    // );
    // let screen2ctx = screen2canvas.getContext("2d");
    // let bg2Img = new Image();
    // bg2Img.src = background;
    // await loadImage(bg2Img);
    // drawImage(screen2ctx, bg2Img, {
    //   x: 0,
    //   y: 0,
    //   w: templateImg.width,
    //   h: templateImg.height,
    // });
    // screen2ctx.save();
  
  
    // screen1ctx.fillStyle = "#000000";
    // screen1ctx.save();
    // sortedCoordinates.forEach((e) => {
    //   drawText(
    //     screen1ctx,
    //     e["block_id"],
    //     {
    //       x: parseInt(e.x) + 10,
    //       y: parseInt(e.y) + 90,
    //     },
    //     "80px Arial"
    //   );
    // });
  
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