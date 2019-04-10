const bookRepo = require('../repositories/BookRepo')

class BookService {

    async getCategories(req, res) {
        try {
            const categories = await bookRepo.getCategories();
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    //done
    async getAuthors(req, res) {
        try {
            const authors = await bookRepo.getAuthors();
            res.status(200).json(authors);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    //done
    async addBook(req, res) {
        try {
            const book = await bookRepo.addBook(req.body);
            res.status(201).json(book);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    //done
    async getBooks(req, res) {
        try {
            let books;
            if (req.query.name || req.query.isbn)
                books = await bookRepo.getBooksByNameOrISBN(req.query);
            else if (req.query.pageCount) {
                books = await bookRepo.getBooksByPageCount(req.query.pageCount);
            } else if (req.query.author)
                books = await bookRepo.getBooksByAuthor(req.query.author);
            else if (req.query.category)
                books = await bookRepo.getBooksByCategory(req.query.category);
            else
                books = await bookRepo.getBooks();

            res.status(200).json(books);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    //done
    async updateBook(req, res) {

        try {
            const updatedBook = req.body;
            await
                bookRepo.updateBook(req.params.isbn, updatedBook);
            res.status(200).send("Book updated");
        } catch (err) {
            res.status(500).send(err);
        }
    }


    //done
    async deleteBook(req, res) {
        try {
            const isbn = req.params.isbn;
            await
                bookRepo.deleteBook(isbn);
            res.status(200).send(`Book with ISBN ${isbn} deleted`);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    //done
    async getSummaryReport(req, res) {
        try {
            let report = req.query.report;
            let summary;
            switch (report) {
                case "books-summary":
                    summary = await bookRepo.getBooksSummary();
                    break;
                case "top3borrowers":
                    summary = awaitbookRepo.getTop3Borrowers();
                    break;

                case "top3borrowedBooks":
                    summary = await bookRepo.getTop3BorrowedBooks();
                    break;
                case "summary4BorrowedCategories":
                    summary = await bookRepo.getSummaryForBorrowedCategories();
                    break;
            }
            res.status(200).json(summary);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    //done
    async borrowBook(req, res) {
        try {
            const borrowing = {
                borrowerId: req.query.borrowerId,
                bookId: req.params.bookId
            }
            await bookRepo.borrowBook(borrowing);
        } catch (e) {
            res.status(500).send(err);
        }
    }

    //done
    async unborrowBook(req, res) {
        try {
            await
                bookRepo.returnBook(req.params.isbn);
        } catch (e) {
            res.status(500).send(err);
        }
    }

}

module.exports = new BookService();