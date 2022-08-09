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




   async function testFunction() {
      let imageBitMap = await renderJSON(data,background,coordinates);   
      document.getElementById("output").getContext("bitmaprenderer").transferFromImageBitmap(imageBitMap);
  }

  return (
    <div>
      <button onClick={testFunction}>Test</button>
      <br/>
      <br/>
      <br/>
      <canvas id = "output"></canvas>
      
      
    </div>
  );
}

export default Test;
