import cv from "opencv.js";
import { reSize } from "./CVServices";
import { drawImage } from "./CVServices";
import { matrixToImgData } from "./CVServices";


export function renderJSON(data,background,coordinates){
    background = reSize(background,3840,2160,cv);
    console.log(background.size().width
        ,background.size().height  );
    let canvas = new OffscreenCanvas(background.size().width
    ,background.size().height);
    let screen  = canvas.getContext("2d");
    drawImage(screen,matrixToImgData(background),{x:0,y:0});
    
    
    
    
    coordinates = coordinates.templates[1];
   let imageArray = data.images.image;
   let imageCoordinate = coordinates.image_blocks;
    for(var i=0;i<imageCoordinate.length;i++){
        let block_id = imageCoordinate[i]["block_id"];
        for(var j=0;j<imageArray.length;j++){
            if(imageArray[j]["block_id"]==block_id){
                let img = new Image();
                img.crossOrigin = "Anonymous";
                img.onload = function(){ 

                    let mat = cv.imread(img);

                    mat = reSize(mat, imageCoordinate[i].w, imageCoordinate[i].h,cv);
                    drawImage(screen,matrixToImgData(mat),imageCoordinate[i]);

                };
                img.src = imageArray[j]["imgURL"];
            }
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    return canvas.transferToImageBitmap();

}