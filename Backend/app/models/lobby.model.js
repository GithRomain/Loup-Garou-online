const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const User = require("../models/user.model");

const LobbySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        max: 20
    },

    description: {
        type: String,
        max: 50,
        default: ""
    },

    mode: {
        type: String,
        enum: ['online', 'irl'],
        default: 'online'
    },

    timerRole: {
        type: Number,
        enum: [15, 30, 45, 60, Infinity],
        default: 30
    },

    timerWereWolf: {
        type: Number,
        enum: [30, 45, 60, 90, Infinity],
        default: 60
    },

    timerDebat: {
        type: Number,
        enum: [60, 90, 120, 150, 180, 210, Infinity],
        default: 90
    },

    stats: {
        type: Object,
        default:
            {
                worstPlayer: "",
                bestPlayer: "",
                bestWereWolf: "",
                bestHuman: ""
            }
    },

    pause: {
        type: Boolean,
        default: false
    },

    code: {
        type: Number,
        required: true
    },

    creator: {
        type: Object,
        default: null
    },

    players: {
        type: [Object],
        default: [User]
    },

    cards: {
        type: Object,
        default: null
    },

    indexScenario: {
        type: Number,
        default: 0
    },

    theme: {
        type: Object,
        default: null
    }
})

LobbySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Lobby", LobbySchema);