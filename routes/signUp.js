const express = require('express');
const {signUp} = require('../controller/signUp');
const { validate } = require("../middleware/validator");

const router = express.Router();


router.post('/',validate,signUp);

module.exports = router;