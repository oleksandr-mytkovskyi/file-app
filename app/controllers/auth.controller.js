const auth = require('../utils/google-util');
const authServices = require('../services/auth.services');
const { default: axios } = require('axios');
const googleAuth = require('../utils/google-util');

exports.redirectSocial = (req, res, next) => {
    const url = googleAuth.getConnectionUrl();
    res.redirect(url);
}


exports.loginSocial = async (req, res, next) => {
    // отримали токени від google api 
    const code = req.query.code;

    const {tokens} = await auth.Oauth2Client.getToken(code);
    auth.Oauth2Client.setCredentials(tokens);
    console.log(tokens);
    const {access_token, refresh_token, scope, token_type, id_token} = tokens;
    //отримали дані про користувача з google арі
    const dataAccessToken = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${access_token}`);
    const dataTokenId = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`);
    // так норм копіювати дані? вони ж ніби не копіюються, а передаються по силці...
    const userData = {
        name: dataTokenId.data.name,
        email: dataTokenId.data.email,
        picture: dataTokenId.data.picture,
        socialAuth: {
            gUserId: dataAccessToken.data.user_id,
        }
    }
    authServices.loginSocial(req, res, next, userData);
}

exports.reg = (req, res, next) => {
    authServices.reg(req, res, next);
}

exports.login = (req, res, next) => {
    authServices.login(req, res, next);
}