import React from "react";
import img1 from "../assets/img1.png";
import img4 from "../assets/img4.png";

import cv from "opencv.js";

function Test() {
  function findCoordinates(blocks, cv, showCountours) {
    cv.cvtColor(blocks, blocks, cv.COLOR_RGBA2GRAY); //convert color , source , destination , color ( cv.ColorConversionCodes) ,  number of channels in the destination image; if
    cv.threshold(blocks, blocks, 120, 200, cv.THRESH_BINARY); //source,destination,threshold,max value, mode , only works on single channel (B/W)
    let contours = new cv.MatVector(); //empty vector to store countours
    let hierarchy = new cv.Mat();
    //object to be found should be white and background should be black
    cv.findContours(
      blocks,
      contours,
      hierarchy,
      cv.RETR_CCOMP,
      cv.CHAIN_APPROX_SIMPLE
    ); //source,contours, , retrieval mode,approximation method
    
    if (showCountours) {
      let dst = blocks.clone();
      drawCoordinates(dst, contours, cv, hierarchy);
    }
    const points = [];
    for (let i = 0; i < contours.size(); ++i) {
      const ci = contours.get(i);
     
      let rect = cv.boundingRect(ci); //Bounding Rectangle
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
        new cv.Scalar(255, 0, 0),
        2,
        cv.LINE_8,
        hierarchy,
        100
      );
    }
    cv.imshow("contours", dst);
    dst.delete();
  }

  function sampleFunction() {
   
    let img = new Image();
    img.src = img1;
    let blocks = cv.imread(img); //read image from canvas or image tag or image tag id or image object
    
    let points = findCoordinates(blocks, cv, false);
    console.log(points);
    
  }
  const download_img = () => {
    let el = document.getElementById("download"); //anchor element
    let canvas = document.getElementById("output"); //canvas element
    let imageURI = canvas.toDataURL("image/png"); //generates data url for downloading
    el.href = imageURI;
  };
  return (
    <div>
      <h1>Co ordinates</h1>
      <img id="Input" src={img1} alt="input" />
      <h1>Template</h1>
      <img
        alt="template"
        id="template"
        src={img4}
        style={{ width: "910px", height: "520px" }}
      />
      <h1>Sample</h1>

      <br />
      <br />
      <button onClick={sampleFunction}>Test</button>
      <br />
      <br />
      <h1>Contours</h1>
      <canvas id="contours"></canvas>
      <br />
      <br />
      <h1>Output</h1>
      <canvas id="output"></canvas>
      <br />
      <br />
      <button id="download" download="myImage.png" onClick={download_img}>
        Download to myImage.jpg
      </button>
    </div>
  );
}
export default Test;
