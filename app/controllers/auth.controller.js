const authServices = require('../services/auth.services');

exports.login = (req, res, next) => {
    authServices.login(req, res, next);
}