const fs = require("fs")
const express = require("express")
const data = JSON.parse(fs.readFileSync("data.json","utf8"));
const router = express.Router();
const books = data.booksdetail;
const model = require("../model/books")
require("../db/db");
const Book = model.Book

exports.createbooks=async(req, res, next)=>{

    const book = new Book(req.body)
    console.log(book)
    await book.save()
        .then((saved)=>{
            res.status(201).json(saved)
        })
        .catch((err)=>{
            res.status(400).json(err)
            console.log(err)
        })
}

exports.getAllBooks= async (req, res)=>{
    try{
        const allBooks = await Book.find()
        res.status(201).json(allBooks)
    }catch(e){
        console.log("This is the error",e.message)
    }
}

exports.getBooksByCate = async (req, res)=>{
    const cate = req.url.split('/')[2]
    console.log(cate)
    const books = await Book.find({'category':cate})
    res.status(201).json(books)
}

exports.getBooks = async (req, res)=>{
    const id = +req.params.id
    const book = await Book.findOne({'id':id})
    res.status(201).json(book)
}

exports.replaceBooks = async (req, res)=>{
    const id = +req.params.id
    console.log(id)
    try {
        const doc = await Book.findOneAndReplace({id:id},req.body, {new:true})
        res.status(201).json(doc);
      } catch (error) {
        console.log(error)
        res.status(400).json(error);
      }
}

// exports.updateBooks = async(req, res)=>{
//     console.log(req.body)
//     const id = req.params.id
//     console.log(id)
//     try {
//         const doc = await Book.findOneAndUpdate({_id:id},req.body,{new:true})
//         res.status(201).json(doc)
//     } catch (error) {
//         console.log(error)
//         res.status(400).json(error)
//     }
// }

exports.updateBooks = async (req, res) => {
    console.log(req.body);
    const data = req.body
    const id = req.params.id;
    console.log(id);
    try {
        // const doc = await Book.findOneAndUpdate(
        //     { _id: id }, // Query
        //     { $set: req.body }, // Update using $set operator
        //     { new: true } // Options: return the modified document
        // );
        const doc = await Book.findOneAndUpdate({id:id},{$set: req.body},{new:true})
        console.log(doc)
        res.status(201).json(doc);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

exports.deleteBoooks = async (req, res)=>{
    const id = +req.params.id
    try {
        const deletedBook = await Book.findOneAndDelete({id:id})
        res.status(201).json(deletedBook)
    } catch (error) {
        console.log(error)
        res.status(201).json(error)
    }
}