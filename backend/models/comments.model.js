module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
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
        },
        text: {
            type: Sequelize.TEXT
        },
        numsOfLike: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        }
    }, {
        timestamps: true
    })

    return Comments;
}