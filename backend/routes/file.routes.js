const express = require('express');
const router = express.Router()

const middelware = require('../middelware/authJwt')
const controller = require('../controllers/file.controller');

router.post('/upload',
    [
        // middelware.verifyToken,
        // middelware.isAdmin,
    ],
    controller.upload)


module.exports = router;