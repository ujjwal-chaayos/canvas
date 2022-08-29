
const { drawText,
  drawImage,
  drawContours,
  downloadImage,
  getCoordinates,
  sortCoordinates,
  subBlockCoordinates,
  roundedRect,
  newItemRect,
  drawLine } = require("./CVServices");

const {
  heightValidation,
  widthValidation,
  wrapValidation
} = require("./ValidationService");


const { uiJsonConverter } = require("./JSONConverter")
// const data = require("../data/schema/screen2.json")
// const newIcon = require("../data/background/New icon.svg")
// const nonvegIcon = require("../data/background/Non veg icon.svg")
// const vegIcon = require("../data/background/veg icon.svg")

// const menu = require("../data/Menus/menu.json");
const { createCanvas,Image } = require('canvas');



const drawProductImage =  (background, imageData, coordinateData) => {
  let bgImg = new Image();
  bgImg.onload = ()=>{};
  bgImg.src = background.data;
 
  
  let screen1canvas = createCanvas(parseInt(bgImg.width), parseInt(bgImg.height));
  let screen1ctx = screen1canvas.getContext("2d");
 drawImage(screen1ctx, bgImg, {
    x: 0,
    y: 0,
    w: bgImg.width,
    h: bgImg.height,
  });

  for (var i = 0; i < imageData.length; i++) {
    let imgBlockId = imageData[i].block_id.split('_')[0];
    // let itemImgInfo = imageData[i].image_info.imageBlob;
    if (parseInt(imageData[i].block_id.split('_')[1]) === 0) {
      let itemImgInfo = imageData[i].imageInfo;
      let productImg = new Image();
      productImg.onload = ()=>{};
      productImg.src = itemImgInfo;
      for (var j = 0; j < coordinateData.length; j++) {
        let coordinateBlockId = coordinateData[j].block_id;
        if (parseInt(imgBlockId) === parseInt(coordinateBlockId)) {
          let points = {};
          points.x = coordinateData[j].x;
          points.y = coordinateData[j].y;
          points.w = coordinateData[j].w;
          points.h = coordinateData[j].h;
          console.log(imgBlockId,coordinateBlockId);
          drawImage(screen1ctx, productImg, points);
          screen1ctx.save();


        }
      }
    }
  }
  let buffer1 = screen1canvas.toBuffer('image/png').toString('base64');

  return { "ImageWithProducts": buffer1 };

}


module.exports = drawProductImage;