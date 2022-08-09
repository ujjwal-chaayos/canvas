import React from "react";
import menu from '../data/Menus/menu.json';
import refferenceTemplate from '../data/coordinate/templates.json';
import { jsonConverter } from "../Services/JSONConverter.js";
import { drawTitle, renderJSON } from "../Services/renderingServices";
import data from '../data/schema/screen2.json';
import coordinates from '../data/coordinate/test.json';
import background from '../data/background/Meals-food Background.jpg';
import cv from "opencv.js";

function Test() {


  const canvas = new OffscreenCanvas(3840, 2160);
  const screen = canvas.getContext("2d");

   async function testFunction() {
      
      await renderJSON(canvas,screen,data,background,coordinates); 
      await drawTitle(canvas,screen,data,coordinates);
      let imageBitMap = canvas.transferToImageBitmap();
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
