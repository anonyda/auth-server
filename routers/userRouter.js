const express = require('express');
const { createUser, getUser, logIn, authenticateToken, logOut } = require('../controllers/userController');
// const { uploadImage, addFileNameToDB} = require('../controller/uploadController');


const router = express.Router();

router.route('/signup').post(createUser);
router.route('/login').post(logIn);
router.route('/logout').get(logOut);


module.exports = router;