const cv = require("./opencv.js");
const path = require("path");

const {
  drawText,
  drawImage,
  drawContours,
  downloadImage,
  getCoordinates,
  sortCoordinates,
  subBlockCoordinates,
  roundedRect,
  newItemRect,
  drawLine,
} = require("./CVServices");

const {
  heightValidation,
  widthValidation,
  wrapValidation,
} = require("./ValidationService");

const { uiJsonConverter } = require("./JSONConverter");
const { coordinateConverter } = require("./JSONConverter");
const menuJson = require("../data/Menus/menu.json");
const { createCanvas, Image, loadImage } = require("canvas");
const GIFEncoder = require("gifencoder");
const fs = require("fs");

var resolvedPath = path
  .join(__dirname, "../../server/data/background")
  .replace(/\\/g, "/");

const vegicon = resolvedPath + "/vegIcon.svg";
const nonvegicon = resolvedPath + "/nonVegIcon.svg";
const newicon = resolvedPath + "/newIcon.svg";


async function wrapMyTxt(itemCoordinates,priceX,priceY,itemArray,id,priceArray,itemStyle,screen,screen2){

       let style =
        itemStyle.weight.Items +
        " " +
        itemStyle.size.Items +
        " " +
        itemStyle.font.Items;
      screen.font = style;
      screen2.font = style;
      let itemX = itemCoordinates.x + 10;
      let itemY = itemCoordinates.y;

      for (let k = 0; k < itemArray.length; k++) {
        let text = itemArray[k].value;
        let item_id = itemArray[k].item_id;
        itemY = itemY + 56 + 5;
        let points = {};
        points.x = itemX;
        points.y = itemY;

        if (itemArray[k].active === false) {
          let rectpoint = {};
          rectpoint.x = itemCoordinates.x - 10;
          rectpoint.y = itemY - 56;
          rectpoint.w = Math.ceil(itemCoordinates.w * (10 / 8)) + 10;
          rectpoint.h = 56 + 10;
          roundedRect(screen, rectpoint, 20, "grey");
          roundedRect(screen2, rectpoint, 20, "grey");

          screen.fillStyle = "Black";
          screen2.fillStyle = "Black";
        } else {
          screen.fillStyle = itemStyle.color.Items;
          screen2.fillStyle = itemStyle.color.Items;
        }

        if (itemArray[k].new === true && itemArray[k].active) {
          let rectpoint = {};
          rectpoint.x = itemCoordinates.x - 10;
          rectpoint.y = itemY - 56;
          rectpoint.w = Math.ceil(itemCoordinates.w * (10 / 8)) + 10;
          rectpoint.h = 56 + 10;
          newItemRect(screen, rectpoint, 30, "yellow", "orange");
          newItemRect(screen2, rectpoint, 30, "yellow", "orange");

          screen.fillStyle = itemStyle.color.New;
          screen2.fillStyle = itemStyle.color.New;
        } else {
          if (itemArray[k].active) {
            screen.fillStyle = itemStyle.color.Items;
            screen2.fillStyle = itemStyle.color.Items;
          }
        }

        drawText(screen, text, points, style);
        drawText(screen2, text, points, style);

        for (let j = 0; j < priceArray.length; j++) {
          if (priceArray[j].item_id === item_id) {
            let priceList = priceArray[j].value;
            if (priceList.length === 1) {
              let priceText = priceList[0].price.toString();
              priceY = priceY + 56 + 5;
              let pricePoints = {};
              pricePoints.x = priceX;
              pricePoints.y = priceY;
              screen.fillStyle = itemStyle.color.Prices;
              screen2.fillStyle = itemStyle.color.Prices;

              drawText(screen, priceText, pricePoints, style);
              drawText(screen2, priceText, pricePoints, style);
            }
            if (priceList.length > 1) {
              priceList.sort((a, b) => a.price - b.price);
              let priceText = priceList[0].price.toString();

              priceText = priceText + "|" + priceList[1].price.toString();
              priceY = priceY + 56 + 5;
              let pricePoints = {};
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
          let iconpoint = {};

          iconpoint.x = itemX + Math.floor(screen.measureText(text).width) + 10;
          iconpoint.y =
            itemY -
            Math.floor(screen.measureText(text).actualBoundingBoxAscent);
          iconpoint.w =
            Math.floor(screen.measureText(text).actualBoundingBoxAscent) + 15;
          iconpoint.h =
            Math.floor(screen.measureText(text).actualBoundingBoxAscent) + 15;
          await loadImage(vegicon).then((image) => {
            screen.drawImage(
              image,
              iconpoint.x,
              iconpoint.y,
              iconpoint.w,
              iconpoint.h
            );
            screen2.drawImage(
              image,
              iconpoint.x,
              iconpoint.y,
              iconpoint.w,
              iconpoint.h
            );
          });
        } else if (itemArray[k].icons === "NON_VEG") {
          let iconpoint = {};
          iconpoint.x = itemX + Math.floor(screen.measureText(text).width) + 10;
          iconpoint.y =
            itemY -
            Math.floor(screen.measureText(text).actualBoundingBoxAscent);
          iconpoint.w =
            Math.floor(screen.measureText(text).actualBoundingBoxAscent) + 15;
          iconpoint.h =
            Math.floor(screen.measureText(text).actualBoundingBoxAscent) + 15;
          await loadImage(nonvegicon).then((image) => {
            screen.drawImage(
              image,
              iconpoint.x,
              iconpoint.y,
              iconpoint.w,
              iconpoint.h
            );
            screen2.drawImage(
              image,
              iconpoint.x,
              iconpoint.y,
              iconpoint.w,
              iconpoint.h
            );
          });
        }
        if (itemArray[k].new === true) {
          let iconpoint = {};
          iconpoint.x =
            itemX + Math.floor(screen.measureText(text).width) + 180;
          iconpoint.y =
            itemY -
            Math.floor(screen.measureText(text).actualBoundingBoxAscent) -
            45;
          iconpoint.w = 150;
          iconpoint.h = 150;
          await loadImage(newicon).then((image) => {
            screen.drawImage(
              image,
              iconpoint.x,
              iconpoint.y,
              iconpoint.w,
              iconpoint.h
            );
          });
        }
      }



}




async function doMyTextPrint(
  itemCoordinates,
  itemStyle,
  items,
  prices,
  screen,
  screen2
) {
  for (let i = 0; i < itemCoordinates.length; i++) {
    if (itemCoordinates[i].type === "Items") {
      let style =
        itemStyle.weight.Items +
        " " +
        itemStyle.size.Items +
        " " +
        itemStyle.font.Items;
      screen.font = style;
      screen2.font = style;

      let itemX = itemCoordinates[i].x + 10;
      let itemY = itemCoordinates[i].y;
      let id = itemCoordinates[i].parent_block_id;
      let itemArray = items[id.toString()].item;
      let priceArray = prices[id.toString()].value;
      let priceX;
      let priceY;
      for (let k = 0; k < itemCoordinates.length; k++) {
        if (
          itemCoordinates[k].parent_block_id === id &&
          itemCoordinates[k].type === "Prices"
        ) {
          priceX = itemCoordinates[k].x + 5;
          priceY = itemCoordinates[k].y;
        }
      }

      if(wrapValidation(itemCoordinates[i],itemArray,{height: 56,spacing: 5, })){
        console.log("item ARrAy" , itemArray);
        console.log("i am in wrap");
        let halfway= Math.floor(itemArray.length / 2);
        let itemFirst = itemArray.slice(0, halfway);
        let itemSecond = itemArray.slice(halfway+1, itemArray.length);
        console.log("first",itemFirst);
        console.log("second",itemSecond);
        let blockWidth = Math.ceil((itemCoordinates[i].w*100)/80);
        let block1 = {};
        let price1x ;
        let price1y;
        block1.x = itemCoordinates[i].x;
        block1.y = itemCoordinates[i].y;
        block1.w = Math.ceil((blockWidth/2) - ((blockWidth/2)*0.2));
        block1.h = itemCoordinates[i].h;
        price1x = block1.x+block1.w+5;
        price1y = priceY;
        await wrapMyTxt(block1,price1x,price1y,itemFirst,id,priceArray,itemStyle,screen,screen2);

        let block2 = {};
        let price2x ;
        let price2y;
        block2.x = block1.x + Math.ceil((blockWidth/2));
        block2.y = itemCoordinates[i].y;
        block2.w = Math.ceil((blockWidth/2) - ((blockWidth/2)*0.2));
        block2.h = itemCoordinates[i].h;
        price2x = block2.x +  block2.w +5;
        price2y = priceY;

        await wrapMyTxt(block2,price2x,price2y,itemSecond,id,priceArray,itemStyle,screen,screen2);

        continue;
      }

      for (let k = 0; k < itemArray.length; k++) {
        let text = itemArray[k].value;
        let item_id = itemArray[k].item_id;
        itemY = itemY + 56 + 5;
        let points = {};
        points.x = itemX;
        points.y = itemY;

        if (itemArray[k].active === false) {
          let rectpoint = {};
          rectpoint.x = itemCoordinates[i].x - 10;
          rectpoint.y = itemY - 56;
          rectpoint.w = Math.ceil(itemCoordinates[i].w * (10 / 8)) + 10;
          rectpoint.h = 56 + 10;
          roundedRect(screen, rectpoint, 20, "grey");
          roundedRect(screen2, rectpoint, 20, "grey");

          screen.fillStyle = "Black";
          screen2.fillStyle = "Black";
        } else {
          screen.fillStyle = itemStyle.color.Items;
          screen2.fillStyle = itemStyle.color.Items;
        }

        if (itemArray[k].new === true && itemArray[k].active) {
          let rectpoint = {};
          rectpoint.x = itemCoordinates[i].x - 10;
          rectpoint.y = itemY - 56;
          rectpoint.w = Math.ceil(itemCoordinates[i].w * (10 / 8)) + 10;
          rectpoint.h = 56 + 10;
          newItemRect(screen, rectpoint, 30, "yellow", "orange");
          newItemRect(screen2, rectpoint, 30, "yellow", "orange");

          screen.fillStyle = itemStyle.color.New;
          screen2.fillStyle = itemStyle.color.New;
        } else {
          if (itemArray[k].active) {
            screen.fillStyle = itemStyle.color.Items;
            screen2.fillStyle = itemStyle.color.Items;
          }
        }

        drawText(screen, text, points, style);
        drawText(screen2, text, points, style);

        for (let j = 0; j < priceArray.length; j++) {
          if (priceArray[j].item_id === item_id) {
            let priceList = priceArray[j].value;
            if (priceList.length === 1) {
              let priceText = priceList[0].price.toString();
              priceY = priceY + 56 + 5;
              let pricePoints = {};
              pricePoints.x = priceX;
              pricePoints.y = priceY;
              screen.fillStyle = itemStyle.color.Prices;
              screen2.fillStyle = itemStyle.color.Prices;

              drawText(screen, priceText, pricePoints, style);
              drawText(screen2, priceText, pricePoints, style);
            }
            if (priceList.length > 1) {
              priceList.sort((a, b) => a.price - b.price);
              let priceText = priceList[0].price.toString();

              priceText = priceText + "|" + priceList[1].price.toString();
              priceY = priceY + 56 + 5;
              let pricePoints = {};
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
          let iconpoint = {};

          iconpoint.x = itemX + Math.floor(screen.measureText(text).width) + 10;
          iconpoint.y =
            itemY -
            Math.floor(screen.measureText(text).actualBoundingBoxAscent);
          iconpoint.w =
            Math.floor(screen.measureText(text).actualBoundingBoxAscent) + 15;
          iconpoint.h =
            Math.floor(screen.measureText(text).actualBoundingBoxAscent) + 15;
          await loadImage(vegicon).then((image) => {
            screen.drawImage(
              image,
              iconpoint.x,
              iconpoint.y,
              iconpoint.w,
              iconpoint.h
            );
            screen2.drawImage(
              image,
              iconpoint.x,
              iconpoint.y,
              iconpoint.w,
              iconpoint.h
            );
          });
        } else if (itemArray[k].icons === "NON_VEG") {
          let iconpoint = {};
          iconpoint.x = itemX + Math.floor(screen.measureText(text).width) + 10;
          iconpoint.y =
            itemY -
            Math.floor(screen.measureText(text).actualBoundingBoxAscent);
          iconpoint.w =
            Math.floor(screen.measureText(text).actualBoundingBoxAscent) + 15;
          iconpoint.h =
            Math.floor(screen.measureText(text).actualBoundingBoxAscent) + 15;
          await loadImage(nonvegicon).then((image) => {
            screen.drawImage(
              image,
              iconpoint.x,
              iconpoint.y,
              iconpoint.w,
              iconpoint.h
            );
            screen2.drawImage(
              image,
              iconpoint.x,
              iconpoint.y,
              iconpoint.w,
              iconpoint.h
            );
          });
        }
        if (itemArray[k].new === true) {
          let iconpoint = {};
          iconpoint.x =
            itemX + Math.floor(screen.measureText(text).width) + 180;
          iconpoint.y =
            itemY -
            Math.floor(screen.measureText(text).actualBoundingBoxAscent) -
            45;
          iconpoint.w = 150;
          iconpoint.h = 150;
          await loadImage(newicon).then((image) => {
            screen.drawImage(
              image,
              iconpoint.x,
              iconpoint.y,
              iconpoint.w,
              iconpoint.h
            );
          });
        }
      }
    }
  }
}

async function doMyTitlePrint(
  titleCoordinate,
  titles,
  titleStyle,
  screen,
  screen2
) {
  for (let i = 0; i < titleCoordinate.length; i++) {
    if (titleCoordinate[i].type === "Heading") {
      let id = titleCoordinate[i].parent_block_id;

      let titleText = titles[id].value;
      screen.fillStyle = titleStyle.color.Title;
      screen2.fillStyle = titleStyle.color.Title;

      let style =
        titleStyle.weight.Title +
        " " +
        titleStyle.size.Title +
        " " +
        titleStyle.font.Title;
      screen.font = style;
      screen2.font = style;

      let x =
        titleCoordinate[i].x +
        Math.floor(
          (titleCoordinate[i].w - screen.measureText(titleText).width) / 2
        );
      let x1 = x + screen.measureText(titleText).width;
      let y = titleCoordinate[i].y + (titleCoordinate[i].h - 40);
      let points = {};
      let destPoint = {};
      destPoint.x = x1;
      destPoint.y = y + 10;
      points.x = x;
      points.y = y;

      drawText(screen, titleText, points, style);
      drawText(screen2, titleText, points, style);

      points.y = y + 10;
      drawLine(screen, points, destPoint, style);
      drawLine(screen2, points, destPoint, style);
    }
  }
}

async function doMyWork(imageBuffer, jsondata, coordinateJson, bufferLength) {
  let bgImg = new Image();
  bgImg.onload = () => {};
  bgImg.src = imageBuffer;

  let screen1canvas = createCanvas(bgImg.width, bgImg.height);
  let screen = screen1canvas.getContext("2d");

  drawImage(screen, bgImg, {
    x: 0,
    y: 0,
    w: bgImg.width,
    h: bgImg.height,
  });

  let screen2canvas = createCanvas(bgImg.width, bgImg.height);
  let screen2 = screen2canvas.getContext("2d");

  drawImage(screen2, bgImg, {
    x: 0,
    y: 0,
    w: bgImg.width,
    h: bgImg.height,
  });

  let titleCoordinate = coordinateJson;
  let titles = jsondata.titles;
  let titleStyle = jsondata.style;

  await doMyTitlePrint(titleCoordinate, titles, titleStyle, screen, screen2);

  let itemCoordinates = coordinateJson;
  let itemStyle = jsondata.style;
  let items = jsondata.items;
  let prices = jsondata.prices;

  await doMyTextPrint(
    itemCoordinates,
    itemStyle,
    items,
    prices,
    screen,
    screen2,
    vegicon,
    nonvegicon,
    newicon
  );
  screen.save();
  screen2.save();
  let buffer1 = screen1canvas.toBuffer("image/png").toString("base64");
  let buffer2 = screen1canvas.toBuffer("image/png").toString("base64");

  return { 1: buffer1, 2: buffer2, screen1: screen, screen2: screen2 };
}

const drawItemText = async (imageArray, mapping, coordinates) => {
  let bufferLength = imageArray.length;
  let coordinateJson = coordinateConverter(coordinates, mapping);

  let jsondata = uiJsonConverter(menuJson, mapping);

  const encoder = new GIFEncoder(3840, 2160);
  encoder
    .createReadStream()
    .pipe(fs.createWriteStream("./data/myanimated.gif"));
  encoder.start();
  encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
  encoder.setDelay(1000); // frame delay in ms
  encoder.setQuality(10); // image quality. 10 is default.

  let response = [];

  while (bufferLength > 0) {
    let result = await doMyWork(
      imageArray[bufferLength - 1],
      jsondata,
      coordinateJson,
      bufferLength
    );
    response.push(result["1"]);
    response.push(result["2"]);
    response.push(result["1"]);
    response.push(result["2"]);
    response.push(result["1"]);
    response.push(result["2"]);
    encoder.addFrame(result["screen1"]);
    encoder.addFrame(result["screen2"]);
    encoder.addFrame(result["screen1"]);
    encoder.addFrame(result["screen2"]);
    encoder.addFrame(result["screen1"]);
    encoder.addFrame(result["screen2"]);

    bufferLength--;
  }

  return response[0];
};

module.exports = drawItemText;
