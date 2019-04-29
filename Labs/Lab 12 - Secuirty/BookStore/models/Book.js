const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    isbn: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    pageCount: {
        type: Number,
        min: 0,
        required: true
    },
    publishedDate: Date,
    thumbnailUrl: {
        type: String
    },
    shortDescription: String,
    longDescription: String,
    status: {
        type: String,
        required: true,
        enum: ['PUBLISH', 'MEAP']
    },
    authors: [{
        type: Schema.ObjectId,
        ref: 'Author',
        required: true
    }],
    borrowerId: {
        type: Schema.ObjectId,
        ref: 'Borrower'
    },
    categories: [{
        type: String,
        trim: true
    }],
    isBorrowed: {
        type: Boolean,
        default: false,
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;