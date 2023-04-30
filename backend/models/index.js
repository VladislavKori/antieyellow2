const config = require('../configs/db.config')
const Sequelize = require("sequelize");

// Подключаем ORM Sequelize
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        // operatorsAliases: false,
        logging: false,
        timestamps: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Подключение моделей
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.post = require('./post.model')(sequelize, Sequelize);
db.tokens = require('./tokens.model')(sequelize, Sequelize);
db.photos = require('./photos.model')(sequelize, Sequelize);
db.commonsettings = require('./common.settings.modal')(sequelize, Sequelize);
db.likes = require('./likes')(sequelize, Sequelize);
db.comments = require('./comments.model')(sequelize, Sequelize);
db.commentsLike = require('./commentsLike.model')(sequelize, Sequelize);

// Many to many для автоматической установки ролей, при регестрации пользователя
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

// Many to Many для автоматического заполнения поля user_id для каждого поста
db.user.belongsToMany(db.post, { through: 'user_posts' });
db.post.belongsToMany(db.user, { through: 'user_posts' });

// Установка токена (связь один ко многим)
db.user.hasMany(db.tokens, {
    foreignKey: 'userid'
});

// Many to Many для установки автора комментариям
db.comments.belongsToMany(db.user, { through: db.commentsLike  });
db.user.belongsToMany(db.comments, { through: db.commentsLike  });

module.exports = db;