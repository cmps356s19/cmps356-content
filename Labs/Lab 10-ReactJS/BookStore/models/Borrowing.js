const mongoose = require('mongoose');

const borrowingSchema = mongoose.Schema({
    bookId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book'
    },
    borrowerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Borrower'
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

const Borrowing = mongoose.model('Borrowing', borrowingSchema);

module.exports = Borrowing;