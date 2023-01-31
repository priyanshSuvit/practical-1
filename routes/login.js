const express = require('express');
const { loginReq } = require('../controller/login');
const { validate} = require("../middleware/validator");
const router = express.Router();


router.post('/',validate,loginReq);

module.exports = router;