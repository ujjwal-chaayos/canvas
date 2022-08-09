import { subBlockCoordinates } from "./CVServices";
import { sortCoordinates } from "./CVServices";

export function jsonConverter(menu, refrenceTemplate) {
  var imageBlocks = [];
  var textBlocks = [];
  for (let i = 0; i < refrenceTemplate["templates"].length; i++) {
    textBlocks = textBlocks.concat(
      refrenceTemplate["templates"][i]["text_blocks"]
    );
    imageBlocks = imageBlocks.concat(
      refrenceTemplate["templates"][i]["image_blocks"]
    );
  }
  var refinedTemplate = {};
  var menuDetails = menu["detail"];
  var cafe_detail = {
    id: menuDetails["id"]["id"],
    parentId: menuDetails["id"]["parentId"],
    source: menuDetails["id"]["source"],
    name: menuDetails["name"],
    city: menuDetails["city"],
    state: menuDetails["state"],
    stateId: menuDetails["stateId"],
    address: menuDetails["address"],
    pin: menuDetails["pin"],
    active: menuDetails["active"],
    lat: menuDetails["lat"],
    lon: menuDetails["lon"],
    token: menu["id"]["token"],
    partnerId: menu["id"]["partnerId"],
  };
  refinedTemplate["cafe_detail"] = cafe_detail;
  var subCategory = menu["menuSequence"]["sub-category"];
  var products = menu["productDetail"]["products"];
  var productPrices = menu["prices"]["prices"];
  var productImages = menu["productImages"];

  var images = [];
  var titles = [];
  refinedTemplate["images"] = { qty: "" };
  refinedTemplate["titles"] = { qty: subCategory.length - 1 };
  refinedTemplate["items"] = [];
  refinedTemplate["prices"] = [];

  for (let i = 0; i < subCategory.length; i++) {
    if (subCategory[i]["name"] === "Images") {
      refinedTemplate["images"]["qty"] = subCategory[i]["pids"].length;
      for (let j = 0; j < subCategory[i]["pids"].length; j++) {
        images.push({
          img_id: subCategory[i]["pids"][j],
          imgURL:
            productImages["baseUrl"] +
            productImages["imageMap"][subCategory[i]["pids"][j].toString()][
              "gridLow"
            ],
          block_id: imageBlocks[j]["block_id"],
          template_id: imageBlocks[j]["template_id"],
        });
      }
    } else {
      var item = [];
      var value = [];
      for (let j = 0; j < subCategory[i]["pids"].length; j++) {
        item.push({
          item_id: subCategory[i]["pids"][j],
          value: products[subCategory[i]["pids"][j].toString()]["name"],
          icons: products[subCategory[i]["pids"][j].toString()]["attr"],
          active: products[subCategory[i]["pids"][j].toString()]["active"],
          new: products[subCategory[i]["pids"][j].toString()]["new"],
        });
        var prices =
          productPrices[subCategory[i]["pids"][j].toString()]["prices"];
        let values = [];
        for (let k = 0; k < prices.length; k++) {
          values.push({
            id: prices[k]["id"],
            price: prices[k]["price"],
          });
        }
        value.push({
          item_id: subCategory[i]["pids"][j],
          value: values,
        });
      }

      let c = getBestBlock(
        textBlocks,
        {
          qty: subCategory[i]["pids"].length,
          item: item,
        },
        font
      );

      refinedTemplate["items"].push({
        block_id: textBlocks[c]["block_id"],
        qty: subCategory[i]["pids"].length,
        item: item,
      });

      refinedTemplate["prices"].push({
        block_id: textBlocks[c]["block_id"],
        qty: subCategory[i]["pids"].length,
        value: value,
      });

      titles.push({
        title_id: subCategory[i]["id"],
        value: subCategory[i]["name"],
        block_id: textBlocks[c]["block_id"],
      });
    }
  }
  refinedTemplate["titles"].push({
    title: titles,
  });

  //default style from db
  //avilable icons from db

  refinedTemplate["style"] = {
    font: ["ROBOTO", "ARIAL", "SERIF"],
    size: ["200px", "400px", "600px", "800px"],
    color: ["green", "red", "blue", "black"],
    weight: ["B", "I", "U"],
  }; //default

  return refinedTemplate;
}

export function getBestBlock(blocks, data, font) {
  let index;
  let screen = new OffscreenCanvas().getContext("2d");
  screen.font = font.h2 + " " + font.style;
  let quantity = parseInt(data.qty);
  let textheight = parseInt(font.h2);
  textheight = textheight + quantity * font.spacing;
  let maximumwidth = 0;
  for (let i = 0; i < quantity; i++) {
    let txt = data.item[j].value;
    maximumwidth = Math.max(
      maximumwidth,
      Math.floor(screen.measureText(txt).width)
    );
  }
  let textArea = maximumwidth * (qunatity * textheight);
  let difference = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < blocks.length; i++) {
    let priceWidth = 0.2 * parseInt(blocks[i].w);
    let height = parseInt(blocks[i].h) - parseInt(font.h1);
    let width = parseInt(blocks[i].w) - priceWidth;
    let blockArea = width * height;
    if (blockArea > textArea) {
      if (difference > blockArea - textArea) {
        difference = blockArea - textArea;
        index = i;
      }
    }
  }
  return index;
}

export function createCoordinateJSON(
  templateID,
  templateName,
  imageBlocks,
  txtBlocks,
  font
) {
  var coordinates = {
    id: templateID,
    name: templateName,
    image_blocks: [],
    sub_blocks: [],
    text_blocks: [],
  };
  imageBlocks.forEach((e) => {
    e["template_id"] = templateID;
    e["type"] = "Image";
  });

  for (let i = 0; i < txtBlocks.length; i++) {}

  txtBlocks.forEach((e) => {
    e["template_id"] = templateID;
    e["type"] = "Text";
    var subCoordinates = subBlockCoordinates(e, font.h1, e.width * 0.2);
    var heading = {
      block_id: 1,
      parent_block_id: e["block_id"],
      template_id: templateID,
      type: "Heading",
      x: subCoordinates.title.x,
      y: subCoordinates.title.y,
      w: subCoordinates.title.w,
      h: subCoordinates.title.h,
    };
    var items = {
      block_id: 2,
      parent_block_id: e["block_id"],
      template_id: templateID,
      type: "Items",
      x: subCoordinates.items.x,
      y: subCoordinates.items.y,
      w: subCoordinates.items.w,
      h: subCoordinates.items.h,
    };
    var prices = {
      block_id: 3,
      parent_block_id: e["block_id"],
      template_id: templateID,
      type: "Prices",
      x: subCoordinates.price.x,
      y: subCoordinates.price.y,
      w: subCoordinates.price.w,
      h: subCoordinates.price.h,
    };
    coordinates.sub_blocks.push(heading, items, prices);
  });
  coordinates.image_blocks.push(imageBlocks);
  coordinates.text_blocks.push(txtBlocks);
  return coordinates;
}
