const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    accountId : {
        type : Schema.Types.ObjectId,
        ref : 'Account',
        required : [true, "Account Id is required"]
    },
    transactionType : {
        type : String,
        enum : ["Debit" , "Credit"],
        required : [true, "Transaction type  is required"]
    },
    amount : {
        type : Number,
        required : [true, "Amount is required"],
        min : [0, "Amount can be negative"]
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;