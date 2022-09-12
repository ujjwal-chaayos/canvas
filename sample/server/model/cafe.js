const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const cafeSchema = new mongoose.Schema(
  {

    cafeDetail:{
        type: Object
    },
    cafeId:{
        type:String
    },
    s1:{
        type: ObjectId, default: undefined, ref: "screen"
    },
    s2:{
        type: ObjectId, default: undefined, ref: "screen"
    },
    s3:{
        type: ObjectId, default: undefined, ref: "screen"
    },
    s4:{
        type: ObjectId, default: undefined, ref: "screen"
    }
   
},

  { timestamps: true }
);

module.exports = new mongoose.model("Cafe", cafeSchema);