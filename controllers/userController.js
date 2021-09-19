const User = require('../models/userModel');
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const handleError = require('./errorController');

const createUser = async (req, res, next) => {
    
    try{
        let { firstName, lastName, userEmail, userPassword } = req.body;
        console.log(req.body);
        let newUser = await User.create({
            userID: uniqid(),
            firstName,
            lastName,
            userEmail,
            userPassword: await bcrypt.hash(userPassword, 10),
            // profilePicture: req.file.filename
        });
        const accessToken = createToken(newUser);
        return res.status(201).cookie('jwt', accessToken, {httpOnly: true}).json({
            message: 'User Successfully Created',
            data: newUser,
            accessToken
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Error Creating User',
            error: handleError(err)
        });
    }
   

}

const logIn = async (req, res, next) => {

    try{
        console.log(req.body);
        const user = await User.login(req.body.userEmail, req.body.userPassword);
        // console.log('user', user);
        const accessToken = createToken(user);
        // console.log(accessToken);
        return res.status(200)
            .cookie('jwt', accessToken, {httpOnly: true})
            .json({
                message: 'User Logged In',
                accessToken,
                user
            }
        );

    }catch(err){
        console.log(err);
        const error = handleError(err)
        return res.status(500).json({
            message: 'Error Logging In',
            error
        });
    }
}

const logOut = (req, res, next) => {
    res.cookie('jwt', '', {maxAge: 1});
    // res.redirect('/users/login');
    res.status(200).json({
        message: 'Logged Out'
    });
}

const createToken = (user) => {
    const accessToken = jwt.sign(user.toObject(), process.env.ACCESS_TOKEN);
    return accessToken;
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token === null){
        res.locals.user = null;
        return res.status(400).json({
            message: 'Token not provided.',
            error: 'You need access token to perform this operation'
        });
    
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err){
            res.locals.user = null;
            return res.status(400).json({
                message: 'You do not have access.',
                error: 'Operation not allowed.'
            }); 
        }
        req.user = user;
        res.locals.user;
        next();
    }); 

}

const getUser = async (req, res, next) => {
    try{
        let user = await User.findOne({userID: req.params.userID});
        res.status(200).json({
            message: 'User Fetched',
            data: user
        });

    }catch(err){
        return res.status(500).json({
            message: 'Error Fetching User',
            error: err
        });
    }
}

module.exports = {
    createUser,
    getUser,
    logIn,
    logOut,
    authenticateToken
}