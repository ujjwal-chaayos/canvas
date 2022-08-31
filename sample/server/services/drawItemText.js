import { createCanvas } from 'canvas';

const   cv = require('./opencv.js')

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
const {coordinateConverter} = require("./JSONConverter")
const data = require("../data/schema/screen2.json")
const newIcon = require("../data/background/New icon.svg")
const nonvegIcon = require("../data/background/Non veg icon.svg")
const vegIcon = require("../data/background/veg icon.svg")

const menu = require("../data/Menus/menu.json");
//   let coordinateJson = coordinateConverter(coordinates,mapping);


export async function drawItemText(background,bckgroundPlain ,mapping, coordinates) {
  let bgImg = new Image();
  bgImg2.onload =() =>{};
  bgImg.src = background.data;
  let screen1canvas = createCanvas(
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

  let bgImg2 = new Image();
  bgImg2.onload =() =>{};
  bgImg2.src = bckgroundPlain.data;
  let screen2canvas = createCanvas(
    bgImg.width,
    bgImg.height
  );
  let screen2 = screen2canvas.getContext("2d");
  drawImage(screen2, bgImg2, {
    x: 0,
    y: 0,
    w: bgImg2.width,
    h: bgImg2.height,
  });

  screen.save();
  screen2.save();
  let coordinateJson = coordinateConverter(coordinates,mapping);
  
  let {data} = await axios.get("https://app.chaayos.com/app-cache/unit/overall/1000/CHAAYOS/10000");

  let menu=data;
  console.log(menu);

 // let jsondata = uiJsonConverter(menu, mapping);//
  console.log("jsondata ");
  console.log(jsondata);
  console.log("coordinateJson ");
  console.log(coordinateJson);
  let titleCoordinate = coordinateJson;
  let titles = jsondata.titles;
  let titleStyle = jsondata.style;
  // Drawing tilte.
  for (var i = 0; i < titleCoordinate.length; i++) {
    if (titleCoordinate[i].type === "Heading") {
      // drawContours(titleCoordinate[i],cv,screen);
      let id = titleCoordinate[i].parent_block_id;
      console.log("id " + id);
      let titleText = titles[id].value;
      screen.fillStyle = titleStyle.color.Title;
      screen2.fillStyle = titleStyle.color.Title;

      let style = titleStyle.weight.Title + " " + titleStyle.size.Title + " " + titleStyle.font.Title;
      screen.font = style;
      screen2.font = style;

      screen.save();
      screen2.save();
      var x = titleCoordinate[i].x + Math.floor((titleCoordinate[i].w - screen.measureText(titleText).width) / 2);
      var x1 = x + screen.measureText(titleText).width;
      var y = titleCoordinate[i].y + (titleCoordinate[i].h - 40);
      var points = {};
      var destPoint = {};
      destPoint.x = x1;
      destPoint.y = y + 10;
      points.x = x;
      points.y = y;
      //console.log(titleText);
      drawText(screen, titleText, points, style);
      drawText(screen2, titleText, points, style);

      points.y = y + 10;
      drawLine(screen, points, destPoint, style);
      drawLine(screen2, points, destPoint, style);


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
          roundedRect(screen2, rectpoint, 20, "grey");

          screen.fillStyle = "Black";
          screen2.fillStyle = "Black";

        }
        else {
          screen.fillStyle = itemStyle.color.Items;
          screen2.fillStyle = itemStyle.color.Items;


        }

        if (itemArray[k].new === true && itemArray[k].active) {
          var rectpoint = {};
          rectpoint.x = itemCoordinates[i].x - 10;
          rectpoint.y = itemY - 56;
          rectpoint.w = Math.ceil(itemCoordinates[i].w * (10 / 8)) + 10;
          rectpoint.h = 56 + 10;
          newItemRect(screen, rectpoint, 30, "yellow", "orange");
          newItemRect(screen2, rectpoint, 30, "yellow", "orange");

          screen.fillStyle = itemStyle.color.New;
          screen2.fillStyle = itemStyle.color.New;

        }
        else {
          if (itemArray[k].active)
            screen.fillStyle = itemStyle.color.Items;
            screen2.fillStyle = itemStyle.color.Items;

        }


        //screen.fillStyle = itemStyle.color.Items;

        drawText(screen, text, points, style);
        drawText(screen2, text, points, style);

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
              screen2.fillStyle = itemStyle.color.Prices;

              drawText(screen, priceText, pricePoints, style);
              drawText(screen2, priceText, pricePoints, style);

            }
            if (priceList.length > 1) {
              priceList.sort((a,b) => a.price - b.price);
              let priceText = priceList[0].price.toString();

              priceText = priceText + "|" + priceList[1].price.toString();
              priceY = priceY + 56 + 5;
              var pricePoints = {};
              pricePoints.x = priceX;
              pricePoints.y = priceY;
              screen.fillStyle = itemStyle.color.Prices;
              screen2.fillStyle = itemStyle.color.Prices;

              drawText(screen, priceText, pricePoints, style);
              drawText(screen2, priceText, pricePoints, style);

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
          drawImage(screen2, vegicon, iconpoint);

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
          drawImage(screen2, nonvegicon, iconpoint);

          screen.save();
          screen2.save();
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
          drawImage(screen2, newicon, iconpoint);

          screen.save();
          screen2.save();
        }



      }
    }
  }
  screen.save();
  screen2.save();

  let buffer1 = screen1canvas.toBuffer('image/png').toString('base64');
  let buffer2 = screen2canvas.toBuffer('image/png').toString('base64');
  return {"MenuWithImage":buffer1,"MenuPlain":buffer2};

}


 module.exports = drawItemText;