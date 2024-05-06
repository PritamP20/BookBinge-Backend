const exp = require("constants");
const express = require("express")
const fs = require("fs")
const booksRouter = require('./routes/booksRoute')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const mongoose = require("mongoose")
const morgan = require("morgan")
const server = express()
const cors = require("cors")
require("dotenv").config()
const jwt = require('jsonwebtoken')
const path = require('path')
const publicKey = fs.readFileSync(path.resolve(__dirname, './public.key'), 'utf8')



const auth = (req, res, next)=>{
  try {
    const token = req.get('Authorization').split('Bearer ')[1]
    console.log(token)
    // var decoded = jwt.verify(token, process.env.SECRET)
    var decoded = jwt.verify(token, publicKey)
    console.log(decoded)
    if (decoded.email) {
      next()
    }else{
      res.sendStatus(401)
    }
  } catch (error) {
      res.sendStatus(401)
  }
}

main().catch((err)=> console.log(err))
async function main() {
    // console.log(process.env.MONGO_DB)
    await mongoose.connect("mongodb+srv://pripritam7:42I2OCzeZFsEYfT2@cluster0.sokdjwb.mongodb.net/BookBinge");
    console.log("connected to database");
  }

server.use(cors())
server.use(express.json())
server.use(morgan('dev'))
server.use('/auth', authRouter.router)
server.use('/books',booksRouter.router)
server.use('/users', auth, userRouter.router)


server.listen(8081, ()=>{
    console.log('server started')
})