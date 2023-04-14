const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');
const Token = require('../models/tokens.model');
const { user } = require('../models');

exports.generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {expiresIn: '10d'})
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {expiresIn: '1m'})
    return {
        accessToken,
        refreshToken
    }
}

exports.validateRefreshToken = async (token) => {
    try {
        const userData = await jwt.verify(token, config.JWT_REFRESH_SECRET);
        console.log(userData)
        return userData;
    } catch (e) {
        return null;
    }
}

exports.saveToken = async (userId, refreshToken) => {
    const tokenData = await Token.findOne({
        where: {
            token: refreshToken
        }
    })
    if(tokenData) {
        tokenData.token = refreshToken;
        return tokenData.save()
    }
}