const express = require('express');
const router = express.Router();

const bookService = require('./services/BookService');

router.get('/books/initdb', bookService.initDb );

router.get('/stores', bookService.getStores );
router.get('/categories', bookService.getCategories );

router.get('/books', bookService.getBooks );
router.get('/books/:bookId', bookService.getBook );

router.get('/booksreport/', bookService.getBooksSummary );

router.post('/books', bookService.addBook );
router.post('/books/:bookId/reviews', bookService.addReview );

router.put('/books/:bookId', bookService.updateBook );
router.put('/books/:bookId/reviews/:reviewId', bookService.updateReview );
router.delete('/books/:bookId', bookService.deleteBook );

module.exports = router;