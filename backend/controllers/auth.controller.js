const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');
const commonConfig = require('../configs/common.config');

const db = require('../models/index')
const User = db.user;
const Role = db.role;
const Token = db.tokens;

const bcrypt = require('bcryptjs')

// Сервисы для упращение контролерров
const {
    generateTokens,
    validateRefreshToken,
    saveToken,
    logout
} = require('../services/authService')

exports.signup = async (req, res) => {
    try {
        // Создаём пользователя в бд по данным из входящего щапроса
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        // Устанавливаем роль
        const roles = await Role.findAll()
        const result = user.setRoles(roles[0])

        // Генерируем токены
        const userData = {
            id: user.dataValues.id,
            email: req.body.email,
            username: user.dataValues.username,
        }
        const userTokens = generateTokens(userData);
        saveToken(user.dataValues.id, userTokens.refreshToken)

        // Устанавливаем в httpObly кук рефреш токен
        res.cookie(
            'refreshToken',
            userTokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            }
        )

        // Отправляем ответ со статусом 200
        if (result) res.send({
            message: 'Успех',
            ...userData,
            updatedAt: user.dataValues.updatedAt,
            createdAt: user.dataValues.createdAt,
            accessToken: userTokens.accessToken
        }).status(200)
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
}

exports.singin = async (req, res) => {
    try {
        // Ищем пользователя по данным из запроса
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

        // Проверяем сходство паролей
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }

        // Собираем роли в массив authorities
        let authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        // Генерируем два токена access и refresh
        const tokens = generateTokens({
            id: user.dataValues.id,
            email: user.dataValues.email
        });
        await saveToken(user.dataValues.id, tokens.refreshToken)

        // Устанавливаем рефреш токен
        res.cookie('refreshToken',
            tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            }
        )

        // Отправляем данные
        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            createdAt: user.dataValues.createdAt,
            updatedAt: user.dataValues.updatedAt,
            accessToken: tokens.accessToken
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

// Сбрасываем все токены и удаляем из бд
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
            return res.status(401).send({
                message: "Refresh Token Not Valid",
            });
        }

        const user = await User.findOne({
            where: {
                id: userData.id
            }
        })

        delete user.dataValues.password;
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

        // Устанавливаем новый refresh
        res.cookie('refreshToken',
            tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            }
        )

        // Отправляем данные о пользователе
        return res.status(200).send({
            ...tokens,
            ...user.dataValues,
            roles: authorities,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}