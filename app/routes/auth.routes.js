const googleAuth = require('../utils/google-util');
const router = require('express').Router();
const auth = require('../controllers/auth.controller');

module.exports = app => {

  router.get("/login/google", (req, res, next) => {
    const url = googleAuth.getConnectionUrl();
    res.redirect(url);
  });

  router.get("/redirect/google", (req, res, next) => {
    auth.login(req, res, next);
  });

  app.use('/auth', router);
};