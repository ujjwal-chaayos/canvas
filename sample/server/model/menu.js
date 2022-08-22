const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    menuId:{
        required:true,
        type: String
    },
    cafeDetail:{
        required:true,
        type: String
    },
    cafeId:{
        required:true,
        type:String
    },
    cafeTemplate:{
        required:true,
        type:Buffer
    },
    cafeBackground:{
        required:true,
        type:Buffer
    },
    cafeImgOnlyMenu:{
        required:true,
        type:Buffer
    },
    cafeFinalMenu:{
        required:true,
        type:Buffer
    },
    cafeTempCoordinates:{
        required:true,
        type:Object
    },
    cafeMenuJson:{
        required:true,
        type:Object
    }
},

  { timestamps: true }
);

module.exports = new mongoose.model("Menu", menuSchema);