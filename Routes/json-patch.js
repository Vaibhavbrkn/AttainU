const express = require('express')
const router = express.Router()

const {patch} = require('../controllers/json-patch')
const { requireSignin, authMiddleware } = require("../controllers/auth");

router.get('/jsonPatch' ,requireSignin, authMiddleware ,  patch)

module.exports = router;