const express = require('express');
const  { creatProduct } =  require('../controller/createProduct');
const { verifyToken } = require('../middleware/auth');
const { verifyRole } = require('../middleware/roleValidate');
const router = express.Router();

router.post('/',[verifyToken],creatProduct);

module.exports = router;