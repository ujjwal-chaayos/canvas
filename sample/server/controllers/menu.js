require("dotenv").config();

const mongoose = require("mongoose");
const Menu = require("../model/menu");
const drawProductImage = require("../services/drawProductImage");

const {mergeTemplateBackground}= require('../services/mergeTemplateBackground')



exports.uploadTemplate = (req, res) => {
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
        for(var file in req.files){
                if(file === 'background'){
                        continue;
                }
                images.push({"block_id":file,
                        "imageInfo":req.files[file].data});
            }
       
          //  console.log(background);
      let response =  drawProductImage(req.files.background,images,coordinnates);
       res.send(response);
}

exports.generateGenericMenu = (req, res) => {
    
}