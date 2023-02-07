const express = require('express');
const { getProductList } = require('../controller/getProduct')
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/',[verifyToken],getProductList);

module.exports = router;