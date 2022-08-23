
require("dotenv").config();

const mongoose = require("mongoose");
const Menu = require("../model/menu");

const {mergeTemplateBackground}= require('../services/mergeTemplateBackground')



exports.uploadTemplate = (req, res) => {
        console.log("uploadTemplate Called")
        // console.log(req);
        let data= req.body;
   
        console.log(req.files);
        mergeTemplateBackground(req.files.fileImage, req.files.fileImage);
        res.send("Hello World!");
}

exports.setImageMapping = (req, res) => {
        console.log(req);
        res.send("Hello World! ");
}

exports.setItemMapping = (req, res) => {

}

