const mongoose = require("mongoose")
const {Schema} = mongoose;

const booksSchema = new Schema({
    // id:{type: Number, required: true, unique: [true, 'enter a unique id']},
    name:{type: String, required: true},
    by:{type: String, required: true},
    url:{type: String, required: true},
    detail:{type: String, required: true} ,
    colour:{type: String},
    category:{type: String, required: true},
    ClgNotes: {type: String},
    listedBy : {type: Object},
    possesdBy: {type: Object},
    listedOn: {type: Object},
    lastDate:{type: Date}

})

exports.Book = mongoose.model('Book', booksSchema)