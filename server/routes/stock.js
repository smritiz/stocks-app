const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const Stock = require('../models/stock');
const stockController = require('../controllers/stock');
const checkAuth = require('../middlewares/check-auth');

router.post('/',checkAuth, stockController.postStock);

router.get('/', checkAuth, stockController.getStock);

router.put('/:stockId', checkAuth, stockController.updateStock);

router.delete('/:stockId', checkAuth, stockController.deleteStock);


module.exports = router;