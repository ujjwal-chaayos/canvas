import React from "react";
import menu from '../data/Menus/menu.json';
import refferenceTemplate from '../data/coordinate/templates.json';
import { jsonConverter } from "../Services/JSONConverter.js";
import { drawItem, renderJSON } from "../Services/renderingServices";
import data from '../data/schema/screen2.json';
import coordinates from '../data/coordinate/test.json';
import background from '../data/background/Meals-food Background.jpg';
import { drawTitle } from "../Services/renderingServices";
import cv from "opencv.js";

function Test() {

  const canvas = new OffscreenCanvas(3840, 2160);
  const screen = canvas.getContext("2d");

   async function testFunction() {
    await renderJSON(screen,data,background,coordinates);
    await drawTitle(screen,data,coordinates);
    await drawItem(screen,data,coordinates);


    let imageBitMap = canvas.transferToImageBitmap(); 
      document.getElementById("output").getContext("bitmaprenderer").transferFromImageBitmap(imageBitMap);
  }

  return (
    <div>
      <button onClick={testFunction}>Testing</button>
      <br/>
      <br/>
      <br/>
      <canvas id = "output"></canvas>
      
      
    </div>
  );
}

export default Test;
