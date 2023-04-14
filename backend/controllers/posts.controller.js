const db = require('../models/index')
const Post = db.post;
const User = db.user;

exports.getpost = async (req, res) => {
    try {
        const postid = req.params.id;

        const post = await Post.findOne({
            where: {
                id: postid
            }
        })

        if (!post) {
            return res.status(404).send({
                message: "Post Not found."
            })
        }

        res.status(200).send({
            id: post.id,
            authorid: post.authorid,
            title: post.title,
            content: post.content
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.getposts = async (req, res) => {
    try {
        const posts = await Post.findAll({})
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
            content
        } = req.body;
        if (title === undefined || content === undefined) throw new Error('Не хвататет данных');

        const post = await Post.create({
            title: title,
            content: content
        })

        const user = await User.findOne({where: req.userId});
        const result = await post.addUser(user);
        
        if (result) res.status(200).send({
            message: 'Успех'
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}