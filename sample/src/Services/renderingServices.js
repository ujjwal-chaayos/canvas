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
    console.log("1");
    
   
}
export function drawtitle(canvas,screen, data, coordinates)
{
    coordinates = coordinates.templates[1];
    let imageArray = data.images.image;
    let imageCoordinate = coordinates.image_blocks;
    /*
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
     */
    let titleArray = data.titles.title;
    let titleCoordinate = coordinates.sub_blocks;

    for (var i = 0; i < titleArray.length; i++) {
        var titleText = titleArray[i].value;
        var block_id = titleArray[i].block_id;

        for (var j = 0; j < titleCoordinate.length; j++) {
        
            if (titleCoordinate[j].parent_block_id === block_id && titleCoordinate[j].type === "Heading") {
                drawContours(titleCoordinate[j],cv,screen);
                var x = titleCoordinate[j].x + Math.floor((titleCoordinate[j].w - (screen.measureText(titleText).width))/2);
                var y = titleCoordinate[j].y + (titleCoordinate[j].h - 40);
                var points = {};
                points.x = x;
                points.y = y;

                screen.fillStyle = "#0e5c04";
                let style = "bold 96px Helvetica, Arial, sans-serif";
                drawText(screen, titleText, points, style);
                console.log("hi");
            }
        }
    
    }
    console.log("3");
}

export function drawitem(screen, data, coordinates){
    coordinates = coordinates.templates[1];
    var itemArray = data.items;
    let itemCoordinates = coordinates.sub_blocks;
    for(var i=0;i<itemArray.length;i++){
        var block_id = itemArray[i].block_id;
        var items = itemArray[i].item;
        for(var j=0;j < itemCoordinates.length ;j++){
            

            if (itemCoordinates[j].parent_block_id === block_id && itemCoordinates[j].type === "Items"){
                let style = "bold 50px Helvetica, Arial, sans-serif";
                drawContours(itemCoordinates[j],cv,screen);
                screen.fillStyle = "#916704";
                var x = itemCoordinates[j].x+20;
                var y = itemCoordinates[j].y;
                for(var k = 0;k<items.length;k++){
                    var text = items[k].value;
                    var y = y+50+5;
                    var points={};
                    points.x = x;
                    points.y = y;
                    drawText(screen,text,points,style);
                }



            }
        }
    }

}

