
const { createCanvas, loadImage } = require('canvas');
const { Image } = require('canvas')


const {drawText,
    drawImage,
    drawContours,
    downloadImage,
    getCoordinates,
    sortCoordinates,
} = require("./CVServices");






const mergeTemplateBackground =  (template, background) => {


var tempImg = new Image();
tempImg.onload = () => {}; 
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



  let buffer1 = screen1canvas.toBuffer('image/png');
  let buffer2 = screen2canvas.toBuffer('image/png').toString('base64');
  return {"backgroundWithContours":buffer1,"background":buffer2,"sortedCoordinates": sortedCoordinates};

  
}


module.exports = {mergeTemplateBackground};