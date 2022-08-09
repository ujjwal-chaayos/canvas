const mongo = require("mongoose");

var screenSchema = mongo.Schema;

var dataSchema = new Schema({
  cafe: {
    type : Object,
    required : true 
},
timing: {
    type : Object,
    required : true 
},
style: {
    type : Object,
    required : true 
},
icons: {
    type : Object,
    required : true 
},
images: {
    type : Object,
    required : true 
},
titles: {
    type : Object,
    required : true 
},
items: {
    type : [Object],
    required : true 
},
prices: {
    type : Object,
    required : true 
},
  
});

var screen = mongoose.model("screen", screenSchema);
// Server path
const url = 'mongodb://localhost:27017/';

const dbname = "local";

function connect(){
   mongo.connect(url, (err,client)=>{
      if(!err) {
         console.log("successful connection with the database");
      }
      else
         console.log("Error in the connectivity");
   })
}

function getscreendata(callback) {
    screen.find({}).exec(function (err, result) {
      if (err) throw err;
      callback(result);
    });
  }
  
  
    
 module.exports={
   connect,
   getscreendata,
 };