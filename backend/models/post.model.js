module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        },
        preview: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: true
    })

    return Post;
}