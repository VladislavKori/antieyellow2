const path = require('path');
const db = require('../models/index');
const Photos = db.photos;

// utils
const { upload, delFile } = require('../utils/file');

exports.getphotos = async (req, res) => {
    try {
        // Получаем все фотографии из бд
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
        if (!req.body.title || !req.files) {
            return res.status(400).send({
                message: "Поля не заполнены"
            });
        }

        const savePhoto = await upload(req.files);
        if (savePhoto.path == null) {
            return res.status(500).send({
                message: "Фото не смогло сохраниться"
            })
        }

        // Сохранение информации о фото в бд
        const photo = await Photos.create({
            title: req.body.title,
            path: savePhoto.path,
        })

        return res.status(200).send({
            message: "Фотография успешно добавлена в галерею",
            ...photo.dataValues
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.deletephoto = async (req, res) => {
    try {
        const { photoid } = req.body
        const photoData = await Photos.findOne({
            where: {
                id: photoid
            }
        })
        if (!photoData.dataValues) {
            return res.status(400).send({
                message: "Photo not founded"
            })
        }

        // delete file
        const deleteInfo = await delFile(photoData.dataValues.path);
        if (deleteInfo) {
            return res.status(500).send({
                message: "Фотография не удалена"
            })
        }

        const result = await photoData.destroy();

        if (result) return res.status(200).send({
            message: "Запись удалена успешно",
            ...result.dataValues
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.changephoto = async (req, res) => {
    try {

        // Проверяем поля
        if (!req.body.title || !req.body.photoid || !req.files) {
            return res.status(400).send({
                message: "Поля не заполнены"
            });
        }

        // Ищем нужно фото по входящим полям
        const dataPhoto = await Photos.findOne({
            where: {
                id: req.body.photoid
            }
        })
        if (!dataPhoto) {
            return res.status(400).send({message: "Фотография не найдена"})
        }

        // Удаляем файл
        const deleteInfo = await delFile(dataPhoto.dataValues.path);
        if (deleteInfo) {
            return res.status(500).send({
                message: "Фотография не удалена"
            })
        }

        // Сохраняем файл
        const savePhoto = await upload(req.files);
        if (savePhoto.path == null) {
            return res.status(500).send({
                message: "Фото не смогло сохраниться"
            })
        }

        // Меняем поля 
        dataPhoto.path = savePhoto.path
        dataPhoto.title = req.body.title

        // Сохраняем изменённые поля
        const result = await dataPhoto.save()

        if (result) return res.status(200).send({
            message: "Фотография изменена"
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}