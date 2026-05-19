const express = require('express');
const { listTareas, createTarea, updateTarea, completarTarea } = require('../controllers/calendarioController');
const authenticate = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);
router.get('/', listTareas);
router.post('/', createTarea);
router.put('/:id', updateTarea);
router.put('/:id/completar', completarTarea);

module.exports = router;
