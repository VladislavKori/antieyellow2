const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/posts.routes')
const photoRoutes = require('./routes/photos.routes')
const fileRoutes = require('./routes/file.routes')

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

const db = require('./models/index');
const Role = db.role;
// db.sequelize.sync({force: true})
db.sequelize.sync({
  force: true
}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

app.use('/api/auth', authRoutes)
app.use('/api', postRoutes)
app.use('/api/photos', photoRoutes)
app.use('/api/files', fileRoutes)

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
}