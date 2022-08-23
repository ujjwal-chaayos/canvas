require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Menu = require("../model/menu");
const {mergeTemplateBackground} = require("../services/mergeTemplateBackground");

exports.uploadTemplate = (req, res) => {
  var app= express();
  // app.get("https://cafes.chaayos.com/oneIndiaBulls.jpg",(req,res)=>{
  //   console.log("@@@@@@@@@@@@");
  //   console.log(res);
  // })
  console.log("uploadTemplate Called");
  let data = req.body; 
  console.log(data);
  console.log("hi i m in");

// let src1 ="data:image/png;base64," + btoa(String.fromCharCode.apply(null, [data["file1"]["imageContent"]]));
 //let src2 ="data:image/png;base64," + btoa(String.fromCharCode.apply(null, [data["file2"]["imageContent"]]));
mergeTemplateBackground(data['file1'],data['file2']);
  res.send("Hello World!");
};


exports.setImageMapping = (req, res) => {};

exports.setItemMapping = (req, res) => {};
