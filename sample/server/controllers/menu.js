require("dotenv").config();
const mongoose = require("mongoose");
const Menu = require("../model/menu");
const drawItemText = require("../services/drawItemText");
const drawProductImage = require("../services/drawProductImage");
const fs=require('fs');
const axios=require('axios');

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
    if (file === "background") {
      continue;
    } else {
      images.push(req.files[file].data);
    }
  }

  let response = await drawItemText(
    images,
    JSON.parse(req.body.dummy_data),
    JSON.parse(req.body.coordinates),
    JSON.parse(req.body.cafeIds)
  );
  let mydata = {};
  mydata.value = response;
  console.log(mydata);
  res.send(mydata);
};


exports.getUnitMenu = async (req,res) => {
  //console.log(req.body);
  let requestLength=req.body.length;
  
  let tempData = {};
  for(let i=0;i<requestLength;i++){
    let response = await axios.get("https://app.chaayos.com/app-cache/unit/overall/1000/CAFE/"+req.body[i]);
    console.log("getting response for cafeid",req.body[i]);
    let key=req.body[i];
    console.log(key);
    tempData[key] = response.data;
  }

  let filepath=__dirname+'../../data/Menus/tempMenu.txt';
  let myData= await JSON.stringify(tempData);
  fs.writeFile(filepath, myData, function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
  //console.log(JSON.stringify(cafeMenuArr)); 
//await fs.writeFileSync('./tmMenu/temp.txt', JSON.stringify(cafeMenuArr))
//   console.log(typeof(JSON.stringify(cafeMenuArr)))
// fs.writeFileSync("/tmpMenu/file.json", JSON.stringify(cafeMenuArr), function(err) {
//   if(err) {
//       return console.log("err");
//   }
//   console.log("The file was saved!");
// }); 
  //res.send("success");
}