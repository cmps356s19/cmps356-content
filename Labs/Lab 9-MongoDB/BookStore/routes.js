const bookService = require('./services/book-service'),
    router = require('express').Router();

router.route('/categories').get(bookService.getCategories);
router.route('/authors').get(bookService.getAuthors);

router.route('/books')
    .get(bookService.getBooks)
    .post(bookService.addBook);

router.get('/books/summary', bookService.getBooksSummary);

router.route('/books/:isbn')
    .put(bookService.updateBook)
    .delete(bookService.deleteBook);

module.exports = router;








