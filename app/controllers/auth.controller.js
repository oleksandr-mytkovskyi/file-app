const auth = require('../utils/googleAuth');
const authServices = require('../services/auth.services');
const { default: axios } = require('axios');
const googleAuth = require('../utils/googleAuth');
const facebookAuth = require('../utils/facebookAuth');
const dotenv = require('dotenv');

dotenv.config();


// google auth
exports.redirectGoogle = (req, res, next) => {
    const url = googleAuth.getConnectionUrl();
    res.redirect(url);
}

exports.loginGoogle = async (req, res, next) => {
    const code = req.query.code;

    const {tokens} = await auth.Oauth2Client.getToken(code);
    auth.Oauth2Client.setCredentials(tokens);
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
    authServices.loginSocial(req, res, next, userData, {type: 'google'});
}
// Facebook auth
exports.redirectFacebook = (req, res, next) => {
    const url = facebookAuth.facebookLoginUrl;
    res.redirect(url);
}
// Facebook auth
exports.loginFacebook = async (req, res, next) => {

    const fbCode = req.query.code;
    const fbApiUrl = `https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${fbCode}`;
    const dataAccessToken = await axios.get(fbApiUrl);
    const fbApiUrl2 = `https://graph.facebook.com/me?fields=email,name&access_token=${dataAccessToken.data.access_token}`;
    const userData = await axios.get(fbApiUrl2);
    const {name, email, id} = userData.data;
    const newUserData = {
        name:name,
        email: email,
        socialAuth: {
            fbUserId: id
        }
    }
    authServices.loginSocial(req, res, next, newUserData, {type: 'facebook'});
}


// custom auth
exports.reg = (req, res, next) => {
    authServices.reg(req, res, next);
}

exports.login = (req, res, next) => {
    authServices.login(req, res, next);
}

exports.refresh = (req, res, next) => {
    if(!req.body.refreshToken) {
        throw new Error('Refresh token not found')
    }
    authServices.refresh(req, res, next);
}