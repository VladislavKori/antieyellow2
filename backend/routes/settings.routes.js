const express = require('express');
const router = express.Router()

const middelware = require('../middelware/authJwt')
const controller = require('../controllers/settings.controller');

router.get('/getsettings', controller.getsettings)
router.post('/change',
    [
        middelware.verifyToken,
        middelware.isAdmin
    ],
    controller.change)

module.exports = router;