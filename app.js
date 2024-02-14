const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://trailnest.netlify.app',
    credentials: true,
  })
);
require('dotenv').config();

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


var rutas = require('./routes/rutas.js')
var users = require('./routes/users.js');

app.use("/rutas", rutas)
app.use("/users", users)

app.listen(port, ()=> {
    console.log('Server running on port: ', port);
})
