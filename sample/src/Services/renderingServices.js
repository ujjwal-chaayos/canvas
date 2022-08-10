import cv from "opencv.js";
import { drawContours, drawText, newItemRect, roundedRect } from "./CVServices";
import { drawImage } from "./CVServices";
import { heightValidation } from "./ValidationService";
import { widthValidation } from "./ValidationService";
import img0 from "../data/Product image/0.png";
import img1 from "../data/Product image/1.png";
import img2 from "../data/Product image/2.png";
import img3 from "../data/Product image/3.png";
import img4 from "../data/Product image/4.png";
import newIcon from "../data/background/New icon.svg";
import vegIcon from "../data/background/veg icon.svg";
import nonvegIcon from "../data/background/Non veg icon.svg";

const loadImage = async (img) => {
    return new Promise((resolve, reject) => {
        img.onload = async () => {
            resolve(true);
        };
    });
};

export async function renderJSON(screen,data, background, coordinates) 
{
    const im = [img1, img0, img3, img4, img2];
   
    let bgImg = new Image();
    bgImg.src = background;
    await loadImage(bgImg);
    drawImage(screen, bgImg, { x: 0, y: 0, w: 3840, h: 2160 });

    coordinates = coordinates.templates[0];

    let imageArray = data.images;

    let imageCoordinate = coordinates.image_blocks;
    
    let c = 0;
    for (var i = 0; i < imageCoordinate.length; i++) 
    {
        let block_id = imageCoordinate[i]["block_id"];

        let img = new Image();

        let point = imageCoordinate[i];
        img.src = im[c];
        c++;
       
        await loadImage(img);
        console.log(point);
        drawImage(screen, img, point);
    }



   
console.log("returning");

}


export async function drawTitle(screen,data,coordinates){
    coordinates = coordinates.templates[0];
    let titleCoordinate = coordinates.sub_blocks;
  let titles = data.titles;
  let titleStyle = data.style;
  for (var i = 0; i < titleCoordinate.length; i++) {
    if (titleCoordinate[i].type === "Heading") {
     // drawContours(titleCoordinate[i],cv,screen);
      let id = titleCoordinate[i].parent_block_id;
      
      let titleText = titles[id.toString()].value;
      screen.fillStyle = titleStyle.color.Title;
      let style =
        titleStyle.weight.Title +" " + titleStyle.size.Title  +" " + titleStyle.font.Title ;
        screen.font = style;
        screen.save();
      var x =
        titleCoordinate[i].x +
        Math.floor(
          (titleCoordinate[i].w - screen.measureText(titleText).width)/2 
        );
      var y = titleCoordinate[i].y + (titleCoordinate[i].h - 40);
      var points = {};
      points.x = x;
      points.y = y;
     
      

      console.log(titleText);
      drawText(screen, titleText, points, style);
    
  }
}

}

