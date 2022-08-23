const  cv = require('./opencv.js')
const { createCanvas, loadImage } = require('canvas');

const {drawText,
    drawImage,
    drawContours,
    downloadImage,
    getCoordinates,
    sortCoordinates,
} = require("./CVServices");


const mergeTemplateBackground = async (template, background) => {
  let tempImg = Object.keys(template).map(function (key) {
    return template[key];
  });
  let back = Object.keys(background).map(function (key) {
    return background[key];
  });
  console.log(tempImg);
    //console.log("hiiiiiiiiii")
    console.log(back);


    const content = new Uint8Array(tempImg);

    document.getElementById('my-img').src = URL.createObjectURL(
     new Blob([content.buffer], { type: 'image/png' } /* (1) */)
    );
 // console.log(template,background);
    // let templateImg = new Image();
    // templateImg.src = template;
    // await loadImage(templateImg);
    //let objectURL = URL.createObjectURL(template);

    ///////////
    // console.log("in merge")
    // console.log(template);
    // let screen1canvas;
    // let templateMat;
    // await loadImage(template).then(image => {
    //  // console.log(image.width, image.height);
    //   screen1canvas= createCanvas(image.width, image.height);

    //   screen1canvas.drawImage(image, 0, 0, image.width, image.height)
    //   templateMat = cv.imread(image);

    // })
    //////////////////////////

    //let screen1canvas= createCanvas(templateImg.width,templateImg.height);
    // let screen1canvas = new OffscreenCanvas(
    //   templateImg.width,
    //   templateImg.height
    // );
    // let screen1ctx = screen1canvas.getContext("2d");
    // //let templateMat = cv.imread(templateImg);
    // let sortedCoordinates = sortCoordinates(getCoordinates(templateMat, cv));
  
    let bgImg = new Image();
    bgImg.src = template;
    await loadImage(bgImg);
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