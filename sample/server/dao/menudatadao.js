//readbyid
function read(callback) {
    screen.find({}).exec(function (err, result) {
      if (err) throw err;
      callback(result);
    });
  }
function write(screendata, callback) {
    // var postdata = new screen({
    //     cafe: screendata.cafe,
    //     timing: screendata.timing,
    //     style: screendata.style,
    //     icons: screendata.icons,
    //     images: screendata.images,
    //     titles: screendata.titles,
    //     items: screendata.items,
    //     prices: screendata.prices,
    //     });
    postdata.save(function (err) {
    if (err) throw err;
    callback();
    });
}
//delete by id
function del(callback) {
    screen.deleteMany({}, function (err) {
      if (err) throw err;
      callback();
    });
  }
  module.exports={  
    readAll,
    write,
    del
  };