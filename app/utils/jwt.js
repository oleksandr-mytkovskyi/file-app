const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require("path");

const publicUrlA = path.resolve('./publicKeyA');
const privatUrlA = path.resolve('./privatKeyA');
const publicUrlR = path.resolve('./publicKeyR');
const privatUrlR = path.resolve('./privatKeyR');

const getKey = (url) => {
    return fs.readFileSync(url, 'utf8');   
}

const publickKeyAccess = process.env.publicKeyA ? process.env.publicKeyA : getKey(publicUrlA);
const privatKeyAccess = process.env.publicKeyA ? process.env.privatKeyA : getKey(privatUrlA);

const publickKeyRefresh = process.env.publicKeyA ? process.env.publicKeyR : getKey(publicUrlR);
const privatKeyRefresh = process.env.publicKeyA ? process.env.privatKeyR : getKey(privatUrlR);

// exports.refreshTokens = async (email, name) => {
//     const newAccessToken = await jwt.createToken(email, name, {type: 'access'});
//     const newRefreshToken = await jwt.createToken(email, name, {type: 'refresh'});
    
//     const fieldToken = {
//         refreshToken: newRefreshToken
//     }
//     await RefreshToken.update(fieldToken, {
//         where: { userId: id }
//     });
//     return {
//         sucess: true,
//         accessToken: newAccessToken,
//         refreshToken: newRefreshToken
//     };   

// }
exports.createToken = async (email, name, options) => {
    let signature = null;
    let expiresIn = null;
    switch (options.type) {
        case 'access':
            signature = privatKeyAccess;
            expiresIn = '1h';
            break;
        case 'refresh':
            signature = privatKeyRefresh;
            expiresIn = '30d';
            break;
        default:
            break;
    }
    return jwt.sign(
        { 
           email,
           name
        },
        signature,
        {   
            algorithm: 'RS256',
            expiresIn: expiresIn ,
            issuer:  'skysoft-tech',
        },
      );
}

exports.checkToken = (token, options) => {
    try {
        let signature = null;
        switch (options.type) {
            case 'access':
                signature = publickKeyAccess;
                break;
            case 'refresh':
                signature = publickKeyRefresh;
                break;
            default:
                break;
        }
        const decoded = jwt.verify(token, signature);
        return decoded;
    } catch (e) {
        return false;
    }
}
