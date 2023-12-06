const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB- pendiente


app.use(express.json());

// Rutas
app.use('/', require('./routes/userRoutes'));

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});