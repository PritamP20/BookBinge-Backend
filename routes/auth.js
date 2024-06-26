const express = require('express')
const router = express.Router()
const authController = require('../controller/auth')

router
    .post('/signup',authController.signUp)
    .post('/login', authController.login)

exports.router = router