
const {drawText,
    drawImage,
    drawContours,
    downloadImage,
    getCoordinates,
    sortCoordinates,
    subBlockCoordinates,
    roundedRect,
    newItemRect,
    drawLine} = require("./CVServices");

const {
    heightValidation,
    widthValidation,
    wrapValidation
} = require("./ValidationService");


const {uiJsonConverter} = require("./JSONConverter")
const data = require("../data/schema/screen2.json")
const newIcon = require("../data/background/New icon.svg")
const nonvegIcon = require("../data/background/Non veg icon.svg")
const vegIcon = require("../data/background/veg icon.svg")

const menu = require("../data/Menus/menu.json");
const { createCanvas } = require('canvas');



const drawProductImage =  (background, imageData, coordinateData) => {
    //console.log(background,imageData,coordinateData)
    let bgImg = new Image();
    bgImg.onload = () => {};
    bgImg.src = background.data;
    await loadImage(bgImg);
    let screen1canvas = createCanvas(bgImg.width,bgImg.height);
    let screen1ctx = screen1canvas.getContext("2d");
  
    drawImage(screen1ctx, bgImg, {
      x: 0,
      y: 0,
      w: bgImg.width,
      h: bgImg.height,
    });
  
    for (var i = 0; i < imageData.length; i++) {
      let imgBlockId = imageData[i].block_id;
     // let itemImgInfo = imageData[i].image_info.imageBlob;

      let itemImgInfo = imageData[i].imageInfo[0];
      let productImg = new Image();
      productImg.onload = () => {};
      productImg.src = itemImgInfo;
      for (var j = 0; j < coordinateData.length; j++) {
        let coordinateBlockId = coordinateData[j].block_id;
        if (parseInt(imgBlockId) === parseInt(coordinateBlockId)) {
          let points = {};
          points.x = coordinateData[j].x;
          points.y = coordinateData[j].y;
          points.w = coordinateData[j].w;
          points.h = coordinateData[j].h;
          drawImage(screen1ctx, productImg, points);
          screen1ctx.save();
  
  
        }
      }
    }
  
    let buffer1 = screen1canvas.toBuffer('image/png').toString('base64');

    return { "ImageWithProducts": buffer1 };
  
  }


  module.exports = drawProductImage;