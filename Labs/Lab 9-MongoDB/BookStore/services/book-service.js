const bookRepo = require('../repositories/bookRepo')

class BookService {

    async getCategories(req, res) {
        try {
            const categories = await bookRepo.getCategories();
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getAuthors(req, res) {
        try {
            const authors = await bookRepo.getAuthors();
            res.status(200).json(authors);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    
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
    async getBooks(req, res) {
        try {
            console.log(req.query);
            let books;
            if (req.query.name)
                books = await bookRepo.getBooksByName(req.query.name);
            else if (req.query.pageCount)
                books =  await bookRepo.getBooksByPageCount(parseInt(req.query.pageCount));
            else if (req.query.author)
                books =  await bookRepo.getBooksByAuthor(req.query.author);
            else if (req.query.category)
                books =  await bookRepo.getBooksByCategory(req.query.category);
            else if (req.query.isbn)
                books =  await bookRepo.getBookByISBN(req.query.isbn);
            else
                books =  await bookRepo.getBooks();

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