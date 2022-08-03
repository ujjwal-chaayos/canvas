import React from "react";
import img1 from "../assets/f34.png";
import cafeData from '../assets/dataused.json';
import cv from "opencv.js";
import { useState,useEffect } from "react";
function Test() {
  const images = [img1];
  useEffect(() => {
    images.forEach(imageUrl => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []);
  function findCoordinates(blocks, cv, showCountours) {
    cv.cvtColor(blocks, blocks, cv.COLOR_RGBA2GRAY);
    cv.threshold(blocks, blocks, 120, 200, cv.THRESH_BINARY);
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(
      blocks,
      contours,
      hierarchy,
      cv.RETR_CCOMP,
      cv.CHAIN_APPROX_SIMPLE
    );
    if (showCountours) {
      let dst = blocks.clone();
      drawCoordinates(dst, contours, cv, hierarchy);
    }
    const points = [];
    for (let i = 0; i < contours.size(); ++i) {
      const ci = contours.get(i);
      let rect = cv.boundingRect(ci);
      let p = {};
      p.x = rect.x;
      p.y = rect.y;
      p.x1 = rect.x + rect.width;
      p.y1 = rect.y + rect.height;
      points.push(p);
    }
    return points;
  }
  function drawCoordinates(dst, contours, cv, hierarchy) {
    for (let i = 0; i < contours.size(); ++i) {
           cv.drawContours(
        dst,
        contours,
        i,
        new cv.Scalar(255, 0,0),
        2,
        cv.LINE_8,
        hierarchy,
        100
      );
    }
    cv.imshow("contours", dst);
    dst.delete();
  }
function renderText(template,ctx,cafeData,cv){
  // for (let k = 1; k < points.length; k++) {
  //     ctx.font = "80px Georgia";
  //     ctx.fillStyle = "#FFFFFF";
  //     ctx.fillText(k, points[k].x+500, points[k].y+500);
  //     ctx.save();
  // }
  // return res;
  for (let i = 1; i < 16; i++) {
   let obj =  cafeData[0]['prefrence'+i];
   if(obj['type']==='Heading'){
    var width = parseInt(obj['x1'])-parseInt(obj['x']);
    ctx.font = "Bold 500px  Arial";
    ctx.fillStyle = "#AB8E3E";
    var txt = obj['title'];
    var offshiftWidth =Math.floor((width-(ctx.measureText(txt).width))/2);
    var offshiftHeight= parseInt(obj['y1'])-10;
    ctx.fillText(txt,parseInt(obj['x'])+offshiftWidth , offshiftHeight);
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.moveTo(parseInt(obj['x'])+offshiftWidth , offshiftHeight+40);
    ctx.lineTo(parseInt(obj['x'])+offshiftWidth+Math.floor(ctx.measureText(txt).width), offshiftHeight+40);
    ctx.strokeStyle = "#AB8E3E";
    ctx.stroke();
    ctx.save();
   }else if(obj['type']==='List'){
    ctx.font = "200px  Arial";
    var startx =parseInt(obj['x'])+50;
    var starty =parseInt(obj['y'])+50;
    var pstartx =parseInt(obj['priceId']['x'])+50;
    var pstarty =parseInt(obj['priceId']['y'])+50;
    var offshiftHeight = starty;
    var poffshiftHeight = pstarty;
    for (var key in obj['products']) {
       offshiftHeight = offshiftHeight+220;
       poffshiftHeight = poffshiftHeight+220;
        var name = obj['products'][key]['name'];
        var price = obj['products'][key]['price'];
        ctx.fillStyle = "#AB8E3E";
        ctx.save();
        ctx.fillText(name,startx, offshiftHeight);
        ctx.fillStyle = "#AB8E3E";
        ctx.save();
        ctx.fillText(price,pstartx , poffshiftHeight);
        ctx.save();
    }
   }else if (obj['type']==='Img'){
    let myImage = new Image();
    myImage.crossOrigin = "Anonymous";
    let point ={
      "x":obj['x'],
      "y":obj['y'],
      "x1":obj['x1'],
      "y1":obj['y1']
    };
     myImage.onload = function() {
      let mat = cv.imread(myImage);
      drawImageFromMat(ctx,mat,point);
      //ctx.drawImage(myImage, point['x'], point['y'], parseInt(point['x1'])-parseInt(point['x']), parseInt(point['y1'])-parseInt(point['y']));
    };
    myImage.src =obj['link'] ;
   }
  }
}
function drawImageFromMat(ctx,mat,point) {
  let tmp = new cv.Mat();
  let width = parseInt(point['x1'])-parseInt(point['x']);
  let height = parseInt(point['y1'])-parseInt(point['y']);
  let dsize = new cv.Size(width, height);
  if((width*height)<(mat.size().width*mat.size().height))
  cv.resize(mat, tmp, dsize, 0, 0, cv.INTER_AREA);
  else
  cv.resize(mat, tmp, dsize, 0, 0, cv.INTER_LINEAR);
  var img = new cv.Mat;
  var depth = tmp.type() % 8;
  var scale = depth <= cv.CV_8S ? 1 : depth <= cv.CV_32S ? 1 / 256 : 255;
  var shift = depth === cv.CV_8S || depth === cv.CV_16S ? 128 : 0;
  tmp.convertTo(img, cv.CV_8U, scale, shift);
  switch (img.type()) {
      case cv.CV_8UC1:
          cv.cvtColor(img, img, cv.COLOR_GRAY2RGBA);
          break;
      case cv.CV_8UC3:
          cv.cvtColor(img, img, cv.COLOR_RGB2RGBA);
          break;
      case cv.CV_8UC4:
          break;
      default:
          throw new Error("Bad number of channels (Source image must have 1, 3 or 4 channels)");
          return
  }
  var imgData = new ImageData(new Uint8ClampedArray(img.data), img.cols, img.rows);
  ctx.putImageData(imgData, point['x'], point['y']);
  img.delete();
ctx.save();
}
function overlayImage(dst,src,cv,point){
  let tmp = new cv.Mat();
  let width = parseInt(point['x1'])-parseInt(point['x']);
  let height = parseInt(point['y1'])-parseInt(point['y']);
  let dsize = new cv.Size(width, height);
  if((width*height)<(src.size().width*src.size().height))
  cv.resize(src, tmp, dsize, 0, 0, cv.INTER_AREA);
  else
  cv.resize(src, tmp, dsize, 0, 0, cv.INTER_LINEAR);
  let b=0;
  for (let j = parseInt(point['x']); j <parseInt(point['x1']); j += 1) {
    let a=0;
    for (let i = parseInt(point['y']); i <parseInt(point['y1']); i += 1) {
      dst.ucharPtr(i, j)[0] =tmp.ucharPtr(a,b)[0];
      dst.ucharPtr(i, j)[1] = tmp.ucharPtr(a,b)[1];
      dst.ucharPtr(i, j)[2] = tmp.ucharPtr(a,b)[2];
      a++;
    }
    b++;
  }
  return dst;
}
function drawCanvas() {
//   var x = document.createElement("CANVAS");
// x.setAttribute("width","550");
// x.setAttribute("height","550");
//   var ctx = x.getContext("2d");
//     ctx.font = "20px Georgia";
//     ctx.fillText("Hello World!", 10, 50);
//   return  cv.imread(x);
}
  function sampleFunction(){
    let img = new Image();
    img.onload = function(){
      let blocks = cv.imread(img);
      let template = new cv.Mat(blocks.rows, blocks.cols, cv.CV_8UC3, new cv.Scalar(255,255,255));
      blocks.delete();
      var ctx = document.getElementById("output").getContext("2d");
      cv.imshow("output",template);
      let res = renderText(template,ctx,cafeData,cv);
      alert('Menu Generated');
    };
    img.src = img1;
    
  };
  const download_img = () => {
    let el = document.getElementById("download"); //anchor element
    let canvas = document.getElementById("output"); //canvas element
    let imageURI = canvas.toDataURL("image/png"); //generates data url for downloading
    el.href = imageURI;
  };
  return (
    <div>
      <button onClick={sampleFunction}>Test</button>
      <br />
      <br />
      <a id="download" download="myImage.png" href="" onClick={download_img}>
        Download to myImage.jpg
      </a>
      <br />
      <br />
      <h1>Output</h1>
      <canvas id="output"></canvas>
      

    </div>
  );
}
export default Test;