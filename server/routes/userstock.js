const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const userStockController = require('../controllers/userstock');
const checkAuth = require('../middlewares/check-auth');

router.post('/', checkAuth, userStockController.buyStock);

router.get('/', checkAuth, userStockController.getStock);

router.get('/:userId', checkAuth, userStockController.getStockByUser);

router.put('/:stockId', checkAuth, userStockController.sellStock);


module.exports = router;