const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    acctType : {
        type : String,
        enum: ['Saving', 'Current'],
        required : [true, "Account type is required"]
    },
    balance : {
        type : Number,
        min : [0, "You can not have a negative balance"],
        required : [true, "Balance is required"]
    }
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;