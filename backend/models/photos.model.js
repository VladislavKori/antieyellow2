module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define("photos", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING
        },
        path: {
            type: Sequelize.STRING
        },
        fileid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        timestamps: true
    })

    return Photo;
}