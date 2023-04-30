const express = require('express');
const router = express.Router()

const middelware = require('../middelware/authJwt')
const controller = require('../controllers/photos.controller');

router.get('/', controller.getphotos)
router.post('/create',
    [
        middelware.verifyToken,
        middelware.isAdmin,
    ],
    controller.createphotos)

router.post('/delete', [
    middelware.verifyToken,
    middelware.isAdmin,
], controller.deletephoto)

router.put('/edit', [
    middelware.verifyToken,
    middelware.isAdmin,
], controller.changephoto)


module.exports = router;