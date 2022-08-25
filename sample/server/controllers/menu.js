
require("dotenv").config();

const mongoose = require("mongoose");
const Menu = require("../model/menu");

const {mergeTemplateBackground}= require('../services/mergeTemplateBackground')



exports.uploadTemplate = (req, res) => {
        console.log("uploadTemplate Called")
        // console.log(req);
        let images =[];
        for(var file in req.files){
                images.push(req.files[file]);
            }
        let response =  mergeTemplateBackground(images[0], images[1]);
        console.log(response);
        res.send(response);
}

exports.setImageMapping = (req, res) => {
        console.log(req);
        res.send("Hello World! ");
}

exports.setItemMapping = (req, res) => {

}

