import React from "react";
import menu from '../data/Menus/menu.json';
import refferenceTemplate from '../data/coordinate/templates.json';
import { jsonConverter } from "../Services/JSONConverter.js";
import { renderJSON } from "../Services/renderingServices";
import data from '../data/schema/sampleScreen2.json';
import coordinates from '../data/coordinate/templates.json';
import background from '../data/background/Meals-food Background.jpg';
import cv from "opencv.js";

function Test() {
  function testFunction() {

    let bgImg = new Image();
    bgImg.onload = function() {


      let imageBitMap = renderJSON(data,cv.imread(bgImg),coordinates);

      document.getElementById("output").getContext("bitmaprenderer").transferFromImageBitmap(imageBitMap);

     };
    bgImg.src =background; 


    
  }

  return (
    <div>
      <button onClick={testFunction}>Test</button>
      <canvas id = "output"></canvas>
    </div>
  );
}

export default Test;
