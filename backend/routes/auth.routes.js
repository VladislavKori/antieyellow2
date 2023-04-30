const express = require('express');
const passport = require('passport');
const router = express.Router()

const controller = require('../controllers/auth.controller')
const middleware = require('../middelware/verifySignUp')
const authMiddleware = require('../middelware/authJwt')

// Регестрация
router.post('/signup', [
    middleware.checkDuplicateUsernameOrEmail
], controller.signup)

// Вход
router.post('/signin', controller.singin)


// Обновление токенов
router.get('/refresh', controller.refresh)

// Выход из аккаунта
router.get('/logout', controller.logout)

module.exports = router;