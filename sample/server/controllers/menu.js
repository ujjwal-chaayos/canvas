require("dotenv").config();

const mongoose = require("mongoose");
const Menu = require("../model/menu");

const {mergeTemplateBackground}= require('../services/mergeTemplateBackground')



exports.uploadTemplate = (req, res) => {
        console.log("uploadTemplate Called")
        let data= req.body;
        console.log(data);
        mergeTemplateBackground(data['file1'],data['file2']);
        res.send("Hello World!");
}

exports.setImageMapping = (req, res) => {
       
}

exports.setItemMapping = (req, res) => {

}

