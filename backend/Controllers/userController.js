const User = require('../Models/userModel');

//first, adding in a user

let signup = (req, res) => {
    User.findOne({email: req.body.email}).then((existingUser) => { //the find one function is easy enough, just make sure that the first part of the condition matches exactly with the model username
        if (existingUser) {
            return res.status(400).send({message: "User Account Already Created!!"})
        }

        let user = new User({ //create a new entry
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })

        user.save().then((user) => {
            res.status(200).send({message: "User Account Created Successfully!", user: user})
        }).catch((err) => {
            res.status(400).send({message: "Error occured while creating account", error: err})
        })

    }).catch((err) => {
        console.log("Error occurred while checking if the email already exists in the database")
    })
}

let login = (req, res) => {
    let checkName = req.body.username
    let checkEmail = req.body.email
    let checkPassword = req.body.password
    let secretKey = process.env.SECRET_KEY //make sure to store this in the .env file too

    User.findOne({email: checkEmail}).then((user) => {
        if (user) {
            if (user.password == checkPassword) {
                let token = jwt.sign({email: checkEmail, username: checkName}, secretKey, {expiresIn: '1h'})
                res.status(200).send({message: "Login Successful", token: token}) //token passed via json reply, and in the message too, under token heading
            }
            else {
                res.status(400).send({message: "Password is incorrect"})
            }
        }
    }).catch((err) => {
        res.status(404).send({message: "An error occurred during login", error: err.message})
    })
}

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

module.exports = { signup, login, addUser, editUser, deleteUser };