const googleAuth = require('../utils/google-util');
const router = require('express').Router();
const auth = require('../controllers/auth.controller');

module.exports = app => {

  router.get("/login/google", auth.redirectGoogle);

  router.get("/redirect/google", auth.loginGoogle);

  // router.get("/login/facebook", (req, res, next) => {
  //   const url = googleAuth.getConnectionUrl();
  //   res.redirect(url);
  // });

  router.post("/login/", auth.login);

  router.post("/reg", auth.reg);

  router.post("/refresh", auth.refresh);

  app.use('/auth', router);
};