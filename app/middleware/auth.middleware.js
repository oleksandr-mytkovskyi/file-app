const axios = require('axios');
const jwt = require('../utils/jwt');

async function authMiddleware(req, res, next) {
    try {
        // console.log(req);
        const accessToken = req.headers.authorization;
        if(!accessToken) {
            throw new Error('Does not token, you need authorization')
        }
        const token = accessToken.split(' ')[1];
        jwt.checkToken(token, {type: 'access'});
        next();
    } catch(e) {
        res.status(401).send({Error: e.message || 'You must authorization'});
    }
}

module.exports = {
    authMiddleware
}