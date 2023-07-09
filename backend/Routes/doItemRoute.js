const express = require('express');
const doItemRouter = express.Router();
const doItemController = require('../Controllers/doItemController');


doItemRouter.post('/list', doItemController.addListItem);
doItemRouter.get('/list', doItemController.getAllListItems);
doItemRouter.put('/list', doItemController.updateListItem);
doItemRouter.delete('/list', doItemController.deleteListItem);

//AGAIN, IMPORT THE DAMN THINGS CORRECTLY

module.exports = doItemRouter; //added this in later, forgot to add it in the first time

// final version of doItemRoute.js