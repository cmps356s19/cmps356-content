const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: String,
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: {type: String, required : true, trim: true},
    createdOn: {type: Date, default : Date.now}
});

const bookSchema = new mongoose.Schema({
    isbn: {type: String, required : true, trim: true, unique: true},
    title: {type: String, required : true, trim: true},
    authors: [ String ],
    publisher: {name: String, country: String},
    category: String,
    price: Number,
    pages: Number,
    available: {type: Boolean, default:true, required: true},
    createdOn : { type : Date, default : Date.now },
    reviews: {type: [reviewSchema], default: undefined },
    store : [{ type : mongoose.Schema.ObjectId, ref : 'Store' }]
});

//Custom Validtor
bookSchema.path('isbn').validate( value => value.length >= 3 );

module.exports = mongoose.model('Book', bookSchema);