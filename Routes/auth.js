const express = require('express')
const router = express.Router()

const {signup , signin , requireSignin ,authMiddleware , signout} =  require('../controllers/auth')
const {userSignupValidator, runValidation,userSigninValidator  } = require('../validators/auth')

router.post('/signup' , runValidation , userSignupValidator, signup)
router.post('/signin' , userSigninValidator , runValidation , signin)
router.get('/signout' , signout)

module.exports = router;