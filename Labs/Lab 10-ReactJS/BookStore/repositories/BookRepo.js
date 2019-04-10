const Book = require('../models/Book'),
    Author = require('../models/Author'),
    Borrower = require('../models/Borrower'),
    Borrwing = require('../models/Borrowing'),
    mongoose = require('mongoose'),
    path = require('path');
const fs = require('fs-extra'),
    chance = require('chance').Chance();

class BookRepo {

    async getCategories() {
        return await Book.distinct('categories');
    }

    async getAuthors() {
        return await Author.find();
    }

    async getBooks() {
        return await Book.find().populate('authors');
    }

    async getBooksByNameOrISBN(query) {
        return await Book.find(query);
    }

    async getBooksByPageCount(pageCount) {
        return await Book.find({pageCount: {$gte: pageCount}});
    }

    async getBooksByAuthor(authorName) {
        let author = await Author.findOne({name: authorName});
        return await Book.find({
            authors: {
                $in: [author._id]
            }
        });
    }

    async getBooksByCategory(bookCategory) {
        return await Book.find(
            {
                categories: {
                    $in: [bookCategory]
                }
            });
    }

    async getBooksSummary() {
        return await Book.aggregate([
            {
                $unwind: "$categories"
            },
            {
                $group: {
                    _id: "$categories",
                    Number_of_Books: {$sum: 1},
                    Average_Pages: {$avg: "$pageCount"}
                }
            }

        ]);
    }

    async getTop3Borrowers() {
        return Borrwing.aggregate([
            {
                $lookup: {
                    from: 'borrowers',
                    localField: 'borrowerId',
                    foreignField: '_id',
                    as: 'Borrower'
                }

            }, {
                $unwind: '$Borrower'
            }, {
                $group: {
                    _id: '$Borrower.name',
                    Number_of_Borrowed_Books: {$sum: 1},
                }
            },
            {
                $sort: {
                    Number_of_Borrowed_Books: -1
                }
            },
            {
                $limit: 3
            }
        ]);
    }

    async getTop3BorrowedBooks() {
        return Borrwing.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookId',
                    foreignField: '_id',
                    as: 'book'
                }

            }, {
                $unwind: '$book'
            }, {
                $group: {
                    _id: '$book.title',
                    Number_of_Borrowed_Times: {$sum: 1},
                }
            },
            {
                $sort: {
                    Number_of_Borrowed_Times: -1
                }
            },
            {
                $limit: 3
            }
        ]);
    }

    async getSummaryForBorrowedCategories() {
        return Borrwing.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: 'book',
                    foreignField: '_id',
                    as: 'books_summary'
                }

            }, {
                $unwind: '$books_summary'

            }, {
                $unwind: '$books_summary.categories'

            }, {
                $group: {
                    _id: '$books_summary.categories',
                    Number_of_Books: {$sum: 1}
                }
            },
            {
                $sort: {
                    Number_of_Books: -1
                }
            }
        ])
    }

    async addAuthor(author) {
        return Author.create(author);
    }

    async addBook(book) {
        //we expect the book to have the Ids of the authors
        return Book.create(book);
    }

    async updateBook(isbn, updatedBook) {
        let authors = updatedBook.authors;
        updatedBook.authors = [];
        let book = await Book.findOne({isbn});
        if (updatedBook && updatedBook.isbn == isbn) {
            updatedBook.borrowed = book.borrowed;
            authors.forEach(async author => {
                let authorDB = await Author.findOne({name: author});
                if (authorDB && !authors.find(author => author == authorDB.name)) {
                    authorDB.authoredBooks.push(updatedBook._id);
                    updatedBook.authors.push(authorDB._id);
                    await authorDB.save();
                    await Book.findByIdAndUpdate({isbn}, updatedBook)
                } else {
                    let newAuthor = await new Author({
                        name: author,
                        phoneNumber: Number(chance.phone({formatted: false})),
                        street: chance.street(),
                        email: `${author}@bookstore.qa`
                    }).save();
                    newAuthor.authoredBooks.push(updatedBook._id);
                    updatedBook.authors.push(newAuthor._id);
                    await newAuthor.save();
                    await Book.findByIdAndUpdate({isbn}, updatedBook)
                }
            });
        }
        return updatedBook;
    }

    async deleteBook(isbn) {
        return await Book.findOneAndDelete({isbn});
    }

    async borrowBook(borrowing) {

        const newBorrowing = await Borrwing.create(borrowing);
        const book = Book.findOne({"bookId": borrowing.bookId})

        book.borrowed = true;
        book.borrowerId = borrowing.borrowerId;

        await book.save();
        return await borrowing.save();


    }

    async returnBook(isbn) {
        let book = await Book.findOne({isbn});
        if (book) {
            book.borrower = null;
            book.borrowed = false;
            return await book.save();
        }
        return 'Book not found';
    }
}

module.exports = new BookRepo();

let book = new BookRepo();
