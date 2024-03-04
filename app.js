require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sgMail = require('@sendgrid/mail');
const cloudinary = require('cloudinary').v2;

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Configura la API de SendGrid

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: 'https://trailnest.netlify.app',
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })
);

const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_SERVER+"/"+process.env.DB_NAME+"?retryWrites=true&w=majority";
async function main() {
  await mongoose.connect(mongoDB);
}
main().catch(err => console.log(err));

app.get('/', (req, res) => {
    console.log(process.env.DB_USER, '<--- ¿BBDD conectada?');
    res.send('TRAILNEST BACKEND WORKING 😀🚴')
})

var indexRouter = require("./health/health-routes.js");
var mailRouter = require("./mail/mail-routes.js");
var rutas = require('./routes/rutas.js');
var users = require('./routes/users.js');

app.use("/rutas", rutas);
app.use("/users", users);
app.use("/health", indexRouter);
app.use("/mail", mailRouter);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});
console.log(cloudinary.config());

app.listen(port, ()=> {
    console.log('Server running on port: ', port);
});

module.exports = app;