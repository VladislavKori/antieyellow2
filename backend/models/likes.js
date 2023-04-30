module.exports = (sequelize, Sequelize) => {
    const Likes = sequelize.define("likes", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        postId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    })

    return Likes;
}