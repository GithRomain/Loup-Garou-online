const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    pseudo: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        max: 10
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

    rank: {
        type: String,
        enum: ['admin', 'player', 'none'],
        default: 'none'
    },

    photo: {
      type: String,
      default: "DEFAULTURL"
    },

    lightMode: {
        type: Boolean,
        default: false
    },

    role: {
        type: Object,
        default: null
    },

    status: {
        type: Boolean,
        default: false
    },

    winningGames: {
        type: Number,
        default: 0
    },

    kills: {
        type: Number,
        default: 0
    },

    metier: {
        type: Object,
        default: null
    },

    relations: {
        type: [Object],
        default: []
    },

    friendList: {
        type: [String],
        default: []
    },

    lobbies: {
        type: [String],
        default: []
    }
})

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);