const mongoose = require('mongoose');

const borrowerSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
        length: 8
    },
    street: String,
    email: String
});

const Borrower = mongoose.model('Borrower', borrowerSchema);

module.exports = Borrower;