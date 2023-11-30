const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/bookstore")
.then(()=> console.log("connection successful"))
.catch((err)=> console.log(err));


const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
})

const BookStore = new mongoose.model("BookStore", bookSchema);

module.exports = BookStore; 