const express = require('express')
const sharp = require('sharp');
const path = require('path'); 
const router = express.Router()

const { upload} = require('../controllers/image')

router.post('/upload' , upload)

module.exports = router;