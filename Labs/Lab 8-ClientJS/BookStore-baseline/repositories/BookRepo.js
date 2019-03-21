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
            const book = books.find(book => book.title.toLowerCase().includes(bookName.toLowerCase()));
            console.log(book);
            return book;
        } catch (e) {
            return e;
        }
    }

    async addBook(book) {
        try {
            const books = await this.getBooks();
            books.push(book)
            if (await this.saveBooks(books)) return book;
        } catch (e) {
            return e;
        }
    }

    async updateBook(isbn, updatedBook) {
        try {
            const books = await this.getBooks();
            const index = books.findIndex(book => book.isbn == isbn)
            books[index] = updatedBook;
            if (await this.saveBooks(books)) return book;
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
            return books.filter(book => book.authors.find(author => author.toLowerCase().includes((authorName.toLowerCase()))));
        } catch (e) {
            console.log(e);
        }
    }

    async getBooksByISBN(isbn) {
        try {
            let books = await this.getBooks();
            return books.find(book => book.isbn===isbn);
        } catch (e) {
            console.log(e);
        }
    }

    async getBooksByCategory(bookCategory) {
        try {
            let books = await this.getBooks();

            return books.filter(book => book.categories.find(category => category.toLowerCase().includes(bookCategory.toLowerCase().trim())));

        } catch (e) {
            console.log(e);
        }
    }

    //Returns a map that contains the author name and the number of books they have authored. E.g.
    async getBooksSummary() {
        try {
            let summary = {};
            const books = await this.getBooks();
            for(let book of books){
                book.authors.forEach(author => {
                    if(author.length==0) return;
                    summary[author]? summary[author]++: summary[author]=1;
                })
            }
            return summary;
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

    //run this method to delete books without description
    async cleanBooks() {
        const books = await this.getBooks();
        const cleanBooks= books.filter(book => book.shortDescription && book.shortDescription.length > 10)
        await this.saveBooks(cleanBooks)
    }
}

module.exports = new BookRepo();
let bookRepo = new BookRepo();
