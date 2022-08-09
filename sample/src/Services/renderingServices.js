import { utimes } from "fs";
import cv from "opencv.js";
import { drawContours, drawText, reSize } from "./CVServices";
import { drawImage } from "./CVServices";
import { matrixToImgData } from "./CVServices";


export function renderJSON(canvas,screen, data, background, coordinates) {
    background = reSize(background, 3840, 2560, cv);
    console.log(background.size().width
        , background.size().height);
    drawImage(screen, matrixToImgData(background), { x: 0, y: 0 });
    
   
}
