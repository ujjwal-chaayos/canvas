// import React from "react";
// import screen1 from "../data/templates/screen1.png";
// import screen2 from "../data/templates/screen2.png";
// import menu from "../data/Menus/menu.json";
// import refrenceTemplate from "../data/coordinate/test.json";
// import { getCoordinates } from "../Services/CVServices";
// import { sortCoordinates } from "../Services/CVServices";
// import { createCoordinateJSON } from "../Services/JSONConverter";
// import { drawText } from "../Services/CVServices";
// import { drawContours } from "../Services/CVServices";
// import { jsonConverter } from "../Services/JSONConverter";

// import cv from "opencv.js";

// function Test() {
//   function testFunction() {
//     // let screen1ctx ;
//     // let screen2ctx;
//     // let screen1Img = new Image();
//     // let screen2Img = new Image();
//     // screen1Img.onload = function () {
//     //   let screen1canvas = new OffscreenCanvas(screen1Img.width,screen1Img.height);
//     //   screen1ctx = screen1canvas.getContext("2d");
//     //   let mat1 = cv.imread(screen1Img);
//     //   let sortedCoordinates = sortCoordinates(getCoordinates(mat1, cv));
//     //   sortedCoordinates.forEach((e) => {
//     //     drawContours(e,cv,screen1ctx);
//     //   });
     
//     //   screen1ctx.fillStyle ="#000000";
//     //   screen1ctx.save();
//     //   sortedCoordinates.forEach((e) => {
//     //     drawText(
//     //       screen1ctx,
//     //       e["block_id"],
//     //       {
//     //         x: parseInt(e.x) + 10,
//     //         y: parseInt(e.y) + 90,
//     //       },
//     //       "80px Arial"
//     //     );
//     //   });
//     //   let imageBlocks = [];
//     //   let txtBlocks = [];
//     //   for(let i=0;i<sortedCoordinates.length;i++){
//     //     if(i==1){
//     //       sortedCoordinates[i]["type"]="Image";
//     //       imageBlocks.push(sortedCoordinates[i]);
//     //     }else{
//     //       sortedCoordinates[i]["type"]="Text";
//     //       txtBlocks.push(sortedCoordinates[i]);
//     //     }
//     //   }
//     //   let json = createCoordinateJSON("1","screen1",imageBlocks,txtBlocks,{h1:200});
//     //   json["sub_blocks"].forEach((e) => {
//     //     drawText(
//     //       screen1ctx,
//     //       e["block_id"],
//     //       {
//     //         x: parseInt(e.x) + 10,
//     //         y: parseInt(e.y) + 90,
//     //       },
//     //       "80px Arial"
//     //     );
//     //   });
//     //   console.log(json);

//     //   document
//     //   .getElementById("screen1")
//     //   .getContext("bitmaprenderer")
//     //   .transferFromImageBitmap( screen1canvas.transferToImageBitmap());
//     // };
//     // screen1Img.src = screen1;
//     // screen2Img.onload = function () {
//     //   let screen2canvas = new OffscreenCanvas(screen2Img.width,screen2Img.height);
//     //   screen2ctx = screen2canvas.getContext("2d");
//     //   let mat2 = cv.imread(screen2Img);
//     //   let sortedCoordinates = sortCoordinates(getCoordinates(mat2, cv));
//     //   sortedCoordinates.forEach((e) => {
//     //     drawContours(e,cv,screen2ctx);
//     //   });
//     //   screen2ctx.fillStyle ="#000000";
//     //   screen2ctx.save();
//     //   sortedCoordinates.forEach((e) => {
//     //     drawText(
//     //       screen2ctx,
//     //       e["block_id"],
//     //       {
//     //         x: parseInt(e.x) + 10,
//     //         y: parseInt(e.y) + 90,
//     //       },
//     //       "80px Arial"
//     //     );
//     //   });
//     //   let imageBlocks = [];
//     //   let txtBlocks = [];
//     //   for(let i=0;i<sortedCoordinates.length;i++){
//     //     if(i==2||i==5||i==3||i==7||i==8){
//     //       sortedCoordinates[i]["type"]="Image";
//     //       imageBlocks.push(sortedCoordinates[i]);
//     //     }else{
//     //       sortedCoordinates[i]["type"]="Text";
//     //       txtBlocks.push(sortedCoordinates[i]);
//     //     }
//     //   }
//     //   let json = createCoordinateJSON("2","screen2",imageBlocks,txtBlocks,{h1:160});
//     //   json["sub_blocks"].forEach((e) => {
//     //     drawText(
//     //       screen2ctx,
//     //       e["block_id"],
//     //       {
//     //         x: parseInt(e.x) + 10,
//     //         y: parseInt(e.y) + 90,
//     //       },
//     //       "80px Arial"
//     //     );
//     //   });
//     //   console.log(json);
//     //   document
//     //   .getElementById("screen2")
//     //   .getContext("bitmaprenderer")
//     //   .transferFromImageBitmap(screen2canvas.transferToImageBitmap());
//     // };
//     // screen2Img.src = screen2;

//     console.log(jsonConverter(menu,refrenceTemplate,{ h1: "160", h2: "56", style: "Helvetica, Arial, sans-serif", spacing: "5"}));
   
//   }

//   return (
//     <div>
//       <button onClick={testFunction}>Test</button>
//       <br />
//       <br />
//       <canvas id="screen1"></canvas>
//       <br />
//       <br />
//       <canvas id="screen2"></canvas>
//     </div>
//   );
// }

// export default Test;