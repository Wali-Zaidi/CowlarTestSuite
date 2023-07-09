const backendService = require('../Service/backendService');
const ToDoListItem = require('../Models/doItemModel');

//first, adding in a list item

let addListItem = (req, res) => {

    backendService.addListItemService(req).then((result) => {
        res.status(200).json({message: "Item added successfully", item: result})
    }
    ).catch((err) => {
        console.log(err);
        for (field in err) {
            res.status(400).json({message: err, error: [field]})
        }
    });

}

//second, getting all the list items for the current user

let getAllListItems = async(req, res) => {

    backendService.getAllListItemService(req).then((result) => {
        if (result) {
            res.status(200).json({message: "Items retrieved successfully", items: result})
            console.log("Items retrieved successfully");
        }
        else {
            res.status(500).json({message: "Error retrieving items", error: err})
            console.log("Error retrieving items");
        }
    }).catch((err) => {
        res.status(500).json({message: "Error retrieving items", error: err})
        console.log("Error retrieving items");
    });

};
  
//usually we would need something like getting a specifc item, but we can search the item from the items array that we get from getAllListItems
    
//third, updating a list item

let updateListItem = async(req, res) => {

    backendService.updateListItemService(req).then((result) => {
        if (result) {
            res.status(200).json({message: "Item updated successfully", item: result})
            console.log("Item updated successfully");
        }
        else {
            res.status(500).json({message: "Error updating item", error: err})
            console.log("Error updating item");
        }
    }).catch((err) => {
        res.status(500).json({message: "Error updating item", error: err})
        console.log("Error updating item");
    });

}

//and finally, deleting a list item

let deleteListItem = (req, res) => {
    backendService.deleteListItemService(req, res); //all of the response handling is done in the backendService.js file, since the deleteOne function is a mongoose function
};

module.exports = { addListItem, getAllListItems, updateListItem, deleteListItem };

//final version of doItemController.js