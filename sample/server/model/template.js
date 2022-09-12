const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const templateSchema = new mongoose.Schema(
  {

    templateDetail:{
        type: Object
    },
    templateId:{
        type:String
    },
    cafeTemplate:{
        type:Buffer
    },
    cafeImgOnlyMenu:{  
        type:Buffer
    },
    cafeFinalMenu:{
        type:Buffer
    },
    cafeTempCoordinates:{
        type:Object
    },
    cafeMenuMapping:{
        type:Object
    }
},

  { timestamps: true }
);

module.exports = new mongoose.model("Template", templateSchema);