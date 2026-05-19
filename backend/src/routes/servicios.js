const express = require('express');
const { listServicios, createServicio, updateServicio, listHitos, addHito } = require('../controllers/servicioController');
const authenticate = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);
router.get('/', listServicios);
router.post('/', createServicio);
router.put('/:id', updateServicio);
router.get('/:id/hitos', listHitos);
router.post('/:id/hitos', addHito);

module.exports = router;
