module.exports = (sequelize, Sequelize) => {
    const CommonSettings = sequelize.define("commonsettings", {
        vklink: {
            defaultValue: "",
            type: Sequelize.STRING
        },
        tglink: {
            defaultValue: "",
            type: Sequelize.STRING
        },
        donationlink: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        filepath: {
            type: Sequelize.STRING,
        }
    })

    return CommonSettings;
}