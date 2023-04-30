const bcrypt = require('bcryptjs')
const db = require('../models/index')
const User = db.user;

exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({
            where: {
                id: id
            }
        })
        if (!user) { 
            return res.status(400).send({
                message: "User not found"
            })
        }

        delete user.dataValues.password
        
        return res.status(200).send({
            message: "Успех",
            ...user.dataValues
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.changesettings = async (req, res) => {
    try {
        const userId = req.userId;
        const {vklink = null, tglink = null} = req.body
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        if (!user) { 
            return res.status(400).send({
                message: "User not found"
            })
        }

        user.vklink = vklink;
        user.tglink = tglink;
        await user.save();

        delete user.dataValues.password
        
        return res.status(200).send({
            message: "Изменения успешны",
            ...user.dataValues
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.changepassword = async (req, res) => {
    try {
        const userId = req.userId;
        const {currentPassword, newPassword} = req.body
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        if (!user) { 
            return res.status(400).send({
                message: "User not found"
            })
        }

        console.log(user, user.password, '81 uesr.controller')
        const passwordIsValid = bcrypt.compareSync(
            currentPassword,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }
        
        user.password = bcrypt.hashSync(newPassword, 8)
        await user.save()

        delete user.dataValues.password
        
        return res.status(200).send({
            message: "Успех",
            ...user.dataValues
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}
