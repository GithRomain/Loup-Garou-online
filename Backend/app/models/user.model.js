const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

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

    lightMode: {
        type: Boolean,
        default: true
    },

    language: {
        type: String,
        default: "en"
    }
})

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);