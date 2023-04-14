const express = require('express');
const router = express.Router()

const middelware = require('../middelware/authJwt')
const controller = require('../controllers/photos.controller');

router.get('/', controller.getphotos)
router.post('/create',
    [
        // middelware.verifyToken,
        // middelware.isAdmin,
    ],
    controller.createphotos)


module.exports = router;