require("dotenv").config();
const mongoose = require("mongoose");
const drawItemText = require("../services/drawItemText");
const drawProductImage = require("../services/drawProductImage");
const fs = require("fs");
const axios = require("axios");
const Cafe = require("../model/cafe");
const Screen = require("../model/screen");
const Template = require("../model/template");

const {
  mergeTemplateBackground,
} = require("../services/mergeTemplateBackground");
exports.uploadTemplate = (req, res) => {
  console.log("uploadTemplate Called");
  let images = [];
  for (var file in req.files) {
    images.push(req.files[file]);
  }
  let response = mergeTemplateBackground(images[0], images[1]);
  res.send(response);
};
exports.uploadProductImages = (req, res) => {
  console.log("uploadProductImages called");
  let images = [];
  let coordinnates = JSON.parse(req.body.coordinates);
  for (var file in req.files) {
    if (file === "background") {
      continue;
    }
    images.push({ block_id: file, imageInfo: req.files[file].data });
  }

  let response = drawProductImage(req.files.background, images, coordinnates);
  res.send(response);
};

exports.setItemMapping = async (req, res) => {
  console.log("setmapping called");
  let images = [];
  for (var file in req.files) {
    if (file === "background" || file === "template") {
      continue;
    } else {
      images.push(req.files[file].data);
    }
  }
  let data = JSON.parse(req.body.cafeIds);

  let myId = [];
  myId.push(data[0]);
  let response = await drawItemText(
    images,
    JSON.parse(req.body.dummy_data),
    JSON.parse(req.body.coordinates),
    myId,
    false
  );
  let mydata = {};
  mydata.value = response;

  res.send(mydata);
};
exports.setAllItemMapping = async (req, res) => {
  console.log("setallmapping called");
  let images = [];
  for (var file in req.files) {
    if (file === "background" || file === "template") {
      continue;
    } else {
      images.push(req.files[file].data);
    }
  }

  let response = await drawItemText(
    images,
    JSON.parse(req.body.dummy_data),
    JSON.parse(req.body.coordinates),
    JSON.parse(req.body.cafeIds),
    true
  );
  let mydata = {};
  mydata.value = response;

  let slot_details = {
    t0: "DEFAULT",
    t1: "DAY_SLOT_BREAKFAST",
    t2: "DAY_SLOT_LUNCH",
    t3: "DAY_SLOT_EVENING",
    t4: "DAY_SLOT_DINNER",
    t5: "DAY_SLOT_POST_DINNER",
    t6: "DAY_SLOT_OVERNIGHT",
  };
  let screen_details = {
    s1: "MAIN",
    s2: "OFFERS",
    s3: "CHAI",
    s4: "MEAL",
  };
  let templateId = req.body.templateId;
  let screenId = req.body.screenId;
  let cafeIds = JSON.parse(req.body.cafeIds);
  let cafeTemplate = req.files.template.data;
  let cafeImgOnlyMenuArray = images;
  let cafeTempCoordinates = JSON.parse(req.body.coordinates);
  let cafeMenuMapping = JSON.parse(req.body.dummy_data);
  let screenBackground = req.files.background.data;

  for (let i in cafeIds) {
    Cafe.findOne({ cafeId: cafeIds[i] }, (err, cafeFound) => {
      if (cafeFound) {
        let cafeObjectId = cafeFound._id;
        let screen = new Screen({
          screenId: screenId,
          cafeId: cafeIds[i],
          screenBackground: screenBackground,
          screenDetail: {
            screen_detail: screen_details[screenId],
          },
          cafeObjectId: cafeObjectId,
        });
        screen.save((err, screen) => {
          if (err) {
            console.log("err", err);
          }
          let screenObjectId = screen._id;
          let template = new Template({
            templateId: templateId,
            screenId: screenId,
            cafeId: cafeIds[i],
            cafeTemplate: cafeTemplate,
            cafeTempCoordinates: cafeTempCoordinates,
            cafeImgOnlyMenuArray: cafeImgOnlyMenuArray,
            cafeMenuMapping: cafeMenuMapping,
            templateDetail: {
              slot_detail: slot_details[templateId],
              screen_detail: screen_details[screenId],
            },
            cafeObjectId: cafeObjectId,
            screenObjectId: screenObjectId,
          });
          template.save((err, template) => {
            if (err) {
              console.log("err", err);
            }

            console.log("template saved in db for cafe id", cafeIds[i]);
          });
          console.log("screen saved in db for cafe id", cafeIds[i]);
        });
      } else {
        console.log("cafe is not available in database!!!");
      }
    });
  }
  res.send(mydata);
};

exports.getUnitMenu = async (req, res) => {
  let cafes = req.body.cafes;
  let slot = req.body.slot;
  let slot_details = {
    t0: "DEFAULT",
    t1: "DAY_SLOT_BREAKFAST",
    t2: "DAY_SLOT_LUNCH",
    t3: "DAY_SLOT_EVENING",
    t4: "DAY_SLOT_DINNER",
    t5: "DAY_SLOT_POST_DINNER",
    t6: "DAY_SLOT_OVERNIGHT",
  };
  let data = [];
  let daySlot = slot_details[slot];
  let dummy_data_response = await axios.get(
    "http://15.206.45.59:8787/app-cache/unit/overall/1000/cafe/" +
      cafes[0] +
      "/" +
      daySlot +
      "?partnerId=1&brandId=1"
  );
  let dummyData = dummy_data_response.data["menuSequence"]["category"];
  for (let i = 0; i < dummyData.length; i++) {
    data.push(dummyData[i].name.toLowerCase());
  }
  let tempData = {};
  let validIds = [];
  for (let i = 0; i < cafes.length; i++) {
    console.log(cafes[i])
    let response = await axios.get(
      "http://15.206.45.59:8787/app-cache/unit/overall/1000/cafe/" +
        cafes[i] +
        "/" +
        daySlot +
        "?partnerId=1&brandId=1"
    );
    let flag = true;
    let key = cafes[i];
    tempData[key] = response.data;
    let cafeDetail = response.data["detail"];
    let categories = response.data["menuSequence"]["category"];

    for (var j = 0; j < parseInt(categories.length); j++) {
      var catName = categories[j]["name"].toLowerCase();
      if (
        catName !== "chaayos select" &&
        catName !== "treniding now" &&
        catName !== "chaayos special" &&
        catName !== "new"
      ) {
        if (!data.includes(catName)) {
          //console.log("here")
          flag = false;
          break;
        }
      }
    }

    if (flag) {
      validIds.push(cafes[i]);
      Cafe.findOne({ cafeId: cafeDetail["id"]["id"] }, (err, cafeFound) => {
        if (cafeFound) {
          console.log(
            "Cafe with id ",
            cafeDetail["id"]["id"],
            " already exists!!!"
          );
        } else {
          const cafe = new Cafe({
            cafeId: cafeDetail["id"]["id"],
            cafeDetail: cafeDetail,
          });
          cafe.save((err, cafe) => {
            if (err) {
              console.log("cafe not saved...");
            }

            console.log("New Cafe created in db with id", cafe["cafeId"]);
          });
        }
      });
    }
  }
  console.log(validIds);
  let filepath = __dirname + "../../data/Menus/tempMenu.txt";
  let myData = await JSON.stringify(tempData);

  fs.writeFile(filepath, myData, function (err) {
    if (err) {
      res.send("error");
      return console.log(err);
    }
    console.log("Menu saved successfully!!");
    res.send("success");
  });
};
