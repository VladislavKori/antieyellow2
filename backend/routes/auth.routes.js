const express = require('express');
const passport = require('passport');
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

router.get("/vkontakte", passport.authenticate("vkontakte", {display: "popup"}));
router.get(
    "/vkontakte/callback",
    passport.authenticate("vkontakte", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);
router.get("/", function (req, res) {
    console.log(req.user, " route")
    res.json(req.user);
});

module.exports = router;