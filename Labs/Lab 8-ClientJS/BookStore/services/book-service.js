const bookRepo = require('../repositories/bookRepo')

class BookService {

    //Create
    async addBook(req, res) {
        try {
            const book = await bookRepo.addBook(req.body);
            res.status(201).json(book);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    //Read
    async getBook(req, res) {
        try {
            console.log(req.query);
            let books;
            if (req.query.name)
                books = await bookRepo.getBooksByName(req.query.name);
            else if (req.query.pageCount)
                books =  bookRepo.getBooksByPageCount(parseInt(req.query.pageCount));
            else if (req.query.author)
                books =  bookRepo.getBooksByAuthor(req.query.author);
            else if (req.query.category)
                books =  bookRepo.getBooksByCategory(req.query.category);
            else if (req.query.isbn)
                books =  bookRepo.getBookByISBN(req.query.isbn);
            else
                books =  bookRepo.getBooks();

            res.status(200).json(books);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    //Update
    async updateBook(req, res) {

        try {
            const updatedBook = req.body;
            await bookRepo.updateBook(req.params.isbn, updatedBook);
            res.status(200).send("Book updated");
        } catch (err) {
            res.status(500).send(err);
        }
    }

    //Delete
    async deleteBook(req, res) {
        try {
            const isbn = req.params.isbn;
            await bookRepo.deleteBook(isbn);
            res.status(200).send(`Book with ISBN ${isbn} deleted`);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getBooksSummary(req, res) {
        try {
            const booksSummary = await bookRepo.getBooksSummary();
            res.status(200).json(booksSummary);
        } catch (err) {
            res.status(500).send(err);
        }
    }

}

module.exports = new BookService();