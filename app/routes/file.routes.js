const router = require('express').Router();
const file = require('../controllers/file.controller.js');
const auth = require('../middleware/auth.middleware');
const MD = require('../middleware/auth.middleware');
module.exports = app => {
    // Create a new file in Azure and DB
    router.post("/", file.saveFile);
    // Get all file with DB
    router.get("/", file.getFile);
 
    app.use('/file', MD.authMiddleware,  router);
  };