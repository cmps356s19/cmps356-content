const path = require('path')

class BookRepo {
    constructor() {
        this.fse = require('fs-extra');
        this.booksFilePath = path.resolve(__dirname, '../data/catalog-books.json')
    }

    async getBooks() {
        let data = await this.fse.readFile(this.booksFilePath);
        let books = await JSON.parse(data);
        return books;
    }

    async getBook(bookName) {
        try {
            const books = await this.getBooks();
            return books.find(book => book.title === bookName);
        } catch (e) {
            return e;
        }
    }

    async addBook(book) {
        try {
            const books = await this.getBooks();
            books.push(book)
            if(await this.saveBooks(books)) return book;
        } catch (e) {
            return e;
        }
    }

    async updateBook(isbn, updatedBook) {
        try {
            const books = await this.getBooks();
            const index = books.findIndex(book => book.isbn == isbn)
            books[index] = updatedBook;
            if(await this.saveBooks(books)) return book;
        } catch (e) {
            return e;
        }
    }

    async deleteBook(isbn) {
        try {
            const books = await this.getBooks();
            const index = books.findIndex(book => book.isbn == isbn)
            console.log('before delete', books.length);
            books.splice(index, 1);
            console.log('after delete ', books.length);
            return await this.saveBooks(books)
        } catch (e) {
            return e;
        }

    }

    async getBooksByPageCount(pageCount) {
        try {
            let books = await this.getBooks();
            return books.filter(book => book.pageCount >= pageCount);

        } catch (e) {
            return e;
        }
    }

    async getBooksByAuthor(authorName) {
        try {
            let books = await this.getBooks();
            return books.filter(book => book.authors.find(author => author === authorName));
        } catch (e) {
            console.log(e);
        }
    }


    // Returns the books for a particular category.
    async getBooksByCategory(bookCategory) {
        try {
            let books = await this.getBooks();
            return books.filter(book => book.categories.find(category => category === bookCategory));

        } catch (e) {
            console.log(e);
        }
    }

    //Returns a map that contains the author name and the number of books they have authored. E.g.
    async getBooksSummary() {
        try {
            let authorsMap = new Map();
            let books = await this.getBooks();
            books.forEach(book => {
                book.authors.forEach(author => {
                    if (authorsMap.has(author)) {
                        let value = authorsMap.get(author);
                        authorsMap.set(author, ++value);
                    } else
                        authorsMap.set(author, 1);
                })
            });
            return authorsMap;
        } catch (e) {
            console.log(e);
        }
    }

    async saveBooks(books) {
        try {
            await this.fse.writeJSON(this.booksFilePath, books)
            return books;
        } catch (e) {
            return e
        }
    }
}

module.exports = new BookRepo();
let bookRepo = new BookRepo();

const book = {
    "_id": 1,
    "title": "The Unlocking Android Book",
    "isbn": "1933988673",
    "pageCount": 416,
    "publishedDate": {
        "$date": "2009-04-01T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
    "shortDescription": "Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout.",
    "longDescription": "Android is an open source mobile phone platform based on the Linux operating system and developed by the Open Handset Alliance, a consortium of over 30 hardware, software and telecom companies that focus on open standards for mobile devices. Led by search giant, Google, Android is designed to deliver a better and more open and cost effective mobile experience.    Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout. Based on his mobile development experience and his deep knowledge of the arcane Android technical documentation, the author conveys the know-how you need to develop practical applications that build upon or replace any of Androids features, however small.    Unlocking Android: A Developer's Guide prepares the reader to embrace the platform in easy-to-understand language and builds on this foundation with re-usable Java code examples. It is ideal for corporate and hobbyists alike who have an interest, or a mandate, to deliver software functionality for cell phones.    WHAT'S INSIDE:        * Android's place in the market      * Using the Eclipse environment for Android development      * The Intents - how and why they are used      * Application classes:            o Activity            o Service            o IntentReceiver       * User interface design      * Using the ContentProvider to manage data      * Persisting data with the SQLite database      * Networking examples      * Telephony applications      * Notification methods      * OpenGL, animation & multimedia      * Sample Applications  ",
    "status": "PUBLISH",
    "authors": [
        "W. Frank Ableson",
        "Charlie Collins",
        "Robi Sen"
    ],
    "categories": [
        "Java",
        "Open Source",
        "Mobile", "java"
    ]
};

bookRepo.updateBook(1933988673, book).then(book => console.log(book))
// bookRepo.getBook("Specification by Example").then(result=> console.log(result));
// bookRepo.getBooksByPageCount(700).then(result => console.log(result.length));
// bookRepo.getBooksByAuthor("Abdulahi").then(result => console.log(result));
// bookRepo.getBooksSummary().then(result => console.log(result));
// bookRepo.getBooksByCategory("Programming").then(result => console.log(result));
