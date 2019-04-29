const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
        length: 12
    },
    street: String,
    email: String
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;