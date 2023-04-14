const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');

const db = require('../models/index')
const Token = db.tokens;
const User = db.user;

exports.generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
        expiresIn: '30min'
    })
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
        expiresIn: '60d'
    })
    return {
        accessToken,
        refreshToken
    }
}

exports.validateRefreshToken = (token) => {
    try {
        const userData = jwt.verify(token, config.JWT_REFRESH_SECRET);
        return userData;
    } catch (e) {
        return null;
    }
}

exports.saveToken = async (userId, refreshToken) => {
    const tokenData = await Token.findOne({
        where: {
            userid: userId
        }
    })
    if (tokenData) {
        tokenData.token = refreshToken;
        return tokenData.save()
    }
    const token = await Token.create({
        token: refreshToken
    })
    const user = await User.findOne({
        where: {
            id: userId
        }
    })
    await user.setTokens(userId)
}

exports.logout = async (refreshToken) => {
    return await Token.destroy({
        where: {
            token: refreshToken
        },
        force: true
    });
}