const mongoose = require('mongoose');
const toDoListSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        min: 4,
        max: 30
    }, 
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'] //just to make sure that the status is either active or inactive
    },
    completedTime: {
        type: Date,
    },
    createdTime: {
        type: Date,
        default: Date.now, //this will automatically set the time to the current time
        required: true
    }
});

module.exports = mongoose.model('ToDoList', toDoListSchema);