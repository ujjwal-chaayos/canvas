import cv from "opencv.js";
import { drawText } from "./CVServices";
import { drawImage } from "./CVServices";
import { heightValidation } from "./ValidationService";
import { widthValidation } from "./ValidationService";
import { wrapValidation } from "./ValidationService";
import { drawContours } from "./CVServices";

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
      //height and width validation
      //
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
