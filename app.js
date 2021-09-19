const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var cors = require('cors')

dotenv.config({path: './config.env'});

// const uploadRouter = require('./routes/uploadRouter');
const userRouter = require('./routers/userRouter');
const booksRouter = require('./routers/booksRouter');


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use('/images', uploadRouter);
app.use('/users', userRouter);
app.use('/books', booksRouter);
console.log(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log('Could Not Connect to database', err);
        return;
    }
    app.listen(process.env.PORT, () => {
        console.log(`Server started at port ${process.env.PORT}`);
    });
});

