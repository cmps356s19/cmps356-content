const bookRespository = require('../models/BookRepository');

class BookService {
    async getStores(req, res) {
        const stores = await bookRespository.getStores();
        res.json(stores);
    }

    async getCategories(req, res) {
        let categories = await bookRespository.getBookCategories()
        console.log("getCategories", categories);
        res.json(categories);
    }

    async addBook(req, res) {
        let book = await bookRespository.addBook(req.body);
        res.status(201).send(book);
    }

    /*
    Example:
     {
         "author": "Soft Reviewer",
         "rating": 4,
         "reviewText": "Fun but scary book :)"
     }
    */
    async addReview(req, res) {
        let book = await bookRespository.addReview(req.params.bookId, req.body);
        res.status(200).json(book);
    }

    async updateReview(req, res) {
        let book = await bookRespository.updateReview(req.params.bookId, req.params.reviewId, req.body);
        res.status(200).json(book);
    }

    //to pass the category parameter use /api/books?category=Programming
    //to pass the isbn parameter use /api/books?isbn=123
    //to pass the isbn parameter use /api/books?author=authorName
    async getBooks(req, res) {
        let books;
        try {
            if (req.query.isbn) {
                books = await bookRespository.getBookByIsbn(req.query.isbn);
            }
            else if (req.query.author) {
                books = await bookRespository.getBooksByAuthor(req.query.author);
            } else if (req.query.increaseValue) {
                books = await bookRespository.increaseBookPrices(req.query);
            }
            else {
                books = await bookRespository.getBooks(req.query);
            }

            if (books) {
                res.status(200).json(books);
            }
            else {
                res.status(404).send('No book found');
            }
        }
        catch (err) {
            res.status(500).send(err)
        }
    }


    async getBooksSummary(req, res) {
        let books = await bookRespository.getBooksSummary();
        res.status(200).json(books);
    }

    async getBook(req, res) {
        try {
            let book = await bookRespository.getBook(req.params.bookId);
            console.log('getBook.book', book);
            if (book) {
                res.status(200).json(book);
            }
            else {
                res.status(404).send('no book found');
            }
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

    async updateBook (req, res) {
        try {
            const updateResult = await bookRespository.updateBook(req.body);
            console.log("Controller.updateBook", updateResult);
            res.status(200).send("Book saved");
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async deleteBook (req, res) {
        try {
            await bookRespository.deleteBook(req.params.bookId);
            res.status(204).send();
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async initDb (req, res) {
        await bookRespository.initDb();
        if (res) {
            res.status(200).send('done');
        }
    }
}

module.exports = new BookService();