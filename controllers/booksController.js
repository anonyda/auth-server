const Book = require("../models/booksModel");

const getAllBooks = async (req, res, next) => {
    try{
        let books = await Book.find({});
        if(!books){
            throw Error('Books Not Found')
        }
        return res.status(200).json({
            message: 'Books Fetched',
            books,
            user: req.user
        });

    }catch(err){
        return res.status(500).json({
            error: err.message
        });
    }
}

module.exports = {
    getAllBooks
}