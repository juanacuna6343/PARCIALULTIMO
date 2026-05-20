const express = require('express');
const {
  listOportunidades,
  getOportunidad,
  createOportunidad,
  updateOportunidad,
  deleteOportunidad,
  cambiarEtapa,
  getPipelineStats
} = require('../controllers/oportunidadController');
const authenticate = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);

router.get('/stats', getPipelineStats);
router.get('/', listOportunidades);
router.get('/:id', getOportunidad);
router.post('/', createOportunidad);
router.put('/:id', updateOportunidad);
router.delete('/:id', deleteOportunidad);
router.patch('/:id/etapa', cambiarEtapa);

module.exports = router;
