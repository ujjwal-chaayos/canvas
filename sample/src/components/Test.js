// import React from "react";
// import img1 from "../assets/img6.png";
// import img4 from "../assets/img4.png";
// import cv from "opencv.js";
// function Test() {
//   function findCoordinates(blocks, cv, showCountours) {
//     cv.cvtColor(blocks, blocks, cv.COLOR_RGBA2GRAY); //convert color , source , destination , color ( cv.ColorConversionCodes) ,  number of channels in the destination image; if
//     cv.threshold(blocks, blocks, 120, 200, cv.THRESH_BINARY); //source,destination,threshold,max value, mode , only works on single channel (B/W)
//     let contours = new cv.MatVector(); //empty vector to store countours
//     let hierarchy = new cv.Mat();
//     //object to be found should be white and background should be black
//     cv.findContours(
//       blocks,
//       contours,
//       hierarchy,
//       cv.RETR_CCOMP,
//       cv.CHAIN_APPROX_SIMPLE
//     ); //source,contours, , retrieval mode,approximation method
//     //dst =
//     if (showCountours) {
//       //let dst = cv.Mat.zeros(blocks.rows, blocks.cols,cv.CV_8UC3);//make matrix filled with 0s as a 8 bit unsigned int and chanel = 3 (rgb)
//       let dst = blocks.clone();
//       drawCoordinates(dst, contours, cv, hierarchy);
//     }
//     const points = [];
//     for (let i = 0; i < contours.size(); ++i) {
//       const ci = contours.get(i);
//       let tmp = new cv.Mat();
//       /*approximates a contour shape to another shape with less number of vertices depending upon the precision we specify
//         input vector of 2D points stored in cv.Mat,
//         result of the approximation. The type should match the type of the input curve,
//         parameter specifying the approximation accuracy. maximum distance between the original curve and its approximation,
//         If true, the approximated curve is closed (its first and last vertices are connected).
//          */
//       //cv.approxPolyDP(ci, tmp, 0.01 * cv.arcLength(ci, true), true);//not neccessary when using  CHAIN_APPROX_SIMPLE
//       let rect = cv.boundingRect(ci); //Bounding Rectangle
//       let p = {};
//       p.x = rect.x;
//       p.y = rect.y;
//       p.x1 = rect.x + rect.width;
//       p.y1 = rect.y + rect.height;
//       points.push(p);
//     }
//     //src.delete();
//     return points;
//   }
//   function drawCoordinates(dst, contours, cv, hierarchy) {
//     for (let i = 0; i < contours.size(); ++i) {
//       // let color = new cv.Scalar(
//       //   Math.round(Math.random() * 255),
//       //   Math.round(Math.random() * 255),
//       //   Math.round(Math.random() * 255)
//       // ); //for random colors...
//       /*destination,countours , parameter indicating a contour to draw. If it is negative, all the contours are drawn.,color,thickness, cv.LineTypes,optional information about hierarchy,maximal level for drawn contours. If it is 0, only the specified contour is drawn. If it is 1, the function draws the contour(s) and all the nested contours. If it is 2, the function draws the contours, all the nested contours, all the nested-to-nested contours, and so on. This parameter is only taken into account when there is hierarchy available.,optional contour shift parameter.*/
//       cv.drawContours(
//         dst,
//         contours,
//         i,
//         new cv.Scalar(255, 255,255),
//         2,
//         cv.LINE_8,
//         hierarchy,
//         100
//       );
//     }
//     cv.imshow("contours", dst);
//     dst.delete();
//   }
// function renderTemplate(res,template,points){
//   //console.log(points);
//   for (let k = 1; k < points.length; k++) {
//     for (let j = points[k].x; j <= points[k].x1; j += 1) {
//       for (let i = points[k].y; i <= points[k].y1; i += 1) {
//         let r = template.ucharPtr(i, j)[0];
//         let g = template.ucharPtr(i, j)[1];
//         let b = template.ucharPtr(i, j)[2];
//         let a = template.ucharPtr(i, j)[3];
//         // if (r == 255 && g == 255 && b == 255) {
//         //   res.ucharPtr(i, j)[3] = 0;
//         // }
//         res.ucharPtr(i, j)[0] = r;
//         res.ucharPtr(i, j)[1] = g;
//         res.ucharPtr(i, j)[2] = b;
//         //  if(r==255&&g==255&&b==255){
//         //   res.ucharPtr(i,j)[3] =255 ;
//         //   dst.ucharPtr(i,j)[3] =255 ;
//         //  }
//         // res.ucharPtr(i,j)[3] = 100;//opacity
//       }
//     }
//   }
//   return res;
// }
//   function sampleFunction(){
//     //let test = cv.Mat.zeros(src.rows, src.cols, cv.CV_32F);
//     //let test = cv.imread(document.getElementById("template")); //reading from image tag
//     let img = new Image();
//     img.src = img1;
//     let blocks = cv.imread(img); //read image from canvas or image tag or image tag id or image object
//     let img2 = new Image();
//     img2.src = img4;
//     let template = cv.imread(img2);
//     let points = findCoordinates(blocks, cv, true);
//     let res =new cv.Mat(blocks.rows, blocks.cols, cv.CV_8UC3, new cv.Scalar(255,255,255));//rows,columns,channel,colour
//     res = renderTemplate(res,template,points);
//     cv.imshow("output", res);
//     template.delete();
//     blocks.delete();
//   };
//   const download_img = () => {
//     let el = document.getElementById("download"); //anchor element
//     let canvas = document.getElementById("canvasOutput"); //canvas element
//     let imageURI = canvas.toDataURL("image/jpg"); //generates data url for downloading
//     el.href = imageURI;
//   };
//   return (
//     <div>
//       <h1>Co ordinates</h1>
//       <img id="Input" src={img1} />
//       <h1>Template</h1>
//       <img
//         id="template"
//         src={img4}
//         style={{ width: "910px", height: "520px" }}
//       />
//       <br />
//       <br />
//       <button onClick={sampleFunction}>Test</button>
//       <br />
//       <br />
//       <h1>Contours</h1>
//       <canvas id="contours"></canvas>
//       <br />
//       <br />
//       <h1>Output</h1>
//       <canvas id="output"></canvas>
//       <br />
//       <br />
//       <a id="download" download="myImage.jpg" href="" onClick={download_img}>
//         Download to myImage.jpg
//       </a>
//     </div>
//   );
// }
// export default Test;