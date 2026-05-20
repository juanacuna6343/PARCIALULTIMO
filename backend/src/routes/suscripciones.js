const express = require('express');
const {
  listSuscripciones,
  getSuscripcion,
  createSuscripcion,
  updateSuscripcion,
  deleteSuscripcion,
  renovarSuscripcion
} = require('../controllers/suscripcionController');
const authenticate = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);

router.get('/', listSuscripciones);
router.get('/:id', getSuscripcion);
router.post('/', createSuscripcion);
router.put('/:id', updateSuscripcion);
router.delete('/:id', deleteSuscripcion);
router.post('/:id/renovar', renovarSuscripcion);

module.exports = router;
