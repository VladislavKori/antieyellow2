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

const app = express();

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

const db = require('./models/index');
const Role = db.role;
const Settings = db.commonsettings;
const User = db.user;

passport.use(new AuthVKStrategy({
    clientID: "51630372",
    clientSecret: "Q8RjzYB7SuDuTw9Pdrjy",
    callbackURL: "http://localhost:3000/api/auth/vkontakte/callback",
    scope: ["email"],
    profileFields: ["email"],
  },
  async function (accessToken, refreshToken, params, profile, done) {
    console.log(profile, params)
    const user = await User.create({
      username: profile.uesrname,
      email: profile.emails[0].value,
      password: bcrypt.hashSync('123', 8),
      vklink: profile.profileUrl,
      avatar: profile.photos[0].value
    })

    const roles = await Role.findAll()
    const result = user.setRoles(roles[0])

    const userData = {
      id: user.dataValues.id,
      email: profile.uesrname,
      username: profile.uesrnames,
    }
    const userTokens = generateTokens(userData);
    saveToken(user.dataValues.id, userTokens.refreshToken)

    res.cookie(
      'refreshToken',
      userTokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      }
    )

    return done(null, profile);
  }
));

passport.serializeUser(function (user, done) {
  console.log(user.id)
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null)
});

// db.sequelize.sync({force: true})
// db.sequelize.sync({
//   force: true
// }).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

app.get('/api/', (req, res) => {
  res.send('hello')
})
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/photos', photoRoutes)
app.use('/api', userRoutes)
app.use('/api/settings', commonSettingsRoutes)

app.listen(3000, (err) => {
  if (err) return console.log('error', err)
  console.log('server started on port 3000')
})

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
    email: "admin",
    password: "admin"
  })
  Settings.create({
    vklink: "",
    tglinl: "",
    confidence: "Empty layout"
  })
}