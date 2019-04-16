const mongoose = require('mongoose');

const user = mongoose.Schema({
        sub: String,  //sub : Subject - Identifier for the User at the Issuer e.g., Google
        name: String,
        given_name: {type: String},
        family_name: {type: String},
        email: {type: String},
        password: {type: String},
        gender: String,
        picture: String,    //user photoUrl
        link: String,  //user profileUrl
        oidProvider: {type: String, default: "local"},
        roles: {type: [String], default: ["Contributor"]}
    }
);

module.exports = mongoose.model('User', user);