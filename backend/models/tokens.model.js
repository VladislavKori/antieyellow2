module.exports = (sequelize, Sequelize) => {
    const Tokens = sequelize.define("tokens", {
        token: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    })

    return Tokens;
}