var express = require('express')
var router = express.Router()

const RutaController = require('../controllers/rutas.controller')

// Rutas para las operaciones CRUD de las rutas
router.post('/ruta', rutaController.createRuta);
router.get('/ruta/:rutaId', rutaController.getRutaById);
router.put('/ruta/:rutaId', rutaController.editRuta);

// Rutas para obtener diferentes conjuntos de rutas
router.get('/rutas', rutaController.getAllRutas);
router.get('/rutas/completadas', rutaController.getCompletedRutas);
router.get('/rutas/incompletas', rutaController.getIncompleteRutas);
router.get('/rutas/en-curso', rutaController.getOngoingRutas);


module.exports = router;