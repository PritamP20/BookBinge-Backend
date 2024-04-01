const exp = require("constants");
const express = require("express")
const fs = require("fs")
const booksRouter = require('./routes/booksRoute')
const mongoose = require("mongoose")
const morgan = require("morgan")
const server = express()
const cors = require("cors")
require("dotenv").config()

main().catch((err)=> console.log(err))
async function main() {
    // console.log(process.env.MONGO_DB)
    await mongoose.connect(process.env.MONGO_DB);
    console.log("connected to database");
  }

server.use(cors())
server.use(express.json())
server.use(morgan('dev'))
server.use('/books',booksRouter.router)


server.listen(8081, ()=>{
    console.log('server started')
})