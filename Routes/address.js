const express = require('express')
const router = express.Router()

const {address} = require('../controllers/address')
const { requireSignin, authMiddleware } = require("../controllers/auth");

router.put('/address' ,requireSignin, authMiddleware, address)

module.exports = router;