
require("dotenv").config();

const mongoose = require("mongoose");
const Menu = require("../model/menu");

const {mergeTemplateBackground}= require('../services/mergeTemplateBackground')



exports.uploadTemplate = (req, res) => {
        console.log("uploadTemplate Called")
        let data= req.body;
     let src =   URL.createObjectURL(
        Buffer.from([data['file1']['imageContent']], { type: 'image/png' } )
              );
        console.log( src);

       // mergeTemplateBackground(data['file1'],data['file2']);
        res.send("Hello World!");
}

exports.setImageMapping = (req, res) => {

}

exports.setItemMapping = (req, res) => {

}

