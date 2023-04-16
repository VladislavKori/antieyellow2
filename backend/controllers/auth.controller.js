const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');

const db = require('../models/index')
const User = db.user;
const Role = db.role;
const Token = db.tokens;

const bcrypt = require('bcryptjs')

const {
    generateTokens,
    validateRefreshToken,
    saveToken,
    logout
} = require('../services/authService')

exports.signup = async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        const roles = await Role.findAll()
        const result = user.setRoles(roles[0])

        const userData = {
            id: user.dataValues.id,
            email: req.body.email
        }
        const userTokens = generateTokens(userData);
        saveToken(user.dataValues.id, userTokens.refreshToken)

        res.cookie(
            'refreshToken',
            userTokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            }
        )

        if (result) res.send({
            message: 'Успех',
            ...userData,
            ...userTokens
        }).status(200)
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
}

exports.singin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) {
            return res.status(404).send({
                message: "User Not found."
            });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }

        let authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        const tokens = generateTokens({
            id: user.dataValues.id,
            email: user.dataValues.email
        });
        await saveToken(user.dataValues.id, tokens.refreshToken)

        res.cookie('refreshToken',
            tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            }
        )

        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            ...tokens
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.logout = async (req, res) => {
    try {
        const {
            refreshToken
        } = req.cookies;
        await logout(refreshToken)
        res.clearCookie('refreshToken');

        return res.status(200).send({
            message: "You've been logout!"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.refresh = async (req, res) => {
    try {
        const {
            refreshToken
        } = req.cookies;

        console.log(!!refreshToken, " refresh")

        // Проверки
        if (!refreshToken) {
            console.log('1')
            return res.status(401).send({
                message: "Refresh Token Not Defind",
            });
        }
        const userData = validateRefreshToken(refreshToken);
        const tokenFromDb = await Token.findOne({
            where: {
                token: refreshToken
            }
        })
        if (!userData || !tokenFromDb) {
            console.log('1')
            return res.status(401).send({
                message: "Refresh Token Not Valid",
            });
        }

        const user = await User.findOne({
            where: {
                id: userData.id
            }
        })
        const tokens = generateTokens({
            id: user.dataValues.id,
            email: user.dataValues.email
        });
        await saveToken(userData.id, tokens.refreshToken)

        let authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.cookie('refreshToken',
            tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            }
        )
        return res.status(200).send({
            ...tokens,
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}