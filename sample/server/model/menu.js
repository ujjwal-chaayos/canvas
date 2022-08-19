const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    menu_id:{
        require:true,
        type: String
    },
    cafe_detail:{
        require:true,
        type: String
    },
    cafe_id:{
        require:true,
        type:String
    }

  { timestamps: true }
});

module.exports = new mongoose.model("Menu", menuSchema);