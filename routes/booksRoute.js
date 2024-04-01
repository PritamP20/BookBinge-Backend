const express = require("express")
const router = express.Router()
const booksController = require("../controller/books")

router
    .post('/', booksController.createbooks)
    .get('/', booksController.getAllBooks)
    .get('/:id', booksController.getBooks)
    .get('/category/:cate',booksController.getBooksByCate)
    .put('/:id',booksController.replaceBooks)
    .patch('/update/:id', booksController.updateBooks)
    .delete('/:id', booksController.deleteBoooks)

exports.router = router;