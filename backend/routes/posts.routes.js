const express = require('express');
const router = express.Router()

const middelware = require('../middelware/authJwt')
const controller = require('../controllers/posts.controller');

// Получение постов
router.get('/posts', controller.getposts)

// Получение поста
router.get('/getpost/:id', controller.getpost)

// Создание поста
router.post('/createpost',
    [
        middelware.verifyToken,
        middelware.isAdmin
    ],
    controller.createpost)

// Удаление поста
router.post('/delete', [
    middelware.verifyToken,
    middelware.isAdmin
], controller.deletepost)

// Изменение поста
router.put('/change', [
    middelware.verifyToken,
    middelware.isAdmin
], controller.changepost)

// Оставление лайка на пост
router.post('/keeplike', [
    middelware.verifyToken,
], controller.keeplike)

// Получение лайка, если пользователь ставил лайк посту
router.post('/getlike', [
    middelware.verifyToken,
], controller.getlike)

// получение комментариев
router.post('/getcomments', controller.getcomments)

// Создание комментраия
router.post('/createcomment', 
[middelware.verifyToken],
controller.createcomment)

// Оставить лайк на комментарий
router.post('/keeplikeoncomment', 
[middelware.verifyToken],
controller.keeplikeoncomment)

// Удалить комментарий
router.post('/deletecomment', 
[middelware.verifyToken],
controller.deltecomment)

// Получить лайки на комментарий
router.post('/getLikeOnComments', 
[middelware.verifyToken],
controller.getLikeOnComments)



module.exports = router;