const db = require('../models/index')
const commonsettings = db.commonsettings
const { upload } = require('../utils/file')

exports.getsettings = async (req, res) => {
    try {
        const settings = await commonsettings.findAll()

        return res.status(200).send({
            message: "Успешно",
            ...settings[0].dataValues
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.change = async (req, res) => {
    try {

        const { vklink = "", tglink = "", donation = "" } = req.body;
        const settings = await commonsettings.findAll()

        console.log(req.files)

        let newVkLink = vklink;
        if (vklink == "") { newVkLink = settings[0].vklink }

        let newTgLink = tglink;
        if (tglink == "") { newTgLink = settings[0].tglink }

        let newDonation = req.body.donation;
        if (donation == "") { newDonation = settings[0].confidence }

        let file;
        if (req.files) {
            file = await upload(req.files)
        }

        settings[0].vklink = newVkLink;
        settings[0].tglink = newTgLink;
        settings[0].donationlink = newDonation;

        if (file) {
            settings[0].filepath = file.path;
        }

        settings[0].save()

        return res.status(200).send({
            message: "Успешно обновленно",
            ...settings[0].dataValues
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}