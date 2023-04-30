const express = require('express');
const router = express.Router()

const controller = require('../controllers/user.controller');

const middelware = require('../middelware/authJwt')

router.get('/user/:id', controller.getUser)

router.put('/user/changesettings', [
    middelware.verifyToken
], controller.changesettings)

router.put('/user/changepassword', [
    middelware.verifyToken
], controller.changepassword)

module.exports = router;