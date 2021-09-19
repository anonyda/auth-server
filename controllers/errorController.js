
const handleError = (err) => {
    // console.log('errors',Object.values(err.errors));
    console.log(err);
    let errors = {
        firstName: '', 
        lastName: '', 
        userPassword: '', 
        userEmail: ''
    }

    if(err.code === 11000){
        errors.userEmail = 'This email is already in use.'
        return errors;
    }
    // validation error
    if(err.message.includes('ValidationError')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        });
    }

    if(err.message === 'Incorrect Email'){
        errors.userEmail  = 'That email is not registered.'
    }

    if(err.message === 'Incorrect Password'){
        errors.userPassword = 'Incorrect Password.'
    }
    

    return errors; 
}

module.exports = handleError;