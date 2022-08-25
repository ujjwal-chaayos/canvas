const { createCanvas, loadImage } = require('canvas');
const { Image } = require('canvas')
const {drawText,
    drawImage,
    drawContours,
    downloadImage,
    getCoordinates,
    sortCoordinates,
} = require("./CVServices");





const mergeTemplateBackground = async (tempImg, background) => {
 
var img = new Image();

 img.onload = () => {}; 
img.src = tempImg.data;

let screen1canvas= createCanvas(img.width, img.height);
let screen1ctx = screen1canvas.getContext("2d");
screen1ctx.drawImage(img, 0, 0, img.width, img.height)
let templateMat = cv.imread(img);
console.log(templateMat.size());
let sortedCoordinates = sortCoordinates(getCoordinates(templateMat, cv));
console.log(sortedCoordinates);

}


  module.exports = {mergeTemplateBackground};