const googleAuth = require('../utils/google-util');
const router = require('express').Router();
const auth = require('../controllers/auth.controller');

module.exports = app => {

  router.get("/login/google", auth.redirectSocial);

  router.get("/redirect/google", auth.loginSocial);

  // router.get("/login/facebook", (req, res, next) => {
  //   const url = googleAuth.getConnectionUrl();
  //   res.redirect(url);
  // });

  router.post("/login/", auth.login);

  router.post("/reg", auth.reg);

  router.post("/refresh", (req, res, next) => {
    // const url = googleAuth.getConnectionUrl();
    // res.redirect(url);
  });

  app.use('/auth', router);
};