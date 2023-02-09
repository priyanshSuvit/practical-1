const express = require('express');
const { getCartList } = require('../controller/getCartList');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();


router.post('/',verifyToken,getCartList);

module.exports = router;