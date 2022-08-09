import cv from "opencv.js";
import { reSize } from "./CVServices";
import { drawImage } from "./CVServices";
import { matrixToImgData } from "./CVServices";
import { drawContours } from "./CVServices";
import img0 from '../data/Product image/0.png'
import img1 from '../data/Product image/1.png'
import img2 from '../data/Product image/2.png'
import img3 from '../data/Product image/3.png'
import img4 from '../data/Product image/4.png'

const loadImage = async img => {
    return new Promise((resolve, reject) => {
        img.onload = async () => {
            resolve(true);
        };
    });
};


export async function renderJSON(data,background,coordinates){
    const im = [img0,img1,img2,img3,img4];
    let canvas = new OffscreenCanvas(3840,2160);
    let screen  = canvas.getContext("2d");
    let bgImg = new Image();
    bgImg.src =background; 
    await loadImage(bgImg);
    drawImage(screen,bgImg,{x:0,y:0,w:3840,h:2160});
        
    coordinates = coordinates.templates[1];
   let imageArray = data.images.image;
   let imageCoordinate = coordinates.image_blocks;
    for(var i=0;i<imageCoordinate.length;i++){
        let block_id = imageCoordinate[i]["block_id"];
        for(var j=0;j<imageArray.length;j++){
            if(imageArray[j]["block_id"]==block_id){
                let img = new Image();
               
                let point =  imageCoordinate[i];
                img.src = im[j];
                      
                      await loadImage(img);
                      drawImage(screen,img,point);
                    
                      
            }
        }
    }
    
    console.log("returning");
    return canvas.transferToImageBitmap();

}