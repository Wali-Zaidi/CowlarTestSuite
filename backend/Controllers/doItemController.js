const backendService = require('../Service/backendService');
//first, adding in a list item

let addListItem = (req, res) => {

    backendService.addListItemService(req).then((result) => {
        res.status(200).json({message: "Item added successfully", item: result})
    }
    ).catch((err) => {
        console.log(err);
        res.status(500).json({message: "Error adding item", error: err})
    });

}

//second, getting all the list items for the current user

let getAllListItems = async(req, res) => {

    backendService.getAllListItemService(req).then((result) => {
        if (result) {
            res.status(200).json({message: "Items retrieved successfully", items: result})
        }
        else {
            res.status(500).json({message: "Error retrieving items", error: err})
        }
    }).catch((err) => {
        res.status(500).json({message: "Error retrieving items", error: err})
    });

};
  
//usually we would need something like getting a specifc item, but we can search the item from the items array that we get from getAllListItems
    
//third, updating a list item

let updateListItem = async(req, res) => {

    backendService.updateListItemService(req).then((result) => {
        if (result) {
            res.status(200).json({message: "Item updated successfully", item: result})
        }
        else {
            res.status(500).json({message: "Error updating item", error: err})
        }
    }).catch((err) => {
        res.status(500).json({message: "Error updating item", error: err})
    });
}

//and finally, deleting a list item

let deleteListItem = (req, res) => {
    backendService.deleteListItemService(req, res); //all of the response handling is done in the backendService.js file, since the deleteOne function is a mongoose function
};

module.exports = { addListItem, getAllListItems, updateListItem, deleteListItem };

//final version of doItemController.js