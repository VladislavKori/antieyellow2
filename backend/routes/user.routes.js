const express = require('express');
const router = express.Router()

const controller = require('../controllers/user.controller');

const middelware = require('../middelware/authJwt')

// Получение пользователя по id
router.get('/user/:id', controller.getUser)

// Изменение настроек пользователя
router.put('/user/changesettings', [
    middelware.verifyToken
], controller.changesettings)

// Смена пароля пользователя
router.put('/user/changepassword', [
    middelware.verifyToken
], controller.changepassword)

module.exports = router;