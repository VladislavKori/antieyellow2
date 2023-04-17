const db = require('../models/index')
const Post = db.post;
const User = db.user;
const File = db.files;

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
            content,
            fileid
        } = req.body;
        if (title === undefined || content === undefined || fileid === undefined) throw new Error('Не хвататет данных');

        const dataFile = await File.findOne({
            where: {
                id: fileid
            }
        })

        const user = await User.findOne({
            where: req.userId
        });

        const post = await Post.create({
            title: title,
            content: content,
            preview: dataFile.dataValues.path
        })

        const result = await post.addUser(user);

        if (result) res.status(200).send({
            id: post.dataValues.id,
            title: post.dataValues.title,
            preview: post.dataValues.preview,
            createdAt: post.dataValues.createdAt,
            authorid: user.dataValues.id
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}