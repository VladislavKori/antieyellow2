const express = require('express');
const router = express.Router()

const middelware = require('../middelware/authJwt')
const controller = require('../controllers/settings.controller');

// Получение общих настроек (настроек сайта)
router.get('/getsettings', controller.getsettings)

// Изменение  общих настроек (настроек сайта)
router.post('/change',
    [
        middelware.verifyToken,
        middelware.isAdmin
    ],
    controller.change)

module.exports = router;