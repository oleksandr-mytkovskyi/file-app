const googleAuth = require('../utils/google-util');
const router = require('express').Router();
const auth = require('../controllers/auth.controller');

module.exports = app => {

  router.get("/", (req, res, next) => {
      const url = googleAuth.getConnectionUrl();
      res.status(200).send({
        url: url
      });
    });

    router.get("/redirect", (req, res, next) => {
      auth.login(req, res, next);
    });
 
    app.use('/auth', router);
  }; 