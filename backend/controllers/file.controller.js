const path = require('path');
const db = require('../models/index');
const File = db.files;

exports.upload = async (req, res) => {
    try {
        let sampleFile;
        let uploadPath;

        // Проверка на пустоту отправляемых файлов
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // Сохранение фото на сервере
        sampleFile = req.files.img;
        uploadPath = path.resolve(__dirname + '/../tmp/files/' + sampleFile.name);

        // Сохранение фото в бд
        const file = await File.create({
            path: "files/" + sampleFile.name
        })

        sampleFile.mv(uploadPath, function (err) {
            if (err)
                return res.status(500).send(err);
            return res.status(200).send({
                id: file.dataValues.id,
                path: file.dataValues.path
            })
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}