const express = require("express")
const router = express.Router()
const collectoinController = require('../controller/collection')

router
    .post('/', collectoinController.createCollection)
    .get('/', collectoinController.getAllCollection)
    .get('/:id', collectoinController.getCollectionById)
    .put('/:id', collectoinController.replaceCollection)

    exports.router = router;