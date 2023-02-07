const express = require('express');
const { uploadFIles } = require('../controller/uploadFIles');
const router = express.Router();


router.post('/',uploadFIles);

module.exports = router;