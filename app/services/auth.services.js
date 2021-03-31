const jwt = require('../utils/jwt');
const db = require('../model/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = db.user;

exports.loginSocial = async (req, res, next, userData) => {
    try {
        const accessToken = await jwt.createToken(userData.email, userData.name, { type: 'access' });
        const refreshToken = await jwt.createToken(userData.email, userData.name, { type: 'refresh' });
        userData.refreshToken = refreshToken;
        const findUser = await User.find({ email: `${userData.email}` });
        // перевірили чи є такий юзер, якщо нема, то створили
        if (findUser.length === 0) {
            const user = new User(userData);
            await user.save(user);
        }

        res.status(200).send({
            success: true,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (e) {
        res.status(400).send({
            message: e.message,
        })
    }
}



exports.reg = async (req, res, next) => {
    try {
        const {email, password, name} = req.body;
        const findUser = await User.find({ email: email });
        if(findUser.length !== 0) {
            const e = new Error('email already in use, maybe you need login');
            e.status = 400;
            throw e;
        }
        // bcrypt
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            try {
                if (err) {
                    throw new Error('Error in hash callback');
                }
              
                const accessToken = await jwt.createToken( email, name, {type: 'access'});
                const refreshToken = await jwt.createToken( email, name, {type: 'refresh'});

                const field = {
                    name: name,
                    email: email,
                    password: hash,
                    refreshToken: refreshToken
                };
                const user = new User(field);
                await user.save(user);
                res.send({
                    success: true,
                    accessToken,
                    refreshToken,
                });
            } catch (e) {
                next(e);
            }
        });
        
    } catch(e) {
        next(e);
    }
}  

exports.login = (req, res, next) => {

}