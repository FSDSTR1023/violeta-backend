var express = require('express')
var router = express.Router()

const RutaController = require('../controllers/rutas.controller')

// Rutas para las operaciones CRUD de las rutas
router.post('/', RutaController.createRuta);
router.get('/:id', RutaController.getRutaById);
router.put('/:creatorId/:id', RutaController.editRuta);


// Rutas para obtener diferentes conjuntos de rutas
router.get('/', RutaController.getAllRutas);
router.get('/completadas', RutaController.getCompletedRutas);
router.get('/incompletas', RutaController.getIncompleteRutas);
router.get('/en-curso', RutaController.getOngoingRutas);

router.delete('/:id', RutaController.deleteRuta)

module.exports = router;