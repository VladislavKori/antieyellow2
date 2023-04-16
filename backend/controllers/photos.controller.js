const path = require('path');
const db = require('../models/index');
const Photos = db.photos;
const File = db.files;

exports.getphotos = async (req, res) => {
    try {
        const photos = await Photos.findAll(); 
        return res.status(200).send({
            photos: photos
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.createphotos = async (req, res) => {
    try {
        // Проверка тайтла на пустоту
        if (!req.body.title || !req.body.file_id) {
            return res.status(400).send({
                message: "fuild should be filed"
            });
        }

        const file = await File.findOne({
            where: {
                id: req.body.file_id
            }
        })

        if (!file) {return res.status(400).send({message: "File not found"})}

        // Сохранение информации о фото в бд
        const photo = await Photos.create({
            title: req.body.title,
            path: file.dataValues.path,
            fileid: file.dataValues.id 
        })

        res.status(200).send({
            id: photo.dataValues.id,
            title: photo.dataValues.title,
            path: photo.dataValues.path,
            fileid: photo.dataValues.fileid ,
            createdAt: photo.dataValues.createdAt,
            updatedAt: photo.dataValues.updatedAt
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}