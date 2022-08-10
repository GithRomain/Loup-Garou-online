const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

//clef secrete
const key = process.env.TOKEN;

// import bcryptjs - hashing function
const bcrypt = require('bcryptjs');
// import jsonwebtoken
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    pseudo: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },

    password: {  //est hashé
        type: String,
        required: true
    },
})

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);