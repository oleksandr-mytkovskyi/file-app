const axios = require('axios');

async function authMiddleware(req, res, next) {
    try {
        // console.log(req);
        const accessToken = req.headers.authorization;
        if(!accessToken) {
            throw new Error('Does not token, you need authorization')
        }
        const token = accessToken.split(' ')[1];
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
        // .then(data => {
        //     console.log(data);
        // })
        console.log(response);
        // запрос по арі google https://oauth2.googleapis.com/tokeninfo?id_token=
        next();
    } catch(e) {
        res.status(401).send({Error: 'You must authorization'});
    }
}

module.exports = {
    authMiddleware
}