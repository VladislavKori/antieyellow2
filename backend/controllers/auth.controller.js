const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');

const db = require('../models/index')
const User = db.user;
const Role = db.role;
const Token = db.tokens;

const bcrypt = require('bcryptjs')

const {
    generateTokens,
    validateRefreshToken
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

        const token = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: 86400, // 24 hours
        });

        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            token: token
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.signout = async (req, res) => {
    try {
        return res.status(200).send({
            message: "You've been signed out!"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.refresh = async (req, res) => {
    try {
        console.log('hello')
        const { refreshToken } = req.cookies;
        
        if (!refreshToken) {
            return res.status(401).send({
                message: "Refresh Token Not Defind",
            });
        }
        const userData = validateRefreshToken(refreshToken);
        console.log(userData)
        const tokenFromDb = await Token.findOne({where: {token: refreshToken}})
        if (!userData || !tokenFromDb) {
            return res.status(401).send({
                message: "Refresh Token Not Valid",
            });
        }
        const user = await User.findOne({where: {id: userData.id}})
        const tokens = generateTokens(user)
        console.log(tokens)

        return res.status(200).send({
            message: "You've been signed out!"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}