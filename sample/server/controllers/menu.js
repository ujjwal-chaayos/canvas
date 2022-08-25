
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
        res.send(response);
}

exports.uploadProductImages = (req, res) => {
        let images =[];
       console.log("uploadProductImages");
        
       let coordinnates =JSON.parse(req.body.coordinates);
       let background =req.body.background;
        for(var file in req.files){
                images.push({"block_id":file,
                        "imageInfo":req.files[file].data});
            }
       // let response =  mergeTemplateBackground(images[0], images[1]);
        //console.log("background",background);
        console.log("images",images);
        res.send("ack");
}

exports.setItemMapping = (req, res) => {

}

