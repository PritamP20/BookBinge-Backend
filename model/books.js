const mongoose = require("mongoose")
const {Schema} = mongoose;

const booksSchema = new Schema({
    id:{type: Number, required: true, unique: [true, 'enter a unique id']},
    // id: {type:Number},
    name:{type: String, required: true},
    by:{type: String, required: true},
    // originalPrice: {type: Number, required: true},
    // disPrice: {type: Number, required: true},
    url:{type: String, required: true},
    detail:{type: String, required: true} ,
    colour:{type: String},
    category:{type: String, required: true},
    ClgNotes: {type: String}
})

exports.Book = mongoose.model('Book', booksSchema)