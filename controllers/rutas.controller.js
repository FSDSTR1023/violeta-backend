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
  const { rutaId } = req.params;
  Ruta.findById(rutaId)
  .then(Ruta => res.status(200).json(Ruta))
  .catch(error => {
      console.log(`Error finding the Ruta: ${error}`)
      res.status(400).json(error)
  })
}

// editar una ruta por su ID
const editRuta = async (req, res) => {
  const { rutaId } = req.params;
  const { newData } = req.body;

  try {
    const updatedRuta = await Ruta.findByIdAndUpdate(rutaId, newData, { new: true });

    if (updatedRuta) {
      console.log(`Ruta updated successfully: ${updatedRuta}`);
      res.status(200).json(updatedRuta);
    } else {
      console.log(`Ruta with ID ${rutaId} not found.`);
      res.status(404).json({ error: 'Ruta not found' });
    }
  } catch (error) {
    console.error(`Error updating the Ruta: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
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
  editRuta,
  getAllRutas,
  getCompletedRutas,
  getIncompleteRutas,
  getOngoingRutas,
  deleteRuta
};