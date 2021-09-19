const express = require('express');
const { getAllBooks } = require('../controllers/booksController');
const { authenticateToken } = require('../controllers/userController');



const router = express.Router();

router.route('/').get(authenticateToken, getAllBooks);



module.exports = router;