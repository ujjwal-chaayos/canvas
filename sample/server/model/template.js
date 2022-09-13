const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const templateSchema = new mongoose.Schema(
  {

    templateDetail:{
        slot_detail:String,
        screen_detail:String
    },
    templateId:{
        type:String
    },
    screenId:{
        type:String
    },
    cafeId:{
        type:String
    },
    cafeTemplate:{
        type:Buffer
    },
    cafeImgOnlyMenuArray: [Buffer],
    cafeFinalMenuVideo:{
        type:String
    },
    cafeTempCoordinates:{
        type:Array
    },
    cafeMenuMapping:{
        type:Array
    }
},

  { timestamps: true }
);

module.exports = new mongoose.model("Template", templateSchema);