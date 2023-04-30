const path = require('path');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

exports.upload = async (data) => {
    try {
        let sampleFile;
        let uploadPath;

        // Проверка на пустоту отправляемых файлов
        if (!data.img || Object.keys(data).length === 0) {
            return null
        }

        // Сохранение фото на сервере
        const filename = uuidv4();
        sampleFile = data.img;
   
        uploadPath = path.resolve(__dirname + '/../tmp/files/' + filename + path.extname(sampleFile.name));
        const outPath = "files/" + filename + path.extname(sampleFile.name)

        await sampleFile.mv(uploadPath, (err) => {
            if (err)
                return null
        })
        return {
            path: outPath
        }
    } catch (error) {
        return null
    }
}

exports.delFile = async (mypath) => {
    try {
        if (!mypath) {
            return false
        }
        const needPath = path.resolve(__dirname + '/../tmp/' + mypath);
        console.log(needPath)
        return fs.unlink(needPath, (err) => {
            if (err) {
                return false
            }
        });
        return true
    } catch (error) {
        return null
    }
}