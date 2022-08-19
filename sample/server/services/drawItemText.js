
const cv = require("opencv.js");

const {drawText,
    drawImage,
    drawContours,
    downloadImage,
    getCoordinates,
    sortCoordinates,
    subBlockCoordinates,
    roundedRect,
    newItemRect,
    drawLine} = require("./CVServices");

const {
    heightValidation,
    widthValidation,
    wrapValidation
} = require("./ValidationService");


const {uiJsonConverter} = require("./JSONConverter")
const data = require("../data/schema/screen2.json")
const newIcon = require("../data/background/New icon.svg")
const nonvegIcon = require("../data/background/Non veg icon.svg")
const vegIcon = require("../data/background/veg icon.svg")

const menu = require("../data/Menus/menu.json");


const loadImage = async (img) => {
  return new Promise((resolve, reject) => {
    img.onload = async () => {
      resolve(true);
    };
  });
};




const drawItemText = async (background, mapping, coordinates) => {
    let bgImg = new Image();
    bgImg.src = background;
    await loadImage(bgImg);
    let screen1canvas = new OffscreenCanvas(
      bgImg.width,
      bgImg.height
    );
    let screen = screen1canvas.getContext("2d");
    drawImage(screen, bgImg, {
     x: 0,
     y: 0,
     w: bgImg.width,
     h: bgImg.height,
   });
   screen.save();
   let coordinateJson = [];
   for(var i =0;i<mapping.length;i++){
     let titleBlockId = mapping[i].block_id;
     for(var j=0;j<coordinates.length;j++){
       var coordinateBlockId = coordinates[j].block_id;
       if(parseInt(coordinateBlockId)=== parseInt(titleBlockId)){
         let subcoordinate = subBlockCoordinates(coordinates[j],200,coordinates[j].w*0.2);
         let detailHeading = {};
         detailHeading.block_id = 1;
         detailHeading.parent_block_id = coordinateBlockId;
         detailHeading.type = "Heading";
         detailHeading.x = subcoordinate.title.x;
         detailHeading.y = subcoordinate.title.y;
         detailHeading.w = subcoordinate.title.w;
         detailHeading.h = subcoordinate.title.h;
 
 
         let detailItem = {};
         detailItem.block_id = 2;
         detailItem.parent_block_id = coordinateBlockId;
         detailItem.type = "Items";
         detailItem.x = subcoordinate.items.x;
         detailItem.y = subcoordinate.items.y;
         detailItem.w = subcoordinate.items.w;
         detailItem.h = subcoordinate.items.h;
 
         let detailPrice = {};
         detailPrice.block_id = 3;
         detailPrice.parent_block_id = coordinateBlockId;
         detailPrice.type = "Prices";
         detailPrice.x = subcoordinate.price.x;
         detailPrice.y = subcoordinate.price.y;
         detailPrice.w = subcoordinate.price.w;
         detailPrice.h = subcoordinate.price.h;  
         
         coordinateJson.push(detailPrice);
         coordinateJson.push(detailItem);
         coordinateJson.push(detailHeading);
       }
     }
   }
   
   let jsondata = uiJsonConverter(menu,mapping);
   console.log("jsondata " );
   console.log(jsondata);
   console.log("coordinateJson " );
   console.log(coordinateJson);
   let titleCoordinate = coordinateJson;
   let titles = jsondata.titles;
   let titleStyle = jsondata.style;
   // Drawing tilte.
   for (var i = 0; i < titleCoordinate.length; i++) {
     if (titleCoordinate[i].type === "Heading") {
       // drawContours(titleCoordinate[i],cv,screen);
       let id = titleCoordinate[i].parent_block_id;
       console.log("id "+id);
       let titleText = titles[id].value;
       screen.fillStyle = titleStyle.color.Title;
       let style = titleStyle.weight.Title + " " + titleStyle.size.Title + " " + titleStyle.font.Title;
       screen.font = style;
       screen.save();
       var x = titleCoordinate[i].x + Math.floor((titleCoordinate[i].w - screen.measureText(titleText).width) / 2);
       var x1 = x+ screen.measureText(titleText).width;
       var y = titleCoordinate[i].y + (titleCoordinate[i].h - 40);
       var points = {};
       var destPoint = {};
       destPoint.x = x1;
       destPoint.y = y+10;
       points.x = x;
       points.y = y;
       //console.log(titleText);
       drawText(screen, titleText, points, style);
       points.y = y+10;
       drawLine(screen,points,destPoint, style);
 
     }
   }
 
   // Drawing text And Price
   let itemCoordinates = coordinateJson;
   let itemStyle = jsondata.style;
   let items = jsondata.items;
   let prices = jsondata.prices;
   for (var i = 0; i < itemCoordinates.length; i++) {
     if (itemCoordinates[i].type === "Items") {
       //drawContours(itemCoordinates[i],cv,screen);
       let style = itemStyle.weight.Items + " " + itemStyle.size.Items + " " + itemStyle.font.Items;
       var itemX = itemCoordinates[i].x + 10;
       let itemY = itemCoordinates[i].y;
       let id = itemCoordinates[i].parent_block_id;
       let itemArray = items[id.toString()].item;
       let priceArray = prices[id.toString()].value;
       let priceX;
       let priceY;
       for (var k = 0; k < itemCoordinates.length; k++) {
         if (itemCoordinates[k].parent_block_id === id && itemCoordinates[k].type === "Prices") {
 
           priceX = itemCoordinates[k].x + 5;
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
         console.log("height validation failed for block " + itemCoordinates[i].parent_block_id);
         //drawContours(itemCoordinates[i], cv, screen);
       }
       if (
         !widthValidation(itemCoordinates[i], itemArray, {
           height: itemStyle.font.Items,
           style: itemStyle.weight.Items + " " + itemStyle.font.Items,
         })
       ) {
         console.log("width validation failed for block " + itemCoordinates[i].parent_block_id);
         //drawContours(itemCoordinates[i], cv, screen);
       }
 
       ////////////////////////////////////////////////////////////////
 
       for (var k = 0; k < itemArray.length; k++) {
 
 
         var text = itemArray[k].value;
         var item_id = itemArray[k].item_id;
         itemY = itemY + 56 + 5;
         var points = {};
         points.x = itemX;
         points.y = itemY;
 
         if (itemArray[k].active === false) {
           var rectpoint = {};
           rectpoint.x = itemCoordinates[i].x - 10;
           rectpoint.y = itemY - 56;
           rectpoint.w = Math.ceil(itemCoordinates[i].w * (10 / 8)) + 10;
           rectpoint.h = 56 + 10;
           roundedRect(screen, rectpoint, 20, "grey");
           screen.fillStyle = "Black";
         }
         else {
           screen.fillStyle = itemStyle.color.Items;
 
         }
 
         if (itemArray[k].new === true && itemArray[k].active) {
           var rectpoint = {};
           rectpoint.x = itemCoordinates[i].x - 10;
           rectpoint.y = itemY - 56;
           rectpoint.w = Math.ceil(itemCoordinates[i].w * (10 / 8)) + 10;
           rectpoint.h = 56 + 10;
           newItemRect(screen, rectpoint, 30, "yellow", "orange");
           screen.fillStyle = itemStyle.color.New;
         }
         else {
           if (itemArray[k].active)
             screen.fillStyle = itemStyle.color.Items;
         }
 
 
         //screen.fillStyle = itemStyle.color.Items;
 
         drawText(screen, text, points, style);
         for (var j = 0; j < priceArray.length; j++) {
           if (priceArray[j].item_id === item_id) {
             let priceList = priceArray[j].value;
             if (priceList.length === 1) {
               let priceText = priceList[0].price.toString();
               priceY = priceY + 56 + 5;
               var pricePoints = {};
               pricePoints.x = priceX;
               pricePoints.y = priceY;
               screen.fillStyle = itemStyle.color.Prices;
               drawText(screen, priceText, pricePoints, style);
             }
             if (priceList.length > 1) {
               let priceText = priceList[0].price.toString();
 
               priceText = priceText + "|" + priceList[1].price.toString();
               priceY = priceY + 56 + 5;
               var pricePoints = {};
               pricePoints.x = priceX;
               pricePoints.y = priceY;
               screen.fillStyle = itemStyle.color.Prices;
               drawText(screen, priceText, pricePoints, style);
             }
             break;
           }
         }
         if (itemArray[k].icons === "VEG") {
           let vegicon = new Image();
           vegicon.src = vegIcon;
           await loadImage(vegicon);
           var iconpoint = {};
           iconpoint.x = itemX + Math.floor(screen.measureText(text).width) + 10;
           iconpoint.y = itemY - Math.floor(screen.measureText(text).fontBoundingBoxAscent);
           iconpoint.w = Math.floor(screen.measureText(text).fontBoundingBoxAscent) + 15;
           iconpoint.h = Math.floor(screen.measureText(text).fontBoundingBoxAscent) + 15;
           console.log(screen.measureText(text));
           drawImage(screen, vegicon, iconpoint);
         } else if (itemArray[k].icons === "NON_VEG") {
           let nonvegicon = new Image();
           nonvegicon.src = nonvegIcon;
           await loadImage(nonvegicon);
           var iconpoint = {};
           iconpoint.x = itemX + Math.floor(screen.measureText(text).width) + 10;
           iconpoint.y = itemY - Math.floor(screen.measureText(text).fontBoundingBoxAscent);
           iconpoint.w = Math.floor(screen.measureText(text).fontBoundingBoxAscent) + 15;
           iconpoint.h = Math.floor(screen.measureText(text).fontBoundingBoxAscent) + 15;
           console.log(screen.measureText(text));
           drawImage(screen, nonvegicon, iconpoint);
           screen.save();
         }
         if (itemArray[k].new === true) {
           let newicon = new Image();
           newicon.src = newIcon;
           await loadImage(newicon);
           var iconpoint = {};
           iconpoint.x = itemX + Math.floor(screen.measureText(text).width) + 180;
           iconpoint.y = itemY - Math.floor(screen.measureText(text).fontBoundingBoxAscent) - 45;
           iconpoint.w = 150;
           iconpoint.h = 150;
           drawImage(screen, newicon, iconpoint);
           screen.save();
         }
 
 
 
       }
     }
   }
   screen.save();
   let blob = await screen1canvas.convertToBlob();
   let arraybuffer = await blob.arrayBuffer();
   var uint8View = new Uint8Array(arraybuffer);
   blob = new Blob([uint8View], { type: "image/png" });
   console.log({blob});
   return { blob };
 
 }


 module.exports = drawItemText;