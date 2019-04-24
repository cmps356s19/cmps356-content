const bookRepo = require('../repositories/bookRepo')

class BookService {

    //Create
    async addBook(req, res) {
        try {
            await bookRepo.addBook(req.body);
            console.log(req.body);
            res.status(200).json(req.body);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    //Read
    async getBook(req, res) {
        try {
            console.log(req.query);

            if (req.query.name)
                res.status(200).json(await bookRepo.getBook(req.query.name))
            else if (req.query.pageCount)
                res.status(200).json(await bookRepo.getBooksByPageCount(parseInt(req.query.pageCount)))
            else if (req.query.author)
                res.status(200).json(await bookRepo.getBooksByAuthor(req.query.author))
            else if (req.query.category)
                res.status(200).json(await bookRepo.getBooksByCategory(req.query.category))
            else if (req.query.isbn)
                res.status(200).json(await bookRepo.getBooksByISBN(req.query.isbn))
            else
                res.status(200).json(await bookRepo.getBooks())
        } catch (err) {
            res.status(500).send(err);
        }
    }

    //Update
    async updateBook(req, res) {

        try {
            const updatedBook = req.body;
            await bookRepo.updateBook(req.params.isbn, updatedBook);
            res.status(200).send("Updated book");
        } catch (err) {
            res.status(500).send(err);
        }
    }

    //Delete
    async deleteBook(req, res) {
        try {
            const isbn = req.params.isbn;
            await bookRepo.deleteBook(isbn);
            res.status(200).send(`deleted book ${isbn}`);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getBooksSummary(req, res) {
        try {
            const summary = await bookRepo.getBooksSummary();
            res.status(200).json(summary);
        } catch (err) {
            res.status(500).send(err);
        }
    }

}

module.exports = new BookService()