
require("dotenv").config();

const mongoose = require("mongoose");
const Menu = require("../model/menu");
const drawProductImage = require("../services/drawProductImage");

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
        console.log( req.files);
       let coordinnates =JSON.parse(req.body.coordinates);
        for(var file in req.files){
                if(file === 'background'){
                        continue;
                }
                images.push({"block_id":file,
                        "imageInfo":req.files[file].data});
            }
        console.log(images);
        console.log(req.files.background);
          //  console.log(background);
      let response =  drawProductImage(req.files.background,images,coordinnates);
       res.send(response);
}

exports.setItemMapping = (req, res) => {
    
}

