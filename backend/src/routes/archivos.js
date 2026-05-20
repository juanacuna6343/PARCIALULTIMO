const express = require('express');
const authenticate = require('../middleware/auth');
const multer = require('multer');
const { uploadFile } = require('../controllers/archivoController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(authenticate);
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
