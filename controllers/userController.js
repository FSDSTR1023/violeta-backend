const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};

exports.createUser = async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    const newUser = new User({ nombre, email, contraseña });
    const userSaved = await newUser.save();
    res.json(userSaved);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario', error });
  }
};