const db = require('../models/index')
const Post = db.post;
const User = db.user;
const Like = db.likes;
const Comments = db.comments;
const CommentsLike = db.commentsLike;
const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config');

const {
    upload,
    delFile
} = require('../utils/file')

exports.getpost = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!post) {
            return res.status(400).send({
                message: "Пост не найден"
            })
        }

        res.status(200).send({
            posts: [post]
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.getposts = async (req, res) => {
    try {
        const posts = await Post.findAll()
        res.status(200).send({
            posts: posts
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.createpost = async (req, res) => {
    try {

        const {
            title,
            text
        } = req.body;
        if (!title || !text || !req.files) throw new Error('Не хвататет данных');

        const user = await User.findOne({
            where: req.userId
        });

        const savePhoto = await upload(req.files);
        if (savePhoto.path == null) {
            return res.status(500).send({
                message: "Фото не смогло сохраниться"
            })
        }

        const post = await Post.create({
            title: title,
            content: text,
            preview: savePhoto.path,
        })

        const result = await post.addUser(user);

        if (result) res.status(200).send({
            message: "Пост успешно сохранён",
            newpost: post.dataValues
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.deletepost = async (req, res) => {
    try {
        const {
            postid
        } = req.body;
        const postData = await Post.findOne({
            where: {
                id: postid
            }
        })
        if (!postData) {
            return res.status(400).send({
                message: "Пост не найден"
            })
        }

        // delete file
        const deleteInfo = await delFile(postData.dataValues.preview);
        if (deleteInfo) {
            return res.status(500).send({
                message: "Фотография не удалена"
            })
        }

        // Удаляем пост
        const result = await postData.destroy()

        console.log(result)

        return res.status(200).send({
            message: "Пост удалён",
            posts: result.dataValues
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.changepost = async (req, res) => {
    try {
        console.log('рудд')
        const {
            postid,
            title,
            content,
        } = req.body;

        if (!title || !content || !postid || !req.files) {
            return res.status(500).send({
                message: "Данных не хвататет"
            })
        };

        const post = await Post.findOne({
            where: {
                id: postid
            }
        })

        // delete file
        const deleteInfo = await delFile(post.dataValues.preview);
        if (deleteInfo) {
            return res.status(500).send({
                message: "Фотография не удалена"
            })
        }

        const savePhoto = await upload(req.files);
        if (savePhoto.path == null) {
            return res.status(500).send({
                message: "Фото не смогло сохраниться"
            })
        }



        post.preview = savePhoto.path;
        post.title = title;
        post.content = content;

        const result = await post.save();

        if (result) res.status(200).send({
            message: "Пост обновлён",
            newpost: result.dataValues
        });


    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.keeplike = async (req, res) => {
    try {
        const userid = req.userId;
        const {
            postid
        } = req.body;

        const likeData = await Like.findOne({
            where: {
                userId: userid,
                postId: postid
            }
        })

        let isLike = false;
        let result;
        if (!likeData) {
            result = await Like.create({
                userId: userid,
                postId: postid
            })
            isLike = true;
        } else {
            result = await Like.destroy({
                where: {
                    userId: userid,
                    postId: postid
                }
            })
            isLike = false;
        }

        return res.status(200).send({
            message: "Изменения успешны",
            postid: postid,
            userid: userid,
            like: isLike
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.getlike = async (req, res) => {
    try {
        const userid = req.userId;
        const {
            postid
        } = req.body;
        let isLike = false;

        const likeData = await Like.findOne({
            where: {
                userId: userid,
                postId: postid
            }
        })

        if (likeData) {
            isLike = true
        }

        return res.status(200).send({
            message: "Изменения успешны",
            postid: postid,
            userid: userid,
            like: isLike
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.getcomments = async (req, res) => {
    try {
        const {
            postid
        } = req.body;

        const dataComments = await Comments.findAll({
            where: {
                postId: postid
            }
        })

        const comments = []
        for (let i = 0; i < dataComments.length; i++) {

            const user = await User.findOne({
                where: {
                    id: dataComments[i].dataValues.userId
                }
            })

            delete user.dataValues.password

            comments.push({
                ...dataComments[i].dataValues,
                user: user.dataValues,
            })
        }

        return res.status(200).send({
            message: "Комментарии загружены",
            comments: comments.reverse()
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.createcomment = async (req, res) => {
    try {
        const userId = req.userId;
        const {
            postid,
            text
        } = req.body;

        const result = await Comments.create({
            postId: postid,
            text: text,
            userId: userId
        })

        const user = await User.findOne({
            where: {
                id: userId
            }
        })

        if (result) return res.status(200).send({
            message: "Комментарий успешно добавлен",
            newComment: {
                ...result.dataValues,
                user: user.dataValues,
                thisUserIsLike: false
            },
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.keeplikeoncomment = async (req, res) => {
    try {
        const userId = req.userId;
        const {
            commentid
        } = req.body;

        const comment = await Comments.findOne({
            where: {
                id: commentid
            }
        })

        if (!comment) {
            return res.status(400).send({
                message: "Такого комментария не существует"
            })
        }

        const user = await User.findOne({
            where: {
                id: userId
            }
        })

        // Проверяем поставил ли пользователь лайк
        let result;
        const like = await CommentsLike.findOne({
            where: {
                commentId: commentid,
                userId: userId
            }
        })

        if (!like) {
            result = await CommentsLike.create({
                commentId: commentid,
                userId: userId
            })
            comment.numsOfLike = comment.dataValues.numsOfLike + 1;
        } else {
            result = await like.destroy({
                commentId: commentid,
                userId: userId
            })
            comment.numsOfLike = comment.dataValues.numsOfLike - 1;
        }

        await comment.save()

        res.status(200).send({
            message: "Изменено",
            likes: result,
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.getLikeOnComments = async (req, res) => {
    try {
        const userId = req.userId;
        
        const user = await User.findOne({
            where: {
                id: userId
            }
        })

        const result = []
        const comments = await user.getComments()

        for (let i = 0; i < comments.length; i++) {
            result.push({
                ...comments[i].dataValues.comments_like.dataValues
            })
        }

        res.status(200).send({
            message: "Изменено",
            likes: result
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.deltecomment = async (req, res) => {
    try {
        const userId = req.userId;
        const {
            commentid
        } = req.body;

        const user = await User.findOne({
            where: {
                id: userId
            }
        })

        let isAdmin = false;
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name.toUpperCase() === "ADMIN") {
                isAdmin = true
            };
        }

        const comment = await Comments.findOne({
            where: {
                id: commentid
            }
        })

        if (!isAdmin) {
            if (comment.dataValues.userId != userId) {
                return res.status(400).send({
                    message: "Вы не являтесь автором этого комментария"
                })
            }
        }

        const result = await comment.destroy()

        if (result) return res.status(200).send({
            message: "Комментарий успешно удалён",
            delcomment: {
                id: commentid
            }
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}