
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
const GIFEncoder = require('gifencoder');

const fs = require('fs');
const { set } = require("mongoose");
const drawItemText = require("./drawItemText");


// const drawProductImage =  (background, imageData, coordinateData) => {

//   let imageArray = [];
  


//   let bgImg = new Image();
//   bgImg.onload = ()=>{};
//   bgImg.src = background.data;
 
//   const encoder = new GIFEncoder(bgImg.width, bgImg.height);
// // stream the results as they are available into myanimated.gif
// encoder.createReadStream().pipe(fs.createWriteStream('./data/myanimated.gif'));
// encoder.start();
// encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
// encoder.setDelay(500);  // frame delay in ms
// encoder.setQuality(10); // image quality. 10 is default.
  
//   let screen1canvas = createCanvas(parseInt(bgImg.width), parseInt(bgImg.height));
//   let screen1ctx = screen1canvas.getContext("2d");
//  drawImage(screen1ctx, bgImg, {
//     x: 0,
//     y: 0,
//     w: bgImg.width,
//     h: bgImg.height,
//   });

//   let h = 0;
//   let coordinate=[];
//   for (var i = 0; i < imageData.length; i++) {
//     let imgBlockId = imageData[i].block_id.split('_')[0];
//     if (parseInt(imageData[i].block_id.split('_')[1]) === 0) {
//       let itemImgInfo = imageData[i].imageInfo;
//       let productImg = new Image();
//       productImg.onload = ()=>{};
//       productImg.src = itemImgInfo;
//       for (var j = 0; j < coordinateData.length; j++) {
//         let coordinateBlockId = coordinateData[j].block_id;
//         if (parseInt(imgBlockId) === parseInt(coordinateBlockId)) {
//           let points = {};
//           points.x = coordinateData[j].x;
//           points.y = coordinateData[j].y;
//           points.w = coordinateData[j].w;
//           points.h = coordinateData[j].h;
//           let arr = [];
//           for (var k = 0; k < imageData.length; k++) {
//             if( parseInt(imageData[k].block_id.split('_')[0])===parseInt(imgBlockId) ){
//               let img = new Image();
//               img.onload = ()=>{};
//               img.src = imageData[k].imageInfo;
//               arr.push(img);
//             }
//           }
//           h=Math.max(h,arr.length);
//           coordinate.push({
//             pointData:points,
//             image:arr,
//             len:arr.length
//           });
//           console.log(imgBlockId,coordinateBlockId);
//           drawImage(screen1ctx, productImg, points);
//           screen1ctx.save();
         
//         }
//       }
//     }
//   }
//   encoder.addFrame(screen1ctx);
//   for (var i = 0; i < h; i++) {
//     for (var j = 0; j < coordinate.length; j++) {
//       let len =  coordinate[j].len;
//       drawImage(screen1ctx, coordinate[j].image[i%len], coordinate[j].pointData);
//       screen1ctx.save();
//     }
//     encoder.addFrame(screen1ctx);
//     console.log(i);
//   }
// console.log("finished");
  

//   // for (var i = 0; i < imageData.length; i++) {
//   //   let imgBlockId = imageData[i].block_id.split('_')[0];
//   //   // let itemImgInfo = imageData[i].image_info.imageBlob;
//   //   if (parseInt(imageData[i].block_id.split('_')[1]) === 0) {
//   //     let itemImgInfo = imageData[i].imageInfo;
//   //     let productImg = new Image();
//   //     productImg.onload = ()=>{};
//   //     productImg.src = itemImgInfo;
//   //     for (var j = 0; j < coordinateData.length; j++) {
//   //       let coordinateBlockId = coordinateData[j].block_id;
//   //       if (parseInt(imgBlockId) === parseInt(coordinateBlockId)) {
//   //         let points = {};
//   //         points.x = coordinateData[j].x;
//   //         points.y = coordinateData[j].y;
//   //         points.w = coordinateData[j].w;
//   //         points.h = coordinateData[j].h;
//   //         console.log(imgBlockId,coordinateBlockId);
//   //         drawImage(screen1ctx, productImg, points);
//   //         screen1ctx.save();


//   //       }
//   //     }
//   //   }
//   // }
//   let buffer1 = screen1canvas.toBuffer('image/png').toString('base64');
//   encoder.finish();
//   return { "ImageWithProducts": buffer1 };

// }


