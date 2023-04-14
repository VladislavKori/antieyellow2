const db = require('../models/index')
const User = db.user;

exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {

        let user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (user) {
            return res.status(400).json({
                message: "Falled. Username is already is use"
            })
        }

        user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (user) {
            return res.status(400).send({
                message: "Failed. Email is already is use"
            })
        }

        next()
    } catch (err) {
        return res.status(500).send({
            message: err.message + ' - middlware'
        })
    }
}