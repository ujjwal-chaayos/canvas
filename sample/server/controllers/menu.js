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
  let cafeId = [];
  cafeId.push( (JSON.parse(req.body.cafeIds))[0]);
  let templateId = [];
  templateId.push(req.body.templateId);
  let screenId = [];
  screenId.push( req.body.screenId);
  let response = await drawItemText(
    images,
    JSON.parse(req.body.dummy_data),
    JSON.parse(req.body.coordinates),
    cafeId,screenId,templateId,false
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

  let templateId=req.body.templateId;
    let screenId=req.body.screenId;
    let cafeIds=JSON.parse(req.body.cafeIds);
    let cafeTemplate=req.files.template.data;
    let cafeImgOnlyMenuArray=images;
    let cafeTempCoordinates=JSON.parse(req.body.coordinates);
    let cafeMenuMapping=JSON.parse(req.body.dummy_data);

  let response = await drawItemText(
    images,
    cafeMenuMapping,
    cafeTempCoordinates,
    cafeIds,screenId,templateId,true
  );
  
  let mydata = {};
  mydata.value = response;
   
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
        // res.status(500).json({
        //   error: err,
        // });
        console.log(err);
      }
      console.log("template saved in db for cafe id",cafeIds[i]);
    });

  }
  res.send(mydata);
  
};

exports.getUnitMenu = async (req, res) => {
let cafes =JSON.parse( req.body.cafes);
let dummyData = JSON.parse(req.body.dummy_data);
let data =[];
for(let i = 0; i < dummyData.length; i++){
  data.push(dummyData[i].value);
}
console.log(req.body);
  let tempData = {};
  let validIds = [];
  for (let i = 0; i < cafes.length; i++) {
    let flag = true;
    let response = await axios.get(
      "https://app.chaayos.com/app-cache/unit/overall/1000/CAFE/" + cafes[i]
    );

    let key = cafes[i]; 

    tempData[key] = response.data;
    let cafeDetail = response.data["detail"];
    let categories = response.data["menuSequence"]["category"];
    for(let j=0;j<categories.length;j++){
      if(categories[j]['name'] !== 'Chaayos Select' && categories[j]['name'] !== 'Trending Now' && categories[j]['name'] !== 'Chaayos Special' && categories[j]['name'] !== 'New'){
        if(!data.includes(categories[j].name)){
          flag=false;
          break;
        }
      }
    
    }
    
    if(flag){
      validIds.push(cafes[i]);
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
              console.log(err);
            }
            console.log(cafe);
            console.log("cafe saved in db...");
          });
        }
      });
    }
  }

  let filepath = __dirname + "../../data/Menus/tempMenu.txt";
  let myData = await JSON.stringify(tempData);

  fs.writeFile(filepath, myData, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Hello World > helloworld.txt");
  });
  console.log(validIds);
  res.send(validIds);
};