const drawProductImage = async  (background, imagedict, coordinateData) => {
  let imageData = [];
  let ids = new Set();
  for(var i=0;i<imagedict.length;i++){
    var imgBlockId = imagedict[i].block_id.split('_')[0];
    if(!ids.has(imgBlockId)){
      ids.add(imgBlockId);
      var info = {};
      info.block_id = imgBlockId;
      info.imgInfo = [];
      imageData.push(info);
    }
    
  }

  //console.log(imageData.length)
  //console.log(imageData[0].block_id)
  for(var i=0;i<imagedict.length;i++){
    var imgBlockId = imagedict[i].block_id.split('_')[0];
    for(var j=0;j<imageData.length;j++){
      if(parseInt(imageData[j].block_id) === parseInt(imgBlockId) ){
        imageData[j].imgInfo.push(imagedict[i].imageInfo)
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
    bgImg.onload = ()=>{};
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
        reqiredImageIndex = imageData[i].imgInfo.length - ((index + 1) % imageData[i].imgInfo.length) - 1;
      }
      else {
        reqiredImageIndex = index;
      }
      //let reqiredImageIndex = index % imageData[i].image_info.length;
      let itemImgInfo = imageData[i].imgInfo[reqiredImageIndex];
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
          drawImage(screen1ctx, productImg, points);
          screen1ctx.save();
        }
      }
    }
    //let buffer = screen1canvas.toBuffer('image/png').toString('base64');
    let buffer = screen1canvas.toBuffer('image/png');

    finalImagesArray.push(buffer);
  }
  //console.log(finalImagesArray.length);
  //console.log(finalImagesArray[0]);
  let dummy_data = [
    { title_id: "t1", value: "CHAAT PAKORE", block_id: "1" },
    { title_id: "t2", value: "SNACKS", block_id: "2" },
    { title_id: "t3", value: "SANDWICHES", block_id: "5" },
    { title_id: "t4", value: "DESSERTS", block_id: "7" },
    { title_id: "t5", value: "MEALS", block_id: "10" },
  ];
  console.log("drawing item text");
  await drawItemText(finalImagesArray,dummy_data,coordinateData);
  console.log("finished drawing item text");
  return finalImagesArray;



}

module.exports = drawProductImage;





// export async function CreateGifImage(background, imageData, coordinateData) {

//   let maxImages = 0;
//   for (var i = 0; i < imageData.length; i++) {
//     if (maxImages < imageData[i].imgInfo.length) {
//       maxImages = imageData[i].imgInfo.length;
//     }
//   }
//   let finalImagesArray = [];
//   for (var index = 0; index < maxImages; index++) {
//     let bgImg = new Image();
//     bgImg.src = background;
//     await loadImage(bgImg);
//     let screen1canvas = new OffscreenCanvas(
//       bgImg.width,
//       bgImg.height
//     );
//     let screen1ctx = screen1canvas.getContext("2d");

//     drawImage(screen1ctx, bgImg, {
//       x: 0,
//       y: 0,
//       w: bgImg.width,
//       h: bgImg.height,
//     });
//     for (var i = 0; i < imageData.length; i++) {
//       let imgBlockId = imageData[i].block_id;
//       let reqiredImageIndex;
//       if (index >= imageData[i].image_info.length) {
//         reqiredImageIndex = imageData[i].image_info.length - ((index + 1) % imageData[i].image_info.length) - 1;
//       }
//       else {
//         reqiredImageIndex = index;
//       }
//       //let reqiredImageIndex = index % imageData[i].image_info.length;
//       let itemImgInfo = imageData[i].image_info[reqiredImageIndex].blob;
//       let productImg = new Image();
//       productImg.src = itemImgInfo;
//       await loadImage(productImg);
//       for (var j = 0; j < coordinateData.length; j++) {
//         let coordinateBlockId = coordinateData[j].block_id;
//         if (parseInt(imgBlockId) === parseInt(coordinateBlockId)) {
//           let points = {};
//           points.x = coordinateData[j].x;
//           points.y = coordinateData[j].y;
//           points.w = coordinateData[j].w;
//           points.h = coordinateData[j].h;
//           drawImage(screen1ctx, productImg, points);
//           screen1ctx.save();
//         }
//       }
//     }
//     let blob = await screen1canvas.convertToBlob();
//     let arraybuffer = await blob.arrayBuffer();
//     var uint8View = new Uint8Array(arraybuffer);
//     blob = new Blob([uint8View], { type: "image/png" });
//     finalImagesArray.push(blob);
//   }
//   return finalImagesArray;
// }