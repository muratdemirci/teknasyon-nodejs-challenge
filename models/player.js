const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        lowercase: true,
        required: true
    },
    score: {
        type: Number,
        min:0,
        required: true
    },
    dailyProgress: {
        type: Array,
        min:0,
        required: true
    },
    chips: {
        type: Number,
        min:0,
        required: true
    },
    age: {
        type: Number,
        min:13,
        required: true
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;