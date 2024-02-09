const mongoose = require('mongoose')
const User = require('../models/user.model')
const Ruta = require('../models/ruta.model')



// crear ruta
async function createRuta(req, res) {
  Ruta.create(req.body)
    .then(RutaDoc => {
      console.log(`Ruta create worked well: ${RutaDoc}`)
      res.status(200).json(RutaDoc)
    })
    .catch(error => {
      console.log(`Creating a new ruta went wrong! Try again 😞 ${error}`)
      res.status(400).json({ error: 'Failed to create ruta' })
    });
}
// obtener ruta por ID
const getRutaById = async (req, res) => {
  try {
    const { id: rutaId } = req.params;
    const ruta = await Ruta.findById(rutaId);

    if (!ruta) {
      return res.status(404).json({ message: 'Ruta not found' });
    }

    res.status(200).json(ruta);
  } catch (error) {
    console.error(`Error finding the Ruta: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// editar una ruta por su ID
const updateRuta = async (req, res) => {
  const { id: rutaId } = req.params;
  const updatedRutaData = req.body

  try {
    const updatedRuta = await Ruta.findByIdAndUpdate(rutaId, updatedRutaData, { new: true });
    res.status(200).json(updatedRuta);
  } catch (error) {
    console.error(`Error updating ruta with ID ${rutaId}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// obtener todas las rutas
const getAllRutas = async (req, res) => {
  try {
    const allRutas = await Ruta.find();
    res.status(200).json(allRutas);
  } catch (error) {
    console.error(`Error fetching all Rutas: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// obtener las rutas completadas
const getCompletedRutas = async (req, res) => {
  try {
    const completedRutas = await Ruta.find({ status: 'completed' });
    res.status(200).json(completedRutas);
  } catch (error) {
    console.error(`Error fetching completed Rutas: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// obtener las rutas incompletas
const getIncompleteRutas = async (req, res) => {
  try {
    const incompleteRutas = await Ruta.find({ status: 'incomplete' });
    res.status(200).json(incompleteRutas);
  } catch (error) {
    console.error(`Error fetching incomplete Rutas: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// obtener las rutas en curso
const getOngoingRutas = async (req, res) => {
  try {
    const ongoingRutas = await Ruta.find({ status: 'ongoing' });
    res.status(200).json(ongoingRutas);
  } catch (error) {
    console.error(`Error fetching ongoing Rutas: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};
async function deleteRuta(req, res) {
  const rutaId = req.params.id;

  try {
      const ruta = await Ruta.findByIdAndDelete(rutaId);

      if (!ruta) {
          return res.status(404).json({ msg: 'Ruta not found' });
      }

      console.log('Ruta deleted:', ruta);
      res.status(200).json({ msg: 'Ruta deleted successfully' });
  } catch (err) {
      console.error('Error deleting ruta:', err.message);
      res.status(400).json({ error: 'Could not delete ruta, please try again' });
  }
}

module.exports = {
  createRuta,
  getRutaById,
  updateRuta,
  getAllRutas,
  getCompletedRutas,
  getIncompleteRutas,
  getOngoingRutas,
  deleteRuta
};