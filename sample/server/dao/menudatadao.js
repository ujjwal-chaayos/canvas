const mongoose = require("mongoose");
const Menu = require("../model/menu");

function getAll() {
  const menus = await Menu.find({});
  try {
    return "found"
  } catch (error) {
    console.log(error)
  }
  }

  function getById(id) {
    const menus = await User.findById(id, function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          return docs;
      }
  });
    }

function write(data) {
  const menu = new Menu(data);
  try {
    await menu.save();
    return "data saved"
  } catch (error) {
    console.log(error)
  }
}

function deleteByQuery(query) {
  screen.deleteOne({ query }, function (err) {
    if (err) throw err;
   
  });
}

function deleteById(id) {
    screen.deleteOne({ _id: id }, function (err) {
      if (err) throw err;
     
    });
  }
  module.exports={  
    getAll,getById,
    write,
    deleteByQuery,deleteById
  };