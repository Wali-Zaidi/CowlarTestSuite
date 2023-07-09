const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

//first, adding in a user

let signup = (req, res) => {
    User.findOne({username: req.body.username}).then((existingUser) => { //the find one function is easy enough, just make sure that the first part of the condition matches exactly with the model username
        if (existingUser) {
            return res.status(400).send({message: "User name already exists in the database, please try again with a different username"})
        }

        let user = new User({ //create a new entry
            username: req.body.username,
            password: req.body.password,
        })

        user.save().then((user) => {
            res.status(200).send({message: "User Account Created Successfully!", user: user})
        }).catch((err) => {
            res.status(400).send({message: "Error: Could not create user, try again.", error: err})
        })

    }).catch((err) => {
        res.status(400).send({message: "Error occurred while checking if the username already exists in the database", error: err})
        console.log("Error occurred while checking if the email already exists in the database")
    })
}

let login = (req, res) => {
    let checkName = req.body.username
    let checkPassword = req.body.password
    let secretKey = process.env.SECRET_KEY //make sure to store this in the .env file too

    User.findOne({username: checkName}).then((user) => {
        if (user) {
            if (user.password == checkPassword) {
                let token = jwt.sign({username: checkName}, secretKey, {expiresIn: '1h'})
                res.status(200).send({message: "Login Successful", token: token}) //token passed via json reply, and in the message too, under token heading
            }
            else {
                res.status(400).send({message: "Password is incorrect"})
            }
        }
    }).catch((err) => {
        res.status(404).send({message: "An error occurred during login"})
    })
}

module.exports = { signup, login};

//final version of userController.js