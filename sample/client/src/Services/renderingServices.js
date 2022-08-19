import cv from "opencv.js";
import axios from 'axios';
import {
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
} from "./CVServices";
import {
  heightValidation,
  widthValidation,
  wrapValidation,
} from "./ValidationService";
import { uiJsonConverter } from "./JSONConverter";

import data from "../data/schema/screen2.json";


import newIcon from "../data/background/New icon.svg";
import nonvegIcon from "../data/background/Non veg icon.svg";
import vegIcon from "../data/background/veg icon.svg";


import img0 from "../data/Product image/0.png";
import img1 from "../data/Product image/1.png";
import img2 from "../data/Product image/2.png";
import img3 from "../data/Product image/3.png";
import img4 from "../data/Product image/4.png";

import menu from "../data/Menus/menu.json";
import { ContactlessOutlined } from "@mui/icons-material";

import React ,{useEffect,useState} from 'react'



const loadImage = async (img) => {
  return new Promise((resolve, reject) => {
    img.onload = async () => {
      resolve(true);
    };
  });
};

//returns image rendered by offscreen canvas in uint8array blob
export async function mergeTemplateBackground(template, background) {
  let templateImg = new Image();
  templateImg.src = template;
  await loadImage(templateImg);
  let screen1canvas = new OffscreenCanvas(
    templateImg.width,
    templateImg.height
  );
  let screen1ctx = screen1canvas.getContext("2d");
  let templateMat = cv.imread(templateImg);
  let sortedCoordinates = sortCoordinates(getCoordinates(templateMat, cv));

  let bgImg = new Image();
  bgImg.src = background;
  await loadImage(bgImg);
  drawImage(screen1ctx, bgImg, {
    x: 0,
    y: 0,
    w: templateImg.width,
    h: templateImg.height,
  });
  sortedCoordinates.forEach((e) => {
    drawContours(e, cv, screen1ctx);
  });


  let screen2canvas = new OffscreenCanvas(
    templateImg.width,
    templateImg.height
  );
  let screen2ctx = screen2canvas.getContext("2d");
  let bg2Img = new Image();
  bg2Img.src = background;
  await loadImage(bg2Img);
  drawImage(screen2ctx, bg2Img, {
    x: 0,
    y: 0,
    w: templateImg.width,
    h: templateImg.height,
  });
  screen2ctx.save();


  screen1ctx.fillStyle = "#000000";
  screen1ctx.save();
  sortedCoordinates.forEach((e) => {
    drawText(
      screen1ctx,
      e["block_id"],
      {
        x: parseInt(e.x) + 10,
        y: parseInt(e.y) + 90,
      },
      "80px Arial"
    );
  });

  let blob = await screen1canvas.convertToBlob();
  let arraybuffer = await blob.arrayBuffer();
  var uint8View = new Uint8Array(arraybuffer);
  blob = new Blob([uint8View], { type: "image/png" });

  let blob2 = await screen2canvas.convertToBlob();
  let arraybuffer2 = await blob2.arrayBuffer();
  var uint8View = new Uint8Array(arraybuffer2);
  blob2 = new Blob([uint8View], { type: "image/png" });
  // returning blob with contour drawn , blob2 witrhgout contour drawn,sorted coordinates
  return { blob, blob2, sortedCoordinates };
}

export async function drawProductImage(background, imageData, coordinateData) {
  //console.log(background,imageData,coordinateData)
  let bgImg = new Image();
  bgImg.src = background;
  await loadImage(bgImg);
  let screen1canvas = new OffscreenCanvas(
    bgImg.width,
    bgImg.height
  );
  let screen1ctx = screen1canvas.getContext("2d");

  drawImage(screen1ctx, bgImg, {
    x: 0,
    y: 0,
    w: bgImg.width,
    h: bgImg.height,
  });

  for (var i = 0; i < imageData.length; i++) {
    let imgBlockId = imageData[i].block_id;
    let itemImgInfo = imageData[i].image_info[0].blob;
    let productImg = new Image();
    productImg.src = itemImgInfo;
    await loadImage(productImg);
    for (var j = 0; j < coordinateData.length; j++) {
      let coordinateBlockId = coordinateData[j].block_id;
      if (parseInt(imgBlockId) === parseInt(coordinateBlockId)) {
        let points = {};
        points.x = coordinateData[j].x;
        points.y = coordinateData[j].y;
        points.w = coordinateData[j].w;
        points.h = coordinateData[j].h;
        drawImage(screen1ctx, productImg, points);
        screen1ctx.save();


      }
    }
  }

  let blob = await screen1canvas.convertToBlob();
  let arraybuffer = await blob.arrayBuffer();
  var uint8View = new Uint8Array(arraybuffer);
  blob = new Blob([uint8View], { type: "image/png" });
  console.log("i m in image " + blob);
  return { blob };

}

