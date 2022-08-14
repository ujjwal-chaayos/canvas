import cv from "opencv.js";
import {
  drawText,
  drawImage,
  drawContours,
  downloadImage,
  getCoordinates,
  sortCoordinates,
} from "./CVServices";
import {
  heightValidation,
  widthValidation,
  wrapValidation,
} from "./ValidationService";

import img0 from "../data/Product image/0.png";
import img1 from "../data/Product image/1.png";
import img2 from "../data/Product image/2.png";
import img3 from "../data/Product image/3.png";
import img4 from "../data/Product image/4.png";

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
   blob = new Blob( [ uint8View ], { type: "image/png" } );
   return {blob,sortedCoordinates};
}

export async function drawProductImage(background,imageData,coordinateData){
  //console.log(background,imageData,coordinateData)
  let bgImg = new Image();
  bgImg.src = background;
  await loadImage(bgImg);
  let screen1canvas = new OffscreenCanvas(
    bgImg.width,
    bgImg.height
  );

 
  let screen1ctx = screen1canvas.getContext("2d");
  for(var i=0;i<imageData.length; i++){
    //console.log(imageData[i]);
    let imgBlockId = imageData[i].block_id;
    let itemImgInfo = imageData[i].image_info.imageBlob;
    let productImg = new Image();
    productImg.src = itemImgInfo;
    await loadImage(productImg);
    for(var j=0;j<coordinateData.length; j++){
      let coordinateBlockId = coordinateData[j].block_id;
      if(parseInt(imgBlockId)===parseInt(coordinateBlockId)){
        let points = {};
        points.x = coordinateData[j].x;
        points.y = coordinateData[j].y;
        points.w = coordinateData[j].w;
        points.h = coordinateData[j].h;
        console.log(points);
        console.log(itemImgInfo);
        console.log(typeof(productImg));
        drawImage(screen1ctx,productImg,points);
        screen1ctx.save();


        
      }
    }
  }

  let blob = await screen1canvas.convertToBlob();
  let arraybuffer = await blob.arrayBuffer();
  var uint8View = new Uint8Array(arraybuffer);
   blob = new Blob( [ uint8View ], { type: "image/png" } );
   return {blob};
  
}



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
