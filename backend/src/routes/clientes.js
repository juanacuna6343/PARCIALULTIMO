const express = require('express');
const { listClientes, getCliente, createCliente, updateCliente, deleteCliente } = require('../controllers/clienteController');
const authenticate = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);
router.get('/', listClientes);
router.get('/:id', getCliente);
router.post('/', createCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

module.exports = router;
