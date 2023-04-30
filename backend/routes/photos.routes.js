const express = require('express');
const router = express.Router()

const middelware = require('../middelware/authJwt')
const controller = require('../controllers/photos.controller');

// Получение фотографий
router.get('/', controller.getphotos)

// Создание фотографии
router.post('/create',
    [
        middelware.verifyToken,
        middelware.isAdmin,
    ],
    controller.createphotos)

// Удаление фотографии
router.post('/delete', [
    middelware.verifyToken,
    middelware.isAdmin,
], controller.deletephoto)

// Изменение фотографии
router.put('/edit', [
    middelware.verifyToken,
    middelware.isAdmin,
], controller.changephoto)


module.exports = router;