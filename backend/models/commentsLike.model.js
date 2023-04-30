module.exports = (sequelize, Sequelize) => {
    const CommentsLike = sequelize.define("comments_like", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    }, {
        timestamps: false
    })

    return CommentsLike;
}