var express = require('express')
var router = express.Router()

const RutaController = require('../controllers/rutas.controller')

router.post("/", RutaController.createRuta)
router.get("/:id", RutaController.getRutaById)

module.exports = router;