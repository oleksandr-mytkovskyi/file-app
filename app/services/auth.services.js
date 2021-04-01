const jwt = require('../utils/jwt');
const db = require('../model/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = db.user;

async function refreshTokens(email, name) {
    const newAccessToken = await jwt.createToken(email, name, { type: 'access' });
    const newRefreshToken = await jwt.createToken(email, name, { type: 'refresh' });

    await User.updateOne({ email: email }, { refreshToken: newRefreshToken }, function (err, result) {
        if (err) throw new Error(err);
    });
    return {
        success: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
}

function createHash(password) {
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

exports.loginSocial = async (req, res, next, userData) => {
    try {
        const { email, name, socialAuth } = userData;
        const accessToken = await jwt.createToken(email, name, { type: 'access' });
        const refreshToken = await jwt.createToken(email, name, { type: 'refresh' });
        userData.refreshToken = refreshToken;
        const findUser = await User.find({ email: email });
        // перевірили чи є такий юзер, якщо нема, то створили
        if (findUser.length === 0) {
            await User.create(userData);
        }
        //for google
        if (findUser.length !== 0 && !findUser[0].socialAuth.gUserId) {
            await User.updateOne({ email: email }, { socialAuth: { gUserId: socialAuth.gUserId, fbUserId: findUser[0].socialAuth.fbUserId } }, function (err, result) {
                if (err) throw new Error(err);
            });
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
        const { email, password, name } = req.body;
        const accessToken = await jwt.createToken(email, name, { type: 'access' });
        const refreshToken = await jwt.createToken(email, name, { type: 'refresh' });
        const hash = createHash(password);
        const findUser = await User.find({ email: email });
        if (findUser.length !== 0 && !!findUser[0].password) {
            // there are login and password in the DB
            const e = new Error('email already in use, maybe you need login');
            e.status = 400;
            throw e;
        }
        if (findUser.length !== 0 && !findUser[0].password) {
            // updata user in DB
            await User.updateOne({ email: email }, { password: hash }, function (err, result) {
                if (err) throw new Error(err);
            });
            res.send({
                success: true,
                accessToken,
                refreshToken,
            });
        } else {
            // save new user
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
        }
    } catch (e) {
        next(e);
    }
}

exports.login = async (req, res, next) => {
    try {
        const findUser = await User.find({ email: req.body.email });
        if (findUser.length === 0) {
            const e = new Error('dont email, maybe you need reg');
            e.status = 400;
            throw e;
        }
        const hash = findUser[0].password;
        const { email, name } = findUser[0];
        bcrypt.compare(req.body.password, hash, async function (err, result) {
            try {
                if (err) {
                    throw new Error('Error in hash callback on Login');
                }
                if (!result) {
                    const e = new Error('Password incorect');
                    e.status = 400;
                    throw e;
                }

                const obj = await refreshTokens(email, name);
                res.send(obj);
            } catch (e) {
                res.status(401).send({
                    message: e.message
                })
            }
        });

    } catch (e) {
        res.status(401).send({
            message: e.message
        })
    }
}

exports.refresh = (req, res, next) => {

}

exports.refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const parseToken = jwt.checkToken(refreshToken, { type: 'refresh' });
        if (!parseToken) {
            const e = new Error('Refresh token not valid');
            e.status = 400;
            throw e;
        }
        const { email, name } = parseToken;
        const obj = await refreshTokens(email, name);
        res.send(obj);
    } catch (e) {
        next(e);
    }
}