import React from "react";
import screen1 from "../data/templates/screen1.png";
import screen2 from "../data/templates/screen2.png";
import { getCoordinates } from "../Services/CVServices";
import { sortCoordinates } from "../Services/CVServices";
import { createCoordinateJSON } from "../Services/JSONConverter";
import { drawText } from "../Services/CVServices";
import { drawContours } from "../Services/CVServices";

import cv from "opencv.js";

function Test() {
  function testFunction() {
    let screen1ctx ;
    let screen2ctx;
    let screen1Img = new Image();
    let screen2Img = new Image();
    screen1Img.onload = function () {
      let screen1canvas = new OffscreenCanvas(screen1Img.width,screen1Img.height);
      screen1ctx = screen1canvas.getContext("2d");
      let mat1 = cv.imread(screen1Img);
      let sortedCoordinates = sortCoordinates(getCoordinates(mat1, cv));
      sortedCoordinates.forEach((e) => {
        drawContours(e,cv,screen1ctx);
      });
     
      screen1ctx.fillStyle ="#FFFFFF";
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
      console.log(sortedCoordinates);

      document
      .getElementById("screen1")
      .getContext("bitmaprenderer")
      .transferFromImageBitmap( screen1canvas.transferToImageBitmap());
    };
    screen1Img.src = screen1;
    screen2Img.onload = function () {
      let screen2canvas = new OffscreenCanvas(screen2Img.width,screen2Img.height);
      screen2ctx = screen2canvas.getContext("2d");
      let mat2 = cv.imread(screen2Img);
      let sortedCoordinates = sortCoordinates(getCoordinates(mat2, cv));
      sortedCoordinates.forEach((e) => {
        drawContours(e,cv,screen2ctx);
      });
      screen2ctx.fillStyle ="#FFFFFF";
      screen2ctx.save();
      sortedCoordinates.forEach((e) => {
        drawText(
          screen2ctx,
          e["block_id"],
          {
            x: parseInt(e.x) + 10,
            y: parseInt(e.y) + 90,
          },
          "80px Arial"
        );
      });
      console.log(sortedCoordinates);
      document
      .getElementById("screen2")
      .getContext("bitmaprenderer")
      .transferFromImageBitmap(screen2canvas.transferToImageBitmap());
    };
    screen2Img.src = screen2;

    
   
  }

  return (
    <div>
      <button onClick={testFunction}>Test</button>
      <br />
      <br />
      <canvas id="screen1"></canvas>
      <br />
      <br />
      <canvas id="screen2"></canvas>
    </div>
  );
}

export default Test;