export async function drawItemText(background,bckgroundPlain ,mapping, coordinates) {
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

  let bgImg2 = new Image();
  bgImg2.src = bckgroundPlain;
  await loadImage(bgImg2);
  let screen2canvas = new OffscreenCanvas(
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
  let coordinateJson = [];
  for (var i = 0; i < mapping.length; i++) {
    let titleBlockId = mapping[i].block_id;
    for (var j = 0; j < coordinates.length; j++) {
      var coordinateBlockId = coordinates[j].block_id;
      if (parseInt(coordinateBlockId) === parseInt(titleBlockId)) {
        let subcoordinate = subBlockCoordinates(coordinates[j], 200, coordinates[j].w * 0.2);
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


	//let {data} = await axios.get("https://app.chaayos.com/app-cache/unit/overall/1000/CHAAYOS/10000");

  //let menu=data;
  console.log(menu);

  let jsondata = uiJsonConverter(menu, mapping);
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
  let blob = await screen1canvas.convertToBlob();
  let arraybuffer = await blob.arrayBuffer();
  var uint8View = new Uint8Array(arraybuffer);
  blob = new Blob([uint8View], { type: "image/png" });
  console.log({ blob });

  let blob2 = await screen2canvas.convertToBlob();
  let arraybuffer2 = await blob2.arrayBuffer();
  var uint8View = new Uint8Array(arraybuffer2);
  blob2 = new Blob([uint8View], { type: "image/png" });
  console.log({ blob2 });
  return { blob ,blob2};

}
export async function CreateGifImage(background, imageData, coordinateData) {

  let maxImages = 0;
  for (var i = 0; i < imageData.length; i++) {
    if (maxImages < imageData[i].imgInfo.length) {
      maxImages = imageData[i].imgInfo.length;
    }
  }
  let finalImagesArray = [];
  for (var index = 0; index < maxImages; index++) {
    let bgImg = new Image();
    bgImg.src = background;
    await loadImage(bgImg);
    let screen1canvas = new OffscreenCanvas(
      bgImg.width,
      bgImg.height
    );
    let screen1ctx = screen1canvas.getContext("2d");

    drawImage(screen1ctx, bgImg, {
      x: 0,
      y: 0,
      w: bgImg.width,
      h: bgImg.height,
    });
    for (var i = 0; i < imageData.length; i++) {
      let imgBlockId = imageData[i].block_id;
      let reqiredImageIndex;
      if (index >= imageData[i].image_info.length) {
        reqiredImageIndex = imageData[i].image_info.length - ((index + 1) % imageData[i].image_info.length) - 1;
      }
      else {
        reqiredImageIndex = index;
      }
      //let reqiredImageIndex = index % imageData[i].image_info.length;
      let itemImgInfo = imageData[i].image_info[reqiredImageIndex].blob;
      let productImg = new Image();
      productImg.src = itemImgInfo;
      await loadImage(productImg);
      for (var j = 0; j < coordinateData.length; j++) {
        let coordinateBlockId = coordinateData[j].block_id;
        if (parseInt(imgBlockId) === parseInt(coordinateBlockId)) {
          let points = {};
          points.x = coordinateData[j].x;
          points.y = coordinateData[j].y;
          points.w = coordinateData[j].w;
          points.h = coordinateData[j].h;
          drawImage(screen1ctx, productImg, points);
          screen1ctx.save();
        }
      }
    }
    let blob = await screen1canvas.convertToBlob();
    let arraybuffer = await blob.arrayBuffer();
    var uint8View = new Uint8Array(arraybuffer);
    blob = new Blob([uint8View], { type: "image/png" });
    finalImagesArray.push(blob);
  }
  drawAnimatedImage(finalImagesArray, 500, 300, 0, 1, 250,background);
}

//isha
export async function drawAnimatedImage(arr, x, y, angle, factor, changespeed,background) {
  let bgImg = new Image();
  bgImg.src = background;
  await loadImage(bgImg);
  let finalcanvas = new OffscreenCanvas(
    bgImg.width,
    bgImg.height
  );
  let ctx = finalcanvas.getContext("2d");;
  if (!factor) {
    factor = 1;
  }
  if (!changespeed) {
    changespeed = 1;
  }
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  if (!!arr[Math.round(Date.now() / changespeed) % arr.length]) {
    ctx.drawImage(
      arr[Math.round(Date.now() / changespeed) % arr.length],
      -(
        (arr[Math.round(Date.now() / changespeed) % arr.length].width *
          factor) /
        2
      ),
      -(
        (arr[Math.round(Date.now() / changespeed) % arr.length].height *
          factor) /
        2
      ),
      arr[Math.round(Date.now() / changespeed) % arr.length].width * factor,
      arr[Math.round(Date.now() / changespeed) % arr.length].height * factor
    );
  }
  ctx.restore();
  startRecording(finalcanvas);
}

function startRecording(canvas){
  //var canvas =  document.getElementById('myCanvas');
 // const ctx = canvas.getContext('2d');
  const chunks = []; // here we will store our recorded media chunks (Blobs)
  const stream = canvas.captureStream(); // grab our canvas MediaStream
  const rec = new MediaRecorder(stream); // init the recorder
  // every time the recorder has new data, we will store it in our array
  rec.ondataavailable = e => chunks.push(e.data);
  // only when the recorder stops, we construct a complete Blob from all the chunks
  rec.onstop = e => exportVid(new Blob(chunks, {type: 'image/gif'}));
  
  rec.start();
  setTimeout(()=>rec.stop(), 3000); // stop recording in 3s
  
}


function exportVid(blob) {
  const vid = document.createElement('video');
  vid.src = URL.createObjectURL(blob);
  vid.controls = true;
  document.body.appendChild(vid);
  const a = document.createElement('a');
  a.download = 'myvid.gif';
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
  a.textContent = 'download the video';
  document.body.appendChild(a);//
}

//isha




export async function renderJSON(screen, data, background, coordinates) {
  const im = [img1, img0, img3, img4, img2];

  let bgImg = new Image();
  bgImg.src = background;
  await loadImage(bgImg);
  drawImage(screen, bgImg, { x: 0, y: 0, w: 3840, h: 2160 });

  coordinates = coordinates.templates[0];

  let imageArray = data.images;

  let imageCoordinate = coordinates.image_blocks;

  let c = 0;
  for (var i = 0; i < imageCoordinate.length; i++) {
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

export async function drawTitle(screen, data, coordinates) {
  coordinates = coordinates.templates[0];
  let titleCoordinate = coordinates.sub_blocks;
  let titles = data.titles;
  let titleStyle = data.style;
  for (var i = 0; i < titleCoordinate.length; i++) {
    if (titleCoordinate[i].type === "Heading") {
      let id = titleCoordinate[i].parent_block_id;

      let titleText = titles[id.toString()].value;

      var x =
        titleCoordinate[i].x +
        Math.floor(
          (titleCoordinate[i].w - screen.measureText(titleText).width) / 2
        );
      var y = titleCoordinate[i].y + (titleCoordinate[i].h - 40);
      var points = {};
      points.x = x;
      points.y = y;

      screen.fillStyle = titleStyle.color.Title;
      let style =
        titleStyle.weight.Title +
        " " +
        titleStyle.size.Title +
        " " +
        titleStyle.font.Title;

      console.log(titleText);
      drawText(screen, titleText, points, style);
    }
  }
}

export async function drawItem(screen, data, coordinates) {
  coordinates = coordinates.templates[0];
  let itemCoordinates = coordinates.sub_blocks;
  let itemStyle = data.style;
  let items = data.items;
  for (var i = 0; i < itemCoordinates.length; i++) {
    if (itemCoordinates[i].type === "Items") {
      let style =
        itemStyle.weight.Items +
        " " +
        itemStyle.size.Items +
        " " +
        itemStyle.font.Items;
      screen.fillStyle = itemStyle.color.Items;
      var x = itemCoordinates[i].x + 10;
      let y = itemCoordinates[i].y;
      let id = itemCoordinates[i].parent_block_id;
      let itemArray = items[id.toString()].item;
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

      for (var k = 0; k < itemArray.length; k++) {
        var text = itemArray[k].value;
        y = y + 56 + 5;
        var points = {};
        points.x = x;
        points.y = y;
        drawText(screen, text, points, style);
      }
    }
  }
}
