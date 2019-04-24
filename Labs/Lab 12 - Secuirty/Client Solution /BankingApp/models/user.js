const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        unique : true,
        required : [true, "username  is required"]
    },
    password : {
        type : String,
        required : [true, "password is required"]
    },
    role : {
        type : String,
        enum: ["manager" , "clerk"],
        required : [true , "user role is required"]
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;