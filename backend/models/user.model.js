module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        vklink: {
            allowNull: true,
            defaultValue: null,
            type: Sequelize.STRING
        },
        tglink: {
            allowNull: true,
            defaultValue: null,
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING,
            defaultValue: "files/avatar.jpg",
        }
    }, {
        timestamps: true
    })

    return User;
}