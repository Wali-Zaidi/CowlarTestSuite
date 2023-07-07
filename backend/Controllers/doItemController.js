const ToDoListItem = require('../Models/doItemModel');

//first, adding in a list item

let addListItem = (req, res) => {

    let item = new ToDoListItem({ 
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        completedTime: req.body.completedTime,
        createdTime: req.body.createdTime
    });
    
    item.save().then((itemResult) => {
        res.status(200).json({message: "Item added successfully", item: itemResult})
        console.log("Item added successfully");
    }).catch((err) => {
        res.status(500).json({message: "Error adding item", error: err})
        console.log(err)
        console.log("Error adding item");
    });
}

//second, getting all the list items for the current user

let getAllListItems = (req, res) => {
    const { username, createdTime} = req.query;
  
    ToDoListItem.find({ username, createdTime})
      .then((items) => {
        console.log(items)
        res.status(200).json({ message: "Items retrieved successfully", items });
        console.log("Items retrieved successfully");
      })
      .catch((err) => {
        res.status(500).json({ message: "Error retrieving items", error: err });
        console.log("Error retrieving items");
      });
};
  
//usually we would need something like getting a specifc item, but we can search the item from the items array that we get from getAllListItems
    
//third, updating a list item

let updateListItem = async(req, res) => {
    const { username, title, createdTime, status } = req.body;

    const response = await ToDoListItem.findOne({ username, title, createdTime });

    if (!response) {
        res.status(404).json({ message: "Item not found" });
        console.log("Item not found");
        return;
    }

    response.status = status;
    const result = await response.save();
    res.status(200).json({ message: "Item updated successfully", result });

}

//and finally, deleting a list item

let deleteListItem = (req, res) => {
    const { username, title } = req.query;
    console.log(username, title)
    ToDoListItem.deleteOne({ username, title }).then((result) => {
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Item not found" });
            console.log("Item not found");
        } else {
            res.status(200).json({ message: "Item deleted successfully" });
            console.log("Item deleted successfully");
        }}).catch((err) => {
            res.status(500).json({ message: "Error deleting item", error: err });
            console.log("Error deleting item", err);
      });
};

module.exports = { addListItem, getAllListItems, updateListItem, deleteListItem };

//final version of doItemController.js