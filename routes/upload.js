const express = require('express');
const { uploadFIle } = require('../controller/upload');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();


router.post('/',[verifyToken],uploadFIle);

module.exports = router;