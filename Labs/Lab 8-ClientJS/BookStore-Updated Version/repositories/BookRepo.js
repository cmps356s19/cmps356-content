const path = require('path');
const fs = require('fs-extra');

class BookRepo {
    constructor() {
        this.booksFilePath = path.resolve(__dirname, '../data/catalog-books.json');
    }

    async getBooks() {
        const data = await fs.readFile(this.booksFilePath);
        const books = await JSON.parse(data);
        return books;
    }

    async getBooksByName(bookName) {
            const books = await this.getBooks();
            return books.filter(b => b.title.toLowerCase().includes(bookName.toLowerCase()));
    }

    async getBooksByPageCount(pageCount) {
            const books = await this.getBooks();
            return books.filter(b => b.pageCount >= pageCount);
    }

    async getBooksByAuthor(authorName) {
            const books = await this.getBooks();
            return books.filter(b => b.authors.find(author => author.toLowerCase().includes((authorName.toLowerCase()))));
    }

    async getBookByISBN(isbn) {
        const books = await this.getBooks();
        return books.find(b => b.isbn === isbn);
    }

    async getBooksByCategory(bookCategory) {
            const books = await this.getBooks();
            return books.filter(b => b.categories.find(category => category.toLowerCase().includes(bookCategory.toLowerCase().trim())));
    }

    //Returns a map that contains the author name and the number of books they have authored. E.g.
    async getBooksSummary() {
            const booksSummary = [];
            const books = await this.getBooks();
            for(const book of books){
                book.authors.forEach(author => {
                    if(author.length == 0) return;
                    const foundAt = booksSummary.findIndex(b => b.author === author);
                    if (foundAt >=0 ) {
                        booksSummary[foundAt].booksCount++;
                    } else {
                        booksSummary.push({author, booksCount: 1});
                    }
                })
            }
            return booksSummary;
    }

    async addBook(book) {
        const books = await this.getBooks();
        books.push(book);
        await this.saveBooks(books);
        return book;
    }

    async updateBook(isbn, updatedBook) {
        const books = await this.getBooks();
        const index = books.findIndex(book => book.isbn == isbn)
        books[index] = updatedBook;
        await this.saveBooks(books);
    }

    async deleteBook(isbn) {
        const books = await this.getBooks();
        const index = books.findIndex(book => book.isbn == isbn)
        console.log('before delete', books.length);
        books.splice(index, 1);
        console.log('after delete ', books.length);
        await this.saveBooks(books);
    }

    async saveBooks(books) {
            await fs.writeJSON(this.booksFilePath, books);
    }

    //run this method to delete books without description
    async cleanBooks() {
        const books = await this.getBooks();
        const cleanBooks= books.filter(book => book.shortDescription && book.shortDescription.length > 10)
        await this.saveBooks(cleanBooks);
    }
}

module.exports = new BookRepo();