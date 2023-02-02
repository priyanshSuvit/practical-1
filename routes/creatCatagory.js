const express = require('express');
const  { creatCat } =  require('../controller/creatCatagory');
const { verifyToken } = require('../middleware/auth');
const { verifyRole } = require('../middleware/roleValidate');
const router = express.Router();


router.post('/create',[verifyToken,verifyRole],creatCat);

module.exports = router;