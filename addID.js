const uniqid = require('uniqid');
const fs = require('fs');

let books = fs.readFileSync('./data/books.json', 'utf-8');
console.log(books);
let modBooks = JSON.parse(books);
modBooks.forEach((book) => {
    book.bookId = uniqid();
});

console.log(modBooks);

fs.writeFileSync('./data/books.json', JSON.stringify(modBooks, null, 2));


