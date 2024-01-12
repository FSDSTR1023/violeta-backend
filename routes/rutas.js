var express = require('express')
var router = express.Router()

const RutaController = require('../controllers/rutas.controller')

// Rutas para las operaciones CRUD de las rutas
router.post('/ruta', RutaController.createRuta);
router.get('/ruta/:rutaId', RutaController.getRutaById);
router.put('/ruta/:rutaId', RutaController.editRuta);

// Rutas para obtener diferentes conjuntos de rutas
router.get('/rutas', RutaController.getAllRutas);
router.get('/rutas/completadas', RutaController.getCompletedRutas);
router.get('/rutas/incompletas', RutaController.getIncompleteRutas);
router.get('/rutas/en-curso', RutaController.getOngoingRutas);


module.exports = router;