
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


const mergeTemplateBackground = async (template, background) => {
    let templateImg = new Image();
    templateImg.src = template;
    await loadImage(templateImg);
    let screen1canvas = new OffscreenCanvas(
      templateImg.width,
      templateImg.height
    );
    let screen1ctx = screen1canvas.getContext("2d");
    let templateMat = cv.imread(templateImg);
    let sortedCoordinates = sortCoordinates(getCoordinates(templateMat, cv));
  
    let bgImg = new Image();
    bgImg.src = background;
    await loadImage(bgImg);
    drawImage(screen1ctx, bgImg, {
      x: 0,
      y: 0,
      w: templateImg.width,
      h: templateImg.height,
    });
    sortedCoordinates.forEach((e) => {
      drawContours(e, cv, screen1ctx);
    });
  
  
    let screen2canvas = new OffscreenCanvas(
      templateImg.width,
      templateImg.height
    );
    let screen2ctx = screen2canvas.getContext("2d");
    let bg2Img = new Image();
    bg2Img.src = background;
    await loadImage(bg2Img);
    drawImage(screen2ctx, bg2Img, {
      x: 0,
      y: 0,
      w: templateImg.width,
      h: templateImg.height,
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
  
    let blob = await screen1canvas.convertToBlob();
    let arraybuffer = await blob.arrayBuffer();
    var uint8View = new Uint8Array(arraybuffer);
    blob = new Blob([uint8View], { type: "image/png" });
  
    let blob2 = await screen2canvas.convertToBlob();
    let arraybuffer2 = await blob2.arrayBuffer();
    var uint8View = new Uint8Array(arraybuffer2);
    blob2 = new Blob([uint8View], { type: "image/png" });
    // returning blob with contour drawn , blob2 witrhgout contour drawn,sorted coordinates
    return { blob, blob2, sortedCoordinates };
  }


  module.exports = mergeTemplateBackground;