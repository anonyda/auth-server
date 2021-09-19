const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({

    bookId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year_written: {
        type: Number,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
