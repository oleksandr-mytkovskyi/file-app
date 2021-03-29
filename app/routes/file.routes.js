module.exports = app => {
    const file = require("../controllers/file.controller.js");
  
    var router = require("express").Router();
  
    // Create a new file in Azure and DB
    router.post("/", file.saveFile);
    // Get all file with DB
    router.get("/", file.getFile);
 
    app.use('/file', router);
  };