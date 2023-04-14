const express = require('express');
const router = express.Router()

const controller = require('../controllers/auth.controller')
const middleware = require('../middelware/verifySignUp')
const authMiddleware = require('../middelware/authJwt')

router.post('/signup', [
    middleware.checkDuplicateUsernameOrEmail
], controller.signup)
router.post('/signin', controller.singin)
router.get('/refresh', controller.refresh)
router.get('/logout', controller.logout)

module.exports = router;