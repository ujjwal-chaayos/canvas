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
  console.log(req.files);
  console.log(req.body);
  for (var file in req.files) {
    if (file === "background" || file === "template") {
      continue;
    } else {
      images.push(req.files[file].data);
    }
  }
  let data = JSON.parse(req.body.cafeIds);
  //console.log(JSON.parse(req.body.dummy_data));
  let myId = [];
  myId.push(data[0]);
  let response = await drawItemText(
    images,
    JSON.parse(req.body.dummy_data),
    JSON.parse(req.body.coordinates),
    myId
  );
  let mydata = {};
  mydata.value = response;
  //console.log(mydata);
  res.send(mydata);
};
exports.setAllItemMapping = async (req, res) => {
  console.log("setallmapping called");
  //console.log(req.files);
  //console.log(req.body);
  let images = [];
  for (var file in req.files) {
    if (file === "background" || file==="template") {
      continue;
    } else {
      images.push(req.files[file].data);
    }
  }
  //console.log(req.body.screenId,req.body.templateId)
  let response = await drawItemText(
    images,
    JSON.parse(req.body.dummy_data),
    JSON.parse(req.body.coordinates),
    JSON.parse(req.body.cafeIds)
  );
  let mydata = {};
  mydata.value = response;
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");
  console.log("all process done by me");

    let slot_details={
      't0':'DEFAULT',
      't1':'DAY_SLOT_BREAKFAST',
      't2':'DAY_SLOT_LUNCH',
      't3':'DAY_SLOT_EVENING',
      't4':'DAY_SLOT_DINNER',
      't5':'DAY_SLOT_POST_DINNER',
      't6':'DAY_SLOT_OVERNIGHT'
    }
    let screen_details={
      's1':'MAIN',
      's2':'OFFERS',
      's3':'CHAI',
      's4':'MEAL'
    }
    //console.log(req.body.templateId);
    let templateId=req.body.templateId;
    let screenId=req.body.screenId;
    let cafeIds=JSON.parse(req.body.cafeIds);
    let cafeTemplate=req.files.template.data;
    let cafeImgOnlyMenuArray=images;
    let cafeTempCoordinates=JSON.parse(req.body.coordinates);
    let cafeMenuMapping=JSON.parse(req.body.dummy_data);
    console.log(cafeImgOnlyMenuArray);
    //console.log(typeof(templateId),typeof(screenId),typeof(cafeIds),typeof(cafeTemplate),typeof(cafeImgOnlyMenuArray),typeof(cafeTempCoordinates),typeof(cafeMenuMapping));

    //console.log(slot_details[templateId],screen_details[screenId])
   // console.log(req.body.templateId,req.body.screenId,req.body.cafeIds[0],req.files.template,images,req.body.coordinates,req.body.dummy_data)
  for(let i in cafeIds){
    let template=new Template({
        templateId:templateId,
        screenId:screenId,
        cafeId:cafeIds[i],
        cafeTemplate:cafeTemplate,
        cafeTempCoordinates:cafeTempCoordinates,
        cafeImgOnlyMenuArray:cafeImgOnlyMenuArray,
        cafeMenuMapping:cafeMenuMapping,
        templateDetail:{
          slot_detail:slot_details[templateId],
          screen_detail:screen_details[screenId]
        }
    })
    template.save((err, template) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      console.log("template saved in db for cafe id",cafeIds[i]);
    });

  }
  res.send(mydata);
  
};

exports.getUnitMenu = async (req, res) => {
  //console.log(req.body);
  let requestLength = req.body.length;

  let tempData = {};
  for (let i = 0; i < requestLength; i++) {
    let response = await axios.get(
      "https://app.chaayos.com/app-cache/unit/overall/1000/CAFE/" + req.body[i]
    );
    //console.log("getting response for cafeid", req.body[i]);
    let key = req.body[i];
    //console.log(key);
    tempData[key] = response.data;
    let cafeDetail = response.data["detail"];
    Cafe.findOne({cafeId:cafeDetail['id']['id']},(err,cafeFound)=>{
      if(cafeFound){
          console.log("Cafe with id ",cafeDetail['id']['id'], " already exists", cafeFound)
      }
      else{
        const cafe = new Cafe({
                  cafeId: cafeDetail['id']['id'],
                  cafeDetail: cafeDetail
                });
        cafe.save((err, cafe) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          }
          console.log(cafe);
          console.log("cafe saved in db...");
        });
      }
    });
  }

  let filepath = __dirname + "../../data/Menus/tempMenu.txt";
  let myData = await JSON.stringify(tempData);

  fs.writeFile(filepath, myData, function (err) {
    if (err) {
      res.send("error");
      return console.log(err);
    }
    console.log("Hello World > helloworld.txt");
    res.send("success");
  });
};
