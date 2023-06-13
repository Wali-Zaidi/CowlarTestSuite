const User = require('../Models/userModel');

//first, adding in a user

let addUser = (req, res) => {
    
        let user = new User({ 
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        
        user.save().then((userResult) => {
            res.status(200).json({message: "User added successfully", user: userResult})
            console.log("User added successfully");
        }).catch((err) => {
            res.status(500).json({message: "Error adding user", error: err})
            console.log("Error adding user");
        });
}

//second, editing a user

let editUser = (req, res) => { //this is for the user to edit their own profile
    User.updateOne({_id: req.body._id}, {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).then((result) => {
        res.status(200).json({message: "User updated successfully", result: result})
        console.log("User updated successfully");
    }).catch((err) => {
        res.status(500).json({message: "Error updating user", error: err})
        console.log("Error updating user");
    });
}

//third, deleting a user

let deleteUser = (req, res) => { //this is for the user to delete their own profile
    User.deleteOne({_id: req.body._id}).then((result) => {
        res.status(200).json({message: "User deleted successfully", result: result})
        console.log("User deleted successfully");
    }).catch((err) => {
        res.status(500).json({message: "Error deleting user", error: err})
        console.log("Error deleting user");
    });
}

module.exports = { addUser, editUser, deleteUser };