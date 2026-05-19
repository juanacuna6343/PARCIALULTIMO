const express = require('express');
const { getDashboard, getKpis } = require('../controllers/dashboardController');
const authenticate = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);
router.get('/', getDashboard);
router.get('/kpis', getKpis);

module.exports = router;
