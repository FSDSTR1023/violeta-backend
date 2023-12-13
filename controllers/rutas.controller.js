const mongoose = require('mongoose')
const User = require('../models/user.model')
const Ruta = require('../models/ruta.model')

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

const getRutaById = async (req, res) => {
  Ruta.findById(req.params.id)
  .then(Ruta => res.status(200).json(Ruta))
  .catch(error => {
      console.log(`Error finding the Ruta: ${error}`)
      res.status(400).json(error)
  })
}

module.exports = {
  createRuta,
  getRutaById
}