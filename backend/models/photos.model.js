module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define("photos", {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false
    })

    return Photo;
}