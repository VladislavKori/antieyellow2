const express = require('express');
const router = express.Router()

const middelware = require('../middelware/authJwt')
const controller = require('../controllers/posts.controller');

router.get('/posts', controller.getposts)
router.get('/getpost/:id', controller.getpost)
router.post('/createpost',
    [
        middelware.verifyToken,
        // middelware.isAdmin
    ],
    controller.createpost)

module.exports = router;