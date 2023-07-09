const ToDoListItem = require("../Models/doItemModel");
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

    if (errors.length >= 0) {
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
        console.log("Item not found");
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




module.exports = { addListItemService, getAllListItemService, updateListItemService, deleteListItemService };