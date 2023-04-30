const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const passport = require('passport')
const AuthVKStrategy = require('passport-vkontakte').Strategy;
var session = require('express-session');

const {
  createAdminAccount
} = require('./utils/createAdminUser')

const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/posts.routes')
const photoRoutes = require('./routes/photos.routes')
const userRoutes = require('./routes/user.routes')
const commonSettingsRoutes = require('./routes/settings.routes')

const commonConf = require('./configs/common.config')

// Переменные из базы данных для инициализации стандартных полей
const db = require('./models/index');
const Role = db.role;
const Settings = db.commonsettings;
const User = db.user;

// Создание объекта express
const app = express();

// Middelwares
app.use(cors({
  credentials: true,
  origin: commonConf.CLIENT_URL
}))
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload())
app.use(express.static(path.join(__dirname, '/tmp')))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true
  }
}));

// Нужно при deploy, Создаёт нужные таблицы в базе данных
db.sequelize.sync({
  force: true
}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});


// Инициализация роутеров с роутами
app.get('/api/', (req, res) => {
  res.send('hello')
})
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/photos', photoRoutes)
app.use('/api', userRoutes)
app.use('/api/settings', commonSettingsRoutes)

// Запуск сервера
app.listen(3000, (err) => {
  if (err) return console.log('error', err)
  console.log('server started on port 3000')
})


// Фу-ия для инициализации базовых настроек
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });
  createAdminAccount({
    username: "admin",
    email: "admin@gmail.com",
    password: "admin"
  })
  Settings.create({
    vklink: "",
    tglinl: "",
    confidence: "Empty layout"
  })
}