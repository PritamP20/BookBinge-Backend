const express = require('express')
const router = express.Router()
const userController = require('../controller/users')

router
    .get('/', userController.getUser)
    .put('/', userController.replaceUser)
    .patch('/', userController.updateUser)
    .delete('/', userController.deleteUser)

exports.router = router;