const path = require('path')

exports.getphotos = (req, res) => {
    try {

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

exports.createphotos = (req, res) => {
    try {

        let sampleFile;
        let uploadPath;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        sampleFile = req.files.img;
        uploadPath = path.resolve(__dirname + '/../tmp/' + sampleFile.name);
        console.log(uploadPath)

        sampleFile.mv(uploadPath, function(err) {
            if (err)
              return res.status(500).send(err);
        
            res.send('File uploaded!');
          });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}