const mongoose = require('mongoose');
const toDoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    completedTime: {
        type: Date,
    },
    createdTime: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('ToDoList', toDoListSchema);