const googleAuth = require('../utils/googleAuth');
const router = require('express').Router();
const auth = require('../controllers/auth.controller');
const { userSchemaLogin, userSchemaReg } = require('../validators/auth.validator');
const MD = require('../middleware/authValidate.middleware');
module.exports = app => {

  router.get("/login/google", auth.redirectGoogle);

  router.get("/redirect/google", auth.loginGoogle);

  router.get("/login/facebook", auth.redirectFacebook);

  router.get("/redirect/facebook", auth.loginFacebook);

  // router.get("/login/facebook", (req, res, next) => {
  //   const url = googleAuth.getConnectionUrl();
  //   res.redirect(url);
  // });

  router.post("/login/", MD.authValidateMiddleware(userSchemaLogin) ,auth.login);

  router.post("/reg", MD.authValidateMiddleware(userSchemaReg), auth.reg);

  router.post("/refresh", auth.refresh);

  app.use('/auth', router);
};