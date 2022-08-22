
require("dotenv").config();

const mongoose = require("mongoose");
const Menu = require("../model/menu");

const {mergeTemplateBackground}= require('../services/mergeTemplateBackground')



exports.uploadTemplate = (req, res) => {
        console.log("uploadTemplate Called")
        let data= req.body;
        let src1 =     "data:image/png;base64,"+ btoa(String.fromCharCode.apply(null, [data['file1']['imageContent']]));
        let src2 =     "data:image/png;base64,"+ btoa(String.fromCharCode.apply(null, [data['file2']['imageContent']]));

        mergeTemplateBackground(data['file1']['imageInfo'],data['file2']['imageInfo']);
        res.send("Hello World!");
}

exports.setImageMapping = (req, res) => {
       
}

exports.setItemMapping = (req, res) => {

}