export async function drawItem(screen,data,coordinates){
  coordinates = coordinates.templates[0];
  let itemCoordinates = coordinates.sub_blocks;
  let itemStyle = data.style;
  let items = data.items;
  let prices = data.prices;
  for (var i = 0; i < itemCoordinates.length; i++){
    if (itemCoordinates[i].type === "Items" ){
      //drawContours(itemCoordinates[i],cv,screen);
      let style = itemStyle.weight.Items + " " +itemStyle.size.Items +" "+ itemStyle.font.Items;
      var itemX = itemCoordinates[i].x+10;
      let itemY = itemCoordinates[i].y;
      let id= itemCoordinates[i].parent_block_id;
      let itemArray = items[id.toString()].item;
      let priceArray = prices[id.toString()].value;
      let priceX;
      let priceY;
      for(var k=0;k<itemCoordinates.length;k++){
        if(itemCoordinates[k].parent_block_id===id && itemCoordinates[k].type==="Prices"){

          priceX = itemCoordinates[k].x+5;
          priceY = itemCoordinates[k].y;
        }
      }
      ////////////////////////////////////////////////////////////////

      if (
        !heightValidation(itemCoordinates[i], itemArray, {
          height: "56",
          spacing: "5",
        })
      ) {
        console.log("height validation failed for block "+itemCoordinates[i].parent_block_id);
        //drawContours(itemCoordinates[i], cv, screen);
      }
      if (
        !widthValidation(itemCoordinates[i], itemArray, {
          height: itemStyle.font.Items,
          style: itemStyle.weight.Items + " " + itemStyle.font.Items,
        })
      ) {
        console.log("width validation failed for block "+itemCoordinates[i].parent_block_id);
        //drawContours(itemCoordinates[i], cv, screen);
      }

      ////////////////////////////////////////////////////////////////
      
      for(var k = 0;k<itemArray.length;k++){

        
        var text = itemArray[k].value;
        var item_id = itemArray[k].item_id;
        itemY = itemY+56+5;
        var points={};
        points.x = itemX;
        points.y = itemY;
        
        
        
        
        
        if(itemArray[k].active===false){
          var rectpoint = {};
          rectpoint.x = itemCoordinates[i].x-10;
          rectpoint.y = itemY-56;
          rectpoint.w = Math.ceil(itemCoordinates[i].w*(10/8))+10;
          rectpoint.h = 56+10;
          roundedRect(screen,rectpoint,20,"grey");
          screen.fillStyle = "Black";
        }
        else{ 
          screen.fillStyle = itemStyle.color.Items;

        }

        if(itemArray[k].new === true && itemArray[k].active){
          var rectpoint = {};
          rectpoint.x = itemCoordinates[i].x-10;
          rectpoint.y = itemY-56;
          rectpoint.w = Math.ceil(itemCoordinates[i].w*(10/8))+10;
          rectpoint.h = 56+10;
          newItemRect(screen,rectpoint,30,"yellow","orange");
          screen.fillStyle = itemStyle.color.New;     
        }
        else{
          if(itemArray[k].active)
          screen.fillStyle = itemStyle.color.Items;
        }
        
        
        //screen.fillStyle = itemStyle.color.Items;

        drawText(screen,text,points,style);
        for(var j =0;j<priceArray.length;j++){
          if(priceArray[j].item_id===item_id){
            let priceList = priceArray[j].value;
            if(priceList.length===1){
              let priceText = priceList[0].price.toString();
              priceY = priceY+56+5;
              var pricePoints = {};
              pricePoints.x = priceX;
              pricePoints.y = priceY;
              screen.fillStyle = itemStyle.color.Prices; 
              drawText(screen,priceText,pricePoints,style);
            }
            if(priceList.length>1){
              let priceText = priceList[0].price.toString();

              priceText = priceText + "|"+ priceList[1].price.toString();
              priceY = priceY+56+5;
              var pricePoints = {};
              pricePoints.x = priceX;
              pricePoints.y = priceY;
              screen.fillStyle = itemStyle.color.Prices;
              drawText(screen,priceText,pricePoints,style);
            }
            break;
          }
        }
        if(itemArray[k].icons==="VEG"){
          let vegicon = new Image();
          vegicon.src = vegIcon;
        await loadImage(vegicon);
        var iconpoint = {};
        iconpoint.x = itemX+Math.floor(screen.measureText(text).width)+10;
        iconpoint.y = itemY-Math.floor(screen.measureText(text).fontBoundingBoxAscent);
        iconpoint.w = Math.floor(screen.measureText(text).fontBoundingBoxAscent)+15;
        iconpoint.h = Math.floor(screen.measureText(text).fontBoundingBoxAscent)+15;
        console.log(screen.measureText(text));
        drawImage(screen, vegicon,iconpoint);
        }else if(itemArray[k].icons==="NON_VEG"){
          let nonvegicon = new Image();
          nonvegicon.src = nonvegIcon;
        await loadImage(nonvegicon);
        var iconpoint = {};
        iconpoint.x = itemX+Math.floor(screen.measureText(text).width)+10;
        iconpoint.y = itemY-Math.floor(screen.measureText(text).fontBoundingBoxAscent);
        iconpoint.w = Math.floor(screen.measureText(text).fontBoundingBoxAscent)+15;
        iconpoint.h = Math.floor(screen.measureText(text).fontBoundingBoxAscent)+15;
        console.log(screen.measureText(text));
        drawImage(screen, nonvegicon,iconpoint);
        }
        if(itemArray[k].new===true){
          let newicon = new Image();
          newicon.src = newIcon;
        await loadImage(newicon);
        var iconpoint = {};
        iconpoint.x =itemX+ Math.floor(screen.measureText(text).width)+180;
        iconpoint.y = itemY-Math.floor(screen.measureText(text).fontBoundingBoxAscent)-45;
        iconpoint.w = 150;
        iconpoint.h = 150;
        drawImage(screen, newicon,iconpoint);
        }
        
        
        
    }
    }
  }


}


