module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("files", {
        path: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false
    })

    return File;
}