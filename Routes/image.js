const express = require('express')
const sharp = require('sharp');
const path = require('path'); 
const router = express.Router()

const { upload} = require('../controllers/image')
const { requireSignin, authMiddleware } = require("../controllers/auth");

router.post('/upload' , requireSignin, authMiddleware , upload)

module.exports = router;
