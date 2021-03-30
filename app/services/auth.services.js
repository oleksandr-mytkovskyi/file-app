const auth = require('../utils/google-util');

exports.login = async (req, res, next) => { 
    const code = req.query.code;

    // res.status(200).send({ok:'ok'})
    
    const {tokens} = await auth.Oauth2Client.getToken(code);
    auth.Oauth2Client.setCredentials(tokens);
    // логіка роботи з токенами
    console.log(tokens);
    res.redirect(`http://localhost:3000/hello.html?access_token=${tokens.access_token}`)
    // res.status(200).send({login:tokens});
}
