const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const screenSchema = new mongoose.Schema(
  {

    screenDetail:{
        type: Object
    },
    screenId:{
        type:String
    },
    t0:{
        type: ObjectId, default: undefined, ref: "template"
    },
    t1:{
        type: ObjectId, default: undefined, ref: "template"
    },
    t2:{
        type: ObjectId, default: undefined, ref: "template"
    },
    t3:{
        type: ObjectId, default: undefined, ref: "template"
    },
    t4:{
        type: ObjectId, default: undefined, ref: "template"
    },
    t5:{
        type: ObjectId, default: undefined, ref: "template"
    },
    t6:{
        type: ObjectId, default: undefined, ref: "template"
    },
    screenBackground:{
        type:Buffer
    }
},

  { timestamps: true }
);

module.exports = new mongoose.model("Screen", screenSchema);