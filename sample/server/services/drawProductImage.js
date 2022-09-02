const {
  drawText,
  drawImage,
  drawContours,
  downloadImage,
  getCoordinates,
  sortCoordinates,
  subBlockCoordinates,
  roundedRect,
  newItemRect,
  drawLine,
} = require("./CVServices");
const {
  heightValidation,
  widthValidation,
  wrapValidation,
} = require("./ValidationService");
const { uiJsonConverter } = require("./JSONConverter");
const { createCanvas, Image } = require("canvas");
const GIFEncoder = require("gifencoder");
const fs = require("fs");
const { set } = require("mongoose");

const drawProductImage = (background, imagedict, coordinateData) => {
  let imageData = [];
  let ids = new Set();
  for (var i = 0; i < imagedict.length; i++) {
    var imgBlockId = imagedict[i].block_id.split("_")[0];
    if (!ids.has(imgBlockId)) {
      ids.add(imgBlockId);
      var info = {};
      info.block_id = imgBlockId;
      info.imgInfo = [];
      imageData.push(info);
    }
  }

  for (var i = 0; i < imagedict.length; i++) {
    var imgBlockId = imagedict[i].block_id.split("_")[0];
    for (var j = 0; j < imageData.length; j++) {
      if (parseInt(imageData[j].block_id) === parseInt(imgBlockId)) {
        imageData[j].imgInfo.push(imagedict[i].imageInfo);
      }
    }
  }
  let maxImages = 0;
  for (var i = 0; i < imageData.length; i++) {
  
    if (maxImages < imageData[i].imgInfo.length) {
      maxImages = imageData[i].imgInfo.length;
    }
  }

  let finalImagesArray = [];
  for (var index = 0; index < maxImages; index++) {
    let bgImg = new Image();
    bgImg.onload = () => {};
    bgImg.src = background.data;
    let screen1canvas = createCanvas(
      parseInt(bgImg.width),
      parseInt(bgImg.height)
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
      let reqiredImageIndex;
      if (index >= imageData[i].imgInfo.length) {
        reqiredImageIndex =
          imageData[i].imgInfo.length -
          ((index + 1) % imageData[i].imgInfo.length) -
          1;
      } else {
        reqiredImageIndex = index;
      }

      let itemImgInfo = imageData[i].imgInfo[reqiredImageIndex];
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
    let buffer = screen1canvas.toBuffer("image/png").toString("base64");
    finalImagesArray.push(buffer);
  }

  return finalImagesArray;
};
module.exports = drawProductImage;
