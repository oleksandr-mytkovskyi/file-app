const router = require('express').Router();
const file = require("../controllers/file.controller.js");

module.exports = app => {
    // Create a new file in Azure and DB
    router.post("/", file.saveFile);
    // Get all file with DB
    router.get("/", file.getFile);
 
    app.use('/file', router);
  };