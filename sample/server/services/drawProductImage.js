
const cv = require("opencv.js");

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

const loadImage = async (img) => {
  return new Promise((resolve, reject) => {
    img.onload = async () => {
      resolve(true);
    };
  });
};

const drawProductImage = async (background, imageData, coordinateData) => {
    //console.log(background,imageData,coordinateData)
    let bgImg = new Image();
    bgImg.src = background;
    await loadImage(bgImg);
    let screen1canvas = new OffscreenCanvas(
      bgImg.width,
      bgImg.height
    );
    let screen1ctx = screen1canvas.getContext("2d");
  
    drawImage(screen1ctx, bgImg, {
      x: 0,
      y: 0,
      w: bgImg.width,
      h: bgImg.height,
    });
  
    for (var i = 0; i < imageData.length; i++) {
      let imgBlockId = imageData[i].block_id;
      let itemImgInfo = imageData[i].image_info.imageBlob;
      let productImg = new Image();
      productImg.src = itemImgInfo;
      await loadImage(productImg);
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
  
    let blob = await screen1canvas.convertToBlob();
    let arraybuffer = await blob.arrayBuffer();
    var uint8View = new Uint8Array(arraybuffer);
    blob = new Blob([uint8View], { type: "image/png" });
    console.log("i m in image " + blob);
    return { blob };
  
  }


  module.exports = drawProductImage;