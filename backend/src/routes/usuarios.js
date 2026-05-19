const express = require('express');
const { listUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarioController');
const authenticate = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);
router.get('/', listUsuarios);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;
