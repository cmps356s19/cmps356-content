const bookService = require('./services/book-service'),
    router = require('express').Router();

router.route('/categories').get(bookService.getCategories);
router.route('/authors').get(bookService.getAuthors);

router.route('/books')
    .get(bookService.getBooks)
    .post(bookService.addBook);

router.get('/books/summary', bookService.getSummaryReport);

router.route('/books/:isbn')
    .put(bookService.updateBook)
    .post(bookService.borrowBook)
    .patch(bookService.unborrowBook)
    .delete(bookService.deleteBook);

module.exports = router;








