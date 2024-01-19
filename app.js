const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
require('dotenv').config();

app.post('/login', (req, res) => {
  const user = authenticateUser(req.body.nickname, req.body.password);

  if (user) {
    const token = jwt.sign({ userId: user.id }, jwtSecretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

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
var users = require('./routes/users.js')

app.use("/rutas", rutas)
app.use("/users", users)

app.listen(port, ()=> {
    console.log('Server running on port: ', port);
})