const express = require('express');
const {
  listEventos,
  getEvento,
  createEvento,
  updateEvento,
  deleteEvento,
  inscribirEvento,
  desinscribirEvento
} = require('../controllers/eventoController');
const authenticate = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);

router.get('/', listEventos);
router.get('/:id', getEvento);
router.post('/', createEvento);
router.put('/:id', updateEvento);
router.delete('/:id', deleteEvento);
router.post('/:id/inscribir', inscribirEvento);
router.post('/:id/desinscribir', desinscribirEvento);

module.exports = router;
