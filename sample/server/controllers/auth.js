exports.loginService = (req, res) => {
    console.log("auth Called");

    let id=req.body.userId;
    
    if(id==='100026'){
        res.send("Pass");
    }
    else{
        res.send("Fail");
    }
  };