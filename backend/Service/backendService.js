const ToDoListItem = require("../Models/doItemModel");
const User = require("../Models/userModel");
const validator = require("../Service/validator");

let addListItemService = async(req) => {

    let item = new ToDoListItem({
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        completedTime: req.body.completedTime,
        createdTime: req.body.createdTime
    });

    const errors = validator.validateItemCreation(item);

    if (errors.length > 0) {
        throw errors;
    }
    else {
        const result = await item.save();
        return result;
    }    
}

let getAllListItemService = async(req) => {
    const { username, createdTime} = req.query;
  
    const items = await ToDoListItem.find({ username, createdTime});

    if (items == []) { 
        return message = "Error retrieving items";
    }
    else {
        return items;
    }
};

let updateListItemService = async(req) => { 
    const { username, title, createdTime, status } = req.body;

    const response = await ToDoListItem.findOne({ username, title, createdTime });

    if (!response) {
        return message = "Item not found";
    }

    response.status = status;
    const result = await response.save();
    return result;
}

let deleteListItemService = async(req, res) => {
    const { username, title } = req.query;
    ToDoListItem.deleteOne({ username, title }).then((result) => {
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Item not found" });
        } else {
            res.status(200).json({ message: "Item deleted successfully" });
        }}).catch((err) => {
            res.status(500).json({ message: "Error deleting item", error: err });
    });
}

let signupService = async(req, res) => {
    await User.findOne({username: req.body.username}).then((existingUser) => { //the find one function is easy enough, just make sure that the first part of the condition matches exactly with the model username
        if (existingUser) {
            res.status(500).send("Username already exists");
        }
        else {
            let user = new User({
                username: req.body.username,
                password: req.body.password
            });
        
            user.save().then((result) => {
                res.status(200).send(result);
            }).catch((err) => {
                res.status(400).send(err.message);
            });
        }
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send(err.message);
    });
}

let loginService = async(req, res) => { 
    let checkName = req.body.username
    let checkPassword = req.body.password
    let secretKey = process.env.SECRET_KEY //make sure to store this in the .env file too

    await User.findOne({username: checkName}).then((user) => {
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
        res.status(404).send({message: "An error occurred during login", error: err.message})
    })
}

module.exports = { addListItemService, getAllListItemService, updateListItemService, deleteListItemService, signupService, loginService};