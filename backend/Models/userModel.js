const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4, //since my own name is only 4, so make a habit of min 4
        max: 30
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 30
    }
});

//username mostly for frontend display purposes

module.exports = mongoose.model('ListUsers', userSchema);

//final version of userModel.js