import React from "react";
import menu from '../data/Menus/menu.json';
import refferenceTemplate from '../data/coordinate/templates.json';
import { jsonConverter } from "../Services/JSONConverter.js";
import { drawitem, drawtitle, renderJSON } from "../Services/renderingServices";
import data from '../data/schema/sampleScreen2.json';
import coordinates from '../data/coordinate/templates.json';
import background from '../data/background/Meals-food Background.jpg';
import { draw } from "../Services/renderingServices";
import cv from "opencv.js";

function Test() {
  function testFunction() {

    let bgImg = new Image();
    let canvas = new OffscreenCanvas(3840,2560);
    let screen  = canvas.getContext("2d");
    bgImg.onload = function() {

      renderJSON(canvas,screen,data,cv.imread(bgImg),coordinates);
      console.log("2");
      drawtitle(canvas,screen,data,coordinates);
      console.log("4");
      drawitem(screen,data,coordinates);

      document.getElementById("output").getContext("bitmaprenderer").transferFromImageBitmap(canvas.transferToImageBitmap());

     };
    bgImg.src =background; 
    //draw(screen,data,coordinates);

    
  }

  return (
    <div>
      <button onClick={testFunction}>Test</button>
      <canvas id = "output"></canvas>
    </div>
  );
}

export default Test;
