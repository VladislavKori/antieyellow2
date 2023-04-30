const express = require('express');
const router = express.Router()

const middelware = require('../middelware/authJwt')
const controller = require('../controllers/posts.controller');

router.get('/posts', controller.getposts)
router.get('/getpost/:id', controller.getpost)
router.post('/createpost',
    [
        middelware.verifyToken,
        middelware.isAdmin
    ],
    controller.createpost)

router.post('/delete', [
    middelware.verifyToken,
    middelware.isAdmin
], controller.deletepost)

router.put('/change', [
    middelware.verifyToken,
    middelware.isAdmin
], controller.changepost)

router.post('/keeplike', [
    middelware.verifyToken,
], controller.keeplike)

router.post('/getlike', [
    middelware.verifyToken,
], controller.getlike)

router.post('/getcomments', controller.getcomments)

router.post('/createcomment', 
[middelware.verifyToken],
controller.createcomment)

router.post('/keeplikeoncomment', 
[middelware.verifyToken],
controller.keeplikeoncomment)

router.post('/deletecomment', 
[middelware.verifyToken],
controller.deltecomment)

router.post('/getLikeOnComments', 
[middelware.verifyToken],
controller.getLikeOnComments)



module.exports = router;