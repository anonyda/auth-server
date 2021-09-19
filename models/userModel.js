const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

// const {taskSchema} = require('./taskModel');

const userSchema = mongoose.Schema({

    userID: {
        type: String,
        required: true,
        unique: true
    },
    userEmail: {
        type: String,
        required: [true, 'Please enter an email.'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email.']
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
        minlength: [6, 'Minimum password length is 6 characters.']
        
    },
    profilePicture: {
        type: String,
    }
});

userSchema.statics.login = async function(userEmail, userPassword){
    let user = await User.findOne({userEmail});
    console.log(user);
    if(!user){
        throw Error('Incorrect Email');
    }
    let userVerify = await bcrypt.compare(userPassword, user.userPassword);
    if(!userVerify){
        throw Error('Incorrect Password');
    }
    return user;

}

const User = mongoose.model('User', userSchema);

module.exports = User;

