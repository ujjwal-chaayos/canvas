import React from "react";
import menu from '../data/Menus/menu.json';
import refferenceTemplate from '../data/coordinate/templates.json';
import { jsonConverter } from "../Services/JSONConverter.js";
import cv from "opencv.js";

function Test() {
  function testFunction() {
   
  }

  return (
    <div>
      <button onClick={testFunction}>Test</button>
      
    </div>
  );
}

export default Test;
