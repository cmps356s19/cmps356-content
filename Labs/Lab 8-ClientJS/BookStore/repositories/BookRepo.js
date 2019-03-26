const path = require('path');
const fs = require('fs-extra');

class BookRepo {
    constructor() {
        this.booksFilePath = path.resolve(__dirname, '../data/catalog-books.json');
    }

    async getCategories() {
        const filePath = path.resolve(__dirname, '../data/categories.json');
        const data = await fs.readFile(filePath);
        return await JSON.parse(data);
    }

    async getAuthors() {
        const filePath = path.resolve(__dirname, '../data/authors.json');
        const data = await fs.readFile(filePath);
        return await JSON.parse(data);

        /*  const data = await this.getBooks();
        let authors = new Set();
        data.forEach(b => {
            const cats = b.authors;
            cats.forEach(c => {
                authors.add(c);
            });
        });

        authors = [...authors].sort();
        console.log(authors);
        return authors;*/
    }

    async getBooks() {
        const data = await fs.readFile(this.booksFilePath);
        return await JSON.parse(data);
    }

    async getBooksByName(bookName) {
           try{
               console.log(bookName);
               const books = await this.getBooks();
               return books.find(b => b.title.toLowerCase().includes(bookName.toLowerCase()));
           }catch (e) {
               return e;
           }
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