const express = require('express');
const { addToCart } = require('../controller/addToCart');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();


router.post('/',verifyToken,addToCart);

module.exports = router;