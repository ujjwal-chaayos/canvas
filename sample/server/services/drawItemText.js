
const cv = require("./opencv.js");

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
const menuJson = require('../data/Menus/menu.json');
const { createCanvas,Image,loadImage } = require("canvas");
const GIFEncoder = require("gifencoder");

const fs = require("fs");


// const newicon = "http://localhost:8000/background/New icon.svg";
// const nonvegicon = "http://localhost:8000/background/Non veg icon.svg";
// const vegicon = "http://localhost:8000/background/veg icon.svg";


const drawItemText =  (imageArray, mapping, coordinates) => {
  let coordinateJson = coordinateConverter(coordinates, mapping);
  let jsondata = uiJsonConverter(menuJson, mapping);
  console.log(jsondata);
  // stream the results as they are available into myanimated.gif
  const encoder = new GIFEncoder(3840, 2160);

  encoder.createReadStream().pipe(fs.createWriteStream('./data/myanimated.gif'));
  encoder.start();
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setDelay(800);  // frame delay in ms
  encoder.setQuality(10); // image quality. 10 is default.
  console.log("starting");
  for (let menu = 0; menu < imageArray.length; menu++) {
    let bgImg = new Image();
    bgImg.onload = () => {};
    bgImg.src = imageArray[menu];
    let screen1canvas = createCanvas(bgImg.width, bgImg.height);
    let screen2canvas = createCanvas(bgImg.width, bgImg.height);

    let screen = screen1canvas.getContext("2d");
    let screen2 = screen2canvas.getContext("2d");

    

    drawImage(screen, bgImg, {
      x: 0,
      y: 0,
      w: bgImg.width,
      h: bgImg.height,
    });
    drawImage(screen2, bgImg, {
      x: 0,
      y: 0,
      w: bgImg.width,
      h: bgImg.height,
    });

    fs.writeFileSync('./data/screen1Menu'+menu+'.png', screen1canvas.toBuffer('image/png'))
    fs.writeFileSync('./data/screen2Menu'+menu+'.png', screen2canvas.toBuffer('image/png'))
    screen.save();
    screen2.save();

    let titleCoordinate = coordinateJson;
    let titles = jsondata.titles;
    let titleStyle = jsondata.style;
    // Drawing tilte.
    for (let i = 0; i < titleCoordinate.length; i++) {
      if (titleCoordinate[i].type === "Heading") {
        // drawContours(titleCoordinate[i],cv,screen);
        let id = titleCoordinate[i].parent_block_id;
        console.log("id " + id);
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

  
        screen.save();
        screen2.save();
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
        //console.log(titleText);
        drawText(screen, titleText, points, style);
        drawText(screen2, titleText, points, style);


  
        points.y = y + 10;
        drawLine(screen, points, destPoint, style);
        drawLine(screen2, points, destPoint, style);

      }
    }
    console.log("Drawing text And Price");
    // Drawing text And Price
    let itemCoordinates = coordinateJson;
    let itemStyle = jsondata.style;
    let items = jsondata.items;
    let prices = jsondata.prices;
    console.log(itemCoordinates);
    for (let i = 0; i < itemCoordinates.length; i++) {
      if (itemCoordinates[i].type === "Items") {
        //drawContours(itemCoordinates[i],cv,screen);
        let style =
          itemStyle.weight.Items +
          " " +
          itemStyle.size.Items ;
          // " " +
          // itemStyle.font.Items;
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
        ////////////////////////////////////////////////////////////////
  
        if (
          !heightValidation(itemCoordinates[i], itemArray, {
            height: "56",
            spacing: "5",
          })
        ) {
          console.log(
            "height validation failed for block " +
              itemCoordinates[i].parent_block_id
          );
          //drawContours(itemCoordinates[i], cv, screen);
        }
        if (
          !widthValidation(itemCoordinates[i], itemArray, {
            height: itemStyle.font.Items,
            style: itemStyle.weight.Items + " " + itemStyle.font.Items,
          })
        ) {
          console.log(
            "width validation failed for block " +
              itemCoordinates[i].parent_block_id
          );
          //drawContours(itemCoordinates[i], cv, screen);
        }
  
        ////////////////////////////////////////////////////////////////
        console.log("drawing rect for background");
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
          screen.save();
          screen2.save();
          //screen.fillStyle = itemStyle.color.Items;
          console.log("text for block "+ itemCoordinates[i].parent_block_id);
          console.log("value "+text);
          console.log("points ",points.x,points.y);
          drawText(screen, text, points, style);
          drawText(screen2, text, points, style);
          screen.save();
          screen2.save();
          if( parseInt(itemCoordinates[i].parent_block_id)===parseInt(10))
          fs.writeFileSync('./data/text'+menu+'.png', screen1canvas.toBuffer('image/png'))
  
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
            // let vegicon = new Image();
            // vegicon.src = vegIcon;
            // await loadImage(vegicon);
            let iconpoint = {};
            iconpoint.x = itemX + Math.floor(screen.measureText(text).width) + 10;
            iconpoint.y =
              itemY - Math.floor(screen.measureText(text).fontBoundingBoxAscent);
            iconpoint.w =
              Math.floor(screen.measureText(text).fontBoundingBoxAscent) + 15;
            iconpoint.h =
              Math.floor(screen.measureText(text).fontBoundingBoxAscent) + 15;
            
              // let vegicon1Img = new Image();
              // vegicon1Img.onload = () => {};
              // vegicon1Img.src = vegicon;           
              // screen.drawImage(vegicon1Img, iconpoint.x, iconpoint.y, iconpoint.w, iconpoint.h);
              // screen2.drawImage(vegicon1Img, iconpoint.x, iconpoint.y, iconpoint.w, iconpoint.h);

            
            // drawImage(screen, vegicon, iconpoint);
            // drawImage(screen2, vegicon, iconpoint);

          } else if (itemArray[k].icons === "NON_VEG") {
            // let nonvegicon = new Image();
            // nonvegicon.src = nonvegIcon;
            // await loadImage(nonvegicon);
            let iconpoint = {};
            iconpoint.x = itemX + Math.floor(screen.measureText(text).width) + 10;
            iconpoint.y =
              itemY - Math.floor(screen.measureText(text).fontBoundingBoxAscent);
            iconpoint.w =
              Math.floor(screen.measureText(text).fontBoundingBoxAscent) + 15;
            iconpoint.h =
              Math.floor(screen.measureText(text).fontBoundingBoxAscent) + 15;
           
            
              // let nonvegicon1Img = new Image();
              // nonvegicon1Img.onload = () => {};
              // nonvegicon1Img.src = nonvegicon;        
              // screen.drawImage(nonvegicon1Img, iconpoint.x, iconpoint.y, iconpoint.w, iconpoint.h)
              // screen2.drawImage(nonvegicon1Img, iconpoint.x, iconpoint.y, iconpoint.w, iconpoint.h)


            // drawImage(screen, nonvegicon, iconpoint);
            // drawImage(screen2, nonvegicon, iconpoint);

  
            screen.save();
            screen2.save();
          }
          if (itemArray[k].new === true) {
            // let newicon = new Image();
            // newicon.src = newIcon;
            // await loadImage(newicon);
            let iconpoint = {};
            iconpoint.x =
              itemX + Math.floor(screen.measureText(text).width) + 180;
            iconpoint.y =
              itemY -
              Math.floor(screen.measureText(text).fontBoundingBoxAscent) -
              45;
            iconpoint.w = 150;
            iconpoint.h = 150;

            // let newicon1Img = new Image();
            // newicon1Img.onload = () => {};
            // newicon1Img.src = newicon;        
            // screen.drawImage(newicon1Img, iconpoint.x, iconpoint.y, iconpoint.w, iconpoint.h)

            //drawImage(screen, newicon, iconpoint);
  
            screen.save();
            screen2.save();
          }
        }
      }
    }
    screen.save();
    screen2.save();
   
  fs.writeFileSync('./data/screen1'+menu+'.png', screen1canvas.toBuffer('image/png'))
  fs.writeFileSync('./data/screen2'+menu+'.png', screen2canvas.toBuffer('image/png'))
    encoder.addFrame(screen);
    encoder.addFrame(screen2);
    console.log("saving frame");
  }
};


module.exports = drawItemText;
