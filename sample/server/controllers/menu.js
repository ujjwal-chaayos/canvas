
require("dotenv").config();


const {mergeTemplateBackground}= require('../services/mergeTemplateBackground')



exports.uploadTemplate = (req, res) => {
        console.log("uploadTemplate Called")
        // console.log(req);
        let images =[];

        console.log(req.files);
        for(var file in req.files){
                images.push(req.files[file]);
            }
        console.log(images);
       let response =  mergeTemplateBackground(images[0], images[1]);
        res.send(response);
}

exports.setImageMapping = (req, res) => {
        console.log(req);
        res.send("Hello World! ");
}

exports.setItemMapping = (req, res) => {

}

