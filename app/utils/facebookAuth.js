const queryString = require('query-string');
const dotenv = require('dotenv');

dotenv.config();

const stringifiedParams = queryString.stringify({
  client_id: process.env.FACEBOOK_CLIENT_ID,
  redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
  scope: ['email', 'user_friends'].join(','), // comma seperated string
  response_type: 'code',
  auth_type: 'rerequest',
  // display: 'popup',
});

const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;


module.exports = {
  facebookLoginUrl
}